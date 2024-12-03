const axios = require("axios");
const templateModel = require("../../models/templateModel");

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

function updateService(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const service = selectedOption.getAttribute("data-service");
  const subdomains = document.getElementById("subdomains");

  subdomains.replaceChildren();

  service.match(/SUBDOMAIN\d*/g).map((match) => {
    const input = document.createElement("input");
    input.placeholder = match;
    input.name = match;
    input.title =
      "Use only letters, numbers, and hyphens, ending with .kubelab.dk";
    input.pattern = "^[a-zA-Z0-9-]+.kubelab.dk$";
    input.required = true;

    subdomains.appendChild(input);
  });
}
