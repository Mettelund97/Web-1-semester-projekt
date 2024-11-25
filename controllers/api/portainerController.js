const { getConfig } = require("../../models/configModel");

const jwtToken = await getConfig("PORTAINERTOKEN");
const endpointId = 5; //Skal altid være denne værdi
const stackId = 1;
const swarmId = "v1pkdou24tzjtncewxhvpmjms"; //Skal altid være denne værdi
const subDomainWp = "testtest"; //Skal være unikt
const subDomainPma = "testtest-pma"; //Skal være unikt
const websideId = Math.random().toString(36).substring(7); //Unik for CHANGEME01
const pmaId = Math.random().toString(36).substring(7); //Unik for CHANGEME02

// endpoint for post stack:
router.get("/add-stack", async () => {
  // const body `networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.${websideId}.rule=Host(\`${subDomainWp}.kubelab.dk\`)\n        - traefik.http.routers.${websideId}.entrypoints=web,websecure\n        - traefik.http.routers.${websideId}.tls.certresolver=letsencrypt\n        - traefik.http.services.${websideId}.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.${pmaId}.rule=Host(\`${subDomainPma}.kubelab.dk\`)\n        - traefik.http.routers.${pmaId}.entrypoints=web,websecure\n        - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt\n        - traefik.http.services.${pmaId}.loadbalancer.server.port=80`;
  //   const body = `
  // networks:
  //   traefik-proxy:
  //     external: true
  //   wp-network:
  //     driver: overlay

  // services:
  //   wordpress:
  //     image: wordpress:latest
  //     environment:
  //       WORDPRESS_DB_HOST: db
  //       WORDPRESS_DB_USER: wpuser
  //       WORDPRESS_DB_PASSWORD: wppassword
  //       WORDPRESS_DB_NAME: wpdatabase
  //     networks:
  //       - traefik-proxy
  //       - wp-network
  //     deploy:
  //       labels:
  //         - traefik.enable=true
  //         - traefik.http.routers.${websideId}.rule=Host(\`${subDomainWp}.kubelab.dk\`)
  //         - traefik.http.routers.${websideId}.entrypoints=web,websecure
  //         - traefik.http.routers.${websideId}.tls.certresolver=letsencrypt
  //         - traefik.http.services.${websideId}.loadbalancer.server.port=80

  //   db:
  //     image: mariadb:latest
  //     environment:
  //       MYSQL_ROOT_PASSWORD: rootpassword
  //       MYSQL_DATABASE: wpdatabase
  //       MYSQL_USER: wpuser
  //       MYSQL_PASSWORD: wppassword
  //     networks:
  //       - wp-network

  //   phpmyadmin:
  //     image: phpmyadmin:latest
  //     environment:
  //       PMA_HOST: db
  //       PMA_USER: wpuser
  //       PMA_PASSWORD: wppassword
  //     networks:
  //       - traefik-proxy
  //       - wp-network
  //     deploy:
  //       labels:
  //         - traefik.enable=true
  //         - traefik.http.routers.${pmaId}.rule=Host(\`${subDomainPma}.kubelab.dk\`)
  //         - traefik.http.routers.${pmaId}.entrypoints=web,websecure
  //         - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt
  //         - traefik.http.services.${pmaId}.loadbalancer.server.port=80
  // `;

  fetch(
    `https://portainer.kubelab.dk/api/stacks/create/swarm/string?endpointId=${endpointId}`,
    {
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => {
      console.log(error);
    });

  res.send("Fetch API is available on the global scope by default");
});

// endpoint for login and to recive the jwt-token!!
fetch("https://portainer.kubelab.dk/api/auth", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "ABMM",
    password: "Ladida.12",
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Response data:", data);
    // Handle the data here
  })
  .catch((error) => {
    console.error("Error:", error);
  });

router.get("/", async () => {
  fetch(
    `https://portainer.kubelab.dk/api/stacks/${stackId}/start?endpointId=${endpointId}`,
    {
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
});
