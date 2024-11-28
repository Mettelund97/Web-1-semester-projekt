const axios = require('axios');
const StackModel = require('../models/stackModel');
const configModel = require('../models/configModel');

class StackSyncService {
  constructor() {
    this.syncInterval = 30000; // 30 seconds
    this.isRunning = false;
    this.retryAttempts = 3;
    this.retryDelay = 5000; // 5 seconds
  }

  async retryOperation(operation, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === attempts - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  async fetchPortainerStacks() {
    const token = await configModel.getConfig("PORTAINERTOKEN");
    const response = await axios.get("https://portainer.kubelab.dk/api/stacks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async syncStack(portainerStack, dbStack) {
    try {
      const stackData = {
        title: portainerStack.Name,
        subdomain: `${portainerStack.Name}.kubelab.dk`,
        status: portainerStack.Status === 1,
        template: 'wordpress',
        portainerStackId: portainerStack.Id,
        lastSynced: new Date()
      };

      if (dbStack) {
        // Only update if there are changes
        if (
          dbStack.status !== stackData.status ||
          dbStack.portainerStackId !== stackData.portainerStackId
        ) {
          await StackModel.updateStack({
            ...stackData,
            id: dbStack.id
          });
        } else {
          // Just update the sync status
          await StackModel.updateSyncStatus(dbStack.id, 'synced');
        }
      } else {
        // Create new stack
        const result = await StackModel.createStack(stackData);
        await StackModel.updateSyncStatus(result.id, 'synced');
      }
    } catch (error) {
      const stackId = dbStack ? dbStack.id : null;
      if (stackId) {
        await StackModel.updateSyncStatus(
          stackId,
          'error',
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
        console.log('Starting stack synchronization...');
        
        // Fetch stacks from both sources
        const [portainerStacks, dbStacks] = await Promise.all([
          this.retryOperation(() => this.fetchPortainerStacks()),
          StackModel.getAllStacks()
        ]);

        // Track processed stacks
        const processedDbStackIds = new Set();

        // Update or create stacks
        for (const portainerStack of portainerStacks) {
          const dbStack = dbStacks.find(s => s.portainerStackId === portainerStack.Id);
          await this.syncStack(portainerStack, dbStack);
          if (dbStack) processedDbStackIds.add(dbStack.id);
        }

        // Handle deleted stacks
        const deletedStackIds = dbStacks
          .filter(s => !processedDbStackIds.has(s.id))
          .map(s => s.id);

        if (deletedStackIds.length > 0) {
          for (const id of deletedStackIds) {
            await StackModel.deleteStack(id);
          }
          console.log(`Cleaned up ${deletedStackIds.length} deleted stacks`);
        }

        console.log('Stack synchronization completed successfully');
      } catch (error) {
        console.error('Stack synchronization failed:', error);
      }
    };

    // Initial sync
    await syncStacks();

    // Set up periodic sync
    this.syncInterval = setInterval(syncStacks, this.syncInterval);
  }

  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.isRunning = false;
      console.log('Stack synchronization stopped');
    }
  }
}

module.exports = new StackSyncService();