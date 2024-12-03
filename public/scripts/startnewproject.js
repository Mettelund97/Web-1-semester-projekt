const axios = require("axios");
// const templateModel = require("../../models/templateModel");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newProjectForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      projectname: document.getElementById("projectname").value,
      subdomainname: document.getElementById("subdomainname").value,
    };

    try {
      await axios.post("/start-new-project", formData);
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating project:", error);
    }
  });
});

async function deleteStack(stackId) {
  if (!confirm("Are you sure you want to delete this project?")) {
    return;
  }

  try {
    const response = await fetch(`/stacks/${stackId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete stack");
    }

    // Refresh the page to show updated stack list
    window.location.reload();
  } catch (error) {
    alert(error.message);
    console.error("Error deleting stack:", error);
  }
}

function validateSubdomains() {
  const input = document.querySelector("#subdomainname");
  let isValid = true;

  const pattern = new RegExp(input.getAttribute("pattern"));

  if (!pattern.test(input.value)) {
    isValid = false;
    input.setCustomValidity("The subdomain must end with .kubelab.dk");
    alert("The Subdomain must end with .kubelab.dk");
  } else {
    input.setCustomValidity("");
  }

  return isValid;
}
