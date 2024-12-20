const axios = require("axios");
const configModel = require("../models/configModel");

class PortainerService {
  constructor() {
    this.baseUrl = "https://portainer.kubelab.dk/api";
    this.endpointId = 5;
    this.swarmId = "v1pkdou24tzjtncewxhvpmjms";
  }

  async portainerAuthLogin() {
    try {
      const response = await fetch("https://portainer.kubelab.dk/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "ABMM",
          password: "Ladida.12",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.jwt) {
        return data.jwt;
      } else {
        throw new Error("JWT token not found in response.");
      }
    } catch (error) {
      console.error("Error fetching Portainer JWT:", error);
      throw error;
    }
  }

  async getStacks() {
    try {
      const token = await configModel.getConfig("PORTAINERTOKEN");
      const response = await axios.get(`${this.baseUrl}/stacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching stacks:",
        error.response?.data || error.message
      );
      return [];
    }
  }
  async createStack(projectName, file) {
    try {
      const token = await configModel.getConfig("PORTAINERTOKEN");
      const stackFileContent = file;

      const requestBody = {
        Name: projectName,
        SwarmID: this.swarmId,
        StackFileContent: stackFileContent,
      };

      const response = await axios.post(
        `${this.baseUrl}/stacks/create/swarm/string?endpointId=${this.endpointId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
      }
      throw error;
    }
  }

  async startStack(stackId) {
    try {
      const token = await configModel.getConfig("PORTAINERTOKEN");
      fetch(
        `https://portainer.kubelab.dk/api/stacks/${stackId}/start?endpointId=${this.endpointId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async stopStack(stackId) {
    try {
      const token = await configModel.getConfig("PORTAINERTOKEN");
      fetch(
        `https://portainer.kubelab.dk/api/stacks/${stackId}/stop?endpointId=${this.endpointId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStack(stackId) {
    try {
      const token = await configModel.getConfig("PORTAINERTOKEN");
      const response = await axios.delete(
        `${this.baseUrl}/stacks/${stackId}?endpointId=${this.endpointId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Successfully deleted stack:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting stack:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
      }
      throw error;
    }
  }
}

module.exports = new PortainerService();
