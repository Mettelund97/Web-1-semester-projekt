const axios = require("axios");
const StackModel = require("../models/stackModel");
const configModel = require("../models/configModel");

class StackSyncService {
  constructor() {
    this.syncInterval = 30000;
    this.isRunning = false;
    this.retryAttempts = 3;
    this.retryDelay = 5000;
  }

  async retryOperation(operation, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === attempts - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  async fetchPortainerStacks() {
    const token = await configModel.getConfig("PORTAINERTOKEN");
    const response = await axios.get(
      "https://portainer.kubelab.dk/api/stacks",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async syncStack(portainerStack, dbStack) {
    try {
      const stackData = {
        // title: portainerStack.Name,
        // subdomain: `${portainerStack.Name}.kubelab.dk`,
        // status: portainerStack.Status === 1,
        // template: dbStack?.template || 'wordpress',
        // portainerStackId: portainerStack.Id,
        // lastSynced: new Date(),
        // userId: dbStack?.userId,
        // groupId: dbStack?.groupId

        title: portainerStack.Name,
        subdomain: `${dbStack?.subdomain}`,
        status: portainerStack.Status === 1,
        template: dbStack?.templateId || null,
        portainerStackId: portainerStack.Id,
        lastSynced: new Date(),
        userId: dbStack?.userId,
        groupId: dbStack?.groupId,
      };

      if (dbStack) {
        // Only update if there are changes to status or portainerStackId
        if (
          dbStack.status !== stackData.status ||
          dbStack.portainerStackId !== stackData.portainerStackId
        ) {
          await StackModel.updateStack({
            ...stackData,
            id: dbStack.id,
          });
        }
        await StackModel.updateSyncStatus(dbStack.id, "synced");
      } else {
        const result = await StackModel.createStack(stackData);
        await StackModel.updateSyncStatus(result.id, "synced");
      }
    } catch (error) {
      const stackId = dbStack ? dbStack.id : null;
      if (stackId) {
        await StackModel.updateSyncStatus(
          stackId,
          "error",
          `Sync failed: ${error.message}`
        );
      }
      throw error;
    }
  }

  async startSync() {
    if (this.isRunning) return;
    this.isRunning = true;

    const syncStacks = async () => {
      try {
        console.log("Starting stack synchronization...");

        const [portainerStacks, dbStacks] = await Promise.all([
          this.retryOperation(() => this.fetchPortainerStacks()),
          StackModel.getAllStacks(),
        ]);

        const processedDbStackIds = new Set();

        for (const portainerStack of portainerStacks) {
          const dbStack = dbStacks.find(
            (s) =>
              s.portainerStackId === portainerStack.Id ||
              s.title === portainerStack.Name
          );
          await this.syncStack(portainerStack, dbStack);
          if (dbStack) processedDbStackIds.add(dbStack.id);
        }

        const deletedStackIds = dbStacks
          .filter((s) => !processedDbStackIds.has(s.id))
          .map((s) => s.id);

        if (deletedStackIds.length > 0) {
          for (const id of deletedStackIds) {
            await StackModel.deleteStack(id);
          }
          console.log(`Cleaned up ${deletedStackIds.length} deleted stacks`);
        }

        console.log("Stack synchronization completed successfully");
      } catch (error) {
        console.error("Stack synchronization failed:", error);
      }
    };

    await syncStacks();

    this.syncInterval = setInterval(syncStacks, this.syncInterval);
  }

  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.isRunning = false;
      console.log("Stack synchronization stopped");
    }
  }
}

module.exports = new StackSyncService();
