document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement; // This refers to the <html> element
  const isDark = localStorage.getItem("dark-theme") === "true"; // Get the theme preference

  // Apply the class based on saved preference
  root.classList.toggle("dark", isDark);

  // Get the toggle button
  const toggle = document.getElementById("toggle");

  // Set the checked state of the toggle based on the theme preference
  if (toggle) {
    toggle.checked = isDark; // Only set checked if the toggle exists
  }

  // Manage icon classes based on theme
  const iconLights = document.querySelectorAll(".iconlight");
  const iconDarks = document.querySelectorAll(
    ".icondarkmodenav, .icondarkmode"
  );

  // Function to update icons based on the current theme
  function updateIcons(isDark) {
    iconLights.forEach((icon) => {
      icon.classList.toggle("disabled", isDark); // Add 'disabled' class to light icons
      icon.style.display = isDark ? "none" : "inline-block"; // Hide light icons in dark mode
    });

    iconDarks.forEach((icon) => {
      icon.classList.toggle("active", isDark); // Add 'active' class to dark icons
      icon.style.display = isDark ? "inline-block" : "none"; // Show dark icons in dark mode
    });
  }

  // Initial icon update based on stored theme preference
  updateIcons(isDark);

  // Event listener for change on the checkbox
  toggle?.addEventListener("change", (event) => {
    const isChecked = event.target.checked;

    // Toggle the dark class on the root element
    root.classList.toggle("dark", isChecked);

    // Save the theme preference in local storage
    localStorage.setItem("dark-theme", isChecked);

    // Manage icon classes based on theme
    updateIcons(isChecked);
  });
});

// Function to manage icon classes
function updateIcons(isDark) {
  const iconLights = document.querySelectorAll(".iconlight");
  const iconDarks = document.querySelectorAll(
    ".icondarkmodenav, .icondarkmode"
  );

  iconLights.forEach((icon) => {
    icon.classList.toggle("disabled", isDark); // Add 'disabled' class to light icons
  });

  iconDarks.forEach((icon) => {
    icon.classList.toggle("active", isDark); // Add 'active' class to dark icons
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function () {
      const navLinks = document.getElementById("nav-links");
      if (navLinks) {
        navLinks.classList.toggle("active");
        this.classList.toggle("active");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");

  const sectionPaths = {
    "/": ["/", "/start-new-project"],
    "/group-administration": ["/group-administration", "/create-new-group"],
    "/members": ["/members", "/add-new-member"],
    "/settings": ["/settings"],
  };

  function isPathInSection(currentPath, sectionPath) {
    if (sectionPath === "/" && currentPath === "/") {
      return true;
    }

    const validPaths = sectionPaths[sectionPath] || [sectionPath];
    return validPaths.some(
      (path) => currentPath === path || currentPath.startsWith(`${path}/`)
    );
  }

  const currentPath = window.location.pathname;
  menuItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (isPathInSection(currentPath, href)) {
      item.classList.add("active");
    }
  });

  function clearActiveClassMenu() {
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      clearActiveClassMenu();
      this.classList.add("active");
    });
  });
});

const toggleInput = document.getElementById("toggle2");

function toggleActiveClass() {
  const emptyBoxes = document.querySelectorAll(".emptybox, .emptybox2");

  emptyBoxes.forEach((box) => {
    box.classList.toggle("active");
  });
}

if (toggleInput) {
  toggleInput.addEventListener("change", toggleActiveClass);
}

document.addEventListener("DOMContentLoaded", () => {
  const myButton = document.getElementById("myButton");
  if (myButton) {
    myButton.addEventListener("click", function () {
      // Your button functionality here
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mainButton = document.getElementById("main-Button");
  if (mainButton) {
    mainButton.addEventListener("click", function () {
      window.location.href = "/create-new-project";
    });
  }
});

/* Projects */
function toggleAccordion(element) {
  const accordionRows = [];
  let nextRow = element.nextElementSibling;

  while (nextRow && nextRow.classList.contains("accordion-content")) {
    accordionRows.push(nextRow);
    nextRow = nextRow.nextElementSibling;
  }

  const isOpen =
    accordionRows[0] && accordionRows[0].style.display === "table-row";

  accordionRows.forEach((row) => {
    row.style.display = isOpen ? "none" : "table-row";
  });

  element.classList.toggle("open", !isOpen);

  const arrowIcon = element.querySelector(".arrow-icon");
  if (arrowIcon)
    arrowIcon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";

  element.classList.toggle("no-border", !isOpen);
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteForm = document.getElementById("deleteStackForm");
  if (deleteForm) {
    deleteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const stackIdElement = document.getElementById("stackId");
      if (!stackIdElement) {
        console.error("Stack ID element not found");
        return;
      }

      const stackId = stackIdElement.value;

      axios
        .delete(`/stacks/${stackId}`)
        .then((response) => {
          console.log("Stack deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting stack:", error);
          if (error.response?.status === 403) {
            console.error("You do not have permission to delete this stack");
          } else {
            console.error("Failed to delete stack");
          }
        });
    });
  }
});
