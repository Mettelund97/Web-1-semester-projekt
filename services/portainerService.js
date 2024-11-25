const axios = require("axios");
const { getConfig } = require("../models/configModel");

class PortainerService {
  constructor() {
    this.baseUrl = "https://portainer.kubelab.dk/api";
    this.endpointId = 5;
    this.swarmId = "v1pkdou24tzjtncewxhvpmjms";
  }

  async getStacks() {
    const token = await getConfig("PORTAINERTOKEN");

    try {
      const response = await axios.get(`${this.baseUrl}/stacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Successfully fetched stacks:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching stacks:",
        error.response?.data || error.message
      );
      return [];
    }
  }

  async createStack(projectName, subDomain) {
    try {
      const token = await getConfig("PORTAINERTOKEN");
      const websiteId = Math.random().toString(36).substring(7);

      const stackFileContent = String.raw`version: '3.8'
networks:
  traefik-proxy:
    external: true
  wp-network:
    driver: overlay
services:
  wordpress:
    image: wordpress:latest
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
      WORDPRESS_DB_NAME: wpdatabase
    networks:
      - traefik-proxy
      - wp-network
    deploy:
      labels:
        - traefik.enable=true
        - traefik.http.routers.${websiteId}.rule=Host(\`${subDomain}\`)
        - traefik.http.routers.${websiteId}.entrypoints=web,websecure
        - traefik.http.routers.${websiteId}.tls.certresolver=letsencrypt
        - traefik.http.services.${websiteId}.loadbalancer.server.port=80
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wpdatabase
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
    networks:
      - wp-network
    deploy:
      placement:
        constraints:
          - node.role == worker`;

      console.log("Sending stack configuration:", stackFileContent);

      const requestBody = {
        Name: projectName,
        SwarmID: this.swarmId,
        StackFileContent: stackFileContent,
      };

      console.log(
        "Sending request body:",
        JSON.stringify(requestBody, null, 2)
      );

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

      console.log("Stack created successfully:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);
      }
      throw error;
    }
  }

  async deleteStack(stackId) {
    try {
      const token = await getConfig("PORTAINERTOKEN");
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
