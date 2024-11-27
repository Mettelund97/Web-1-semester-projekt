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
