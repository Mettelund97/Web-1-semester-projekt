// const burgerMenu = document.getElementById("burger-menu");
// if (burgerMenu) {
//   burgerMenu.addEventListener("click", function () {
//     const navLinks = document.getElementById("nav-links");
//     if (navLinks) {
//       navLinks.classList.toggle("active");
//     }
//     burgerMenu.classList.toggle("active");
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement; // This refers to the <html> element
    const isDark = localStorage.getItem('dark-theme') === 'true'; // Get the theme preference

    // Apply the class based on saved preference
    root.classList.toggle('dark', isDark);

    // Get the toggle button
    const toggle = document.getElementById('toggle');

    // Set the checked state of the toggle based on the theme preference
    if (toggle) {
        toggle.checked = isDark; // Only set checked if the toggle exists
    }

    // Manage icon classes based on theme
    const iconLights = document.querySelectorAll('.iconlight');
    const iconDarks = document.querySelectorAll('.icondarkmode');

    // Function to update icons based on the current theme
    function updateIcons(isDark) {
        iconLights.forEach(icon => {
            icon.classList.toggle('disabled', isDark); // Add 'disabled' class to light icons
            icon.style.display = isDark ? 'none' : 'inline-block'; // Hide light icons in dark mode
        });

        iconDarks.forEach(icon => {
            icon.classList.toggle('active', isDark); // Add 'active' class to dark icons
            icon.style.display = isDark ? 'inline-block' : 'none'; // Show dark icons in dark mode
        });
    }

    // Initial icon update based on stored theme preference
    updateIcons(isDark);

    // Event listener for change on the checkbox
    toggle?.addEventListener('change', (event) => {
        const isChecked = event.target.checked;

        // Toggle the dark class on the root element
        root.classList.toggle('dark', isChecked);

        // Save the theme preference in local storage
        localStorage.setItem('dark-theme', isChecked);

        // Manage icon classes based on theme
        updateIcons(isChecked);
    });
});



// Function to manage icon classes
function updateIcons(isDark) {
  const iconLights = document.querySelectorAll('.iconlight');
  const iconDarks = document.querySelectorAll('.icondarkmode');

  iconLights.forEach(icon => {
      icon.classList.toggle('disabled', isDark); // Add 'disabled' class to light icons
  });

  iconDarks.forEach(icon => {
      icon.classList.toggle('active', isDark); // Add 'active' class to dark icons
  });
}

const toggleInput = document.getElementById('toggle2');
  
 function toggleActiveClass() {
  const emptyBoxes = document.querySelectorAll('.emptybox, .emptybox2');
    
  emptyBoxes.forEach(box => {
      box.classList.toggle('active');
    });
  }

toggleInput.addEventListener('change', toggleActiveClass);



document.getElementById("burger-menu").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
  const burger = document.getElementById("burger-menu");
  burger.classList.toggle("active");
});

document.getElementById("myButton").addEventListener("click", function () {});

document.getElementById("main-Button").addEventListener("click", function () {
  window.location.href = "/create-new-project";
});

/* Projects */ 
function toggleAccordion(element) {
  const accordionRows = [];
  let nextRow = element.nextElementSibling;
  
  while (nextRow && nextRow.classList.contains('accordion-content')) {
    accordionRows.push(nextRow);
    nextRow = nextRow.nextElementSibling;
  }
  
  const isOpen = accordionRows[0] && accordionRows[0].style.display === "table-row";
  
  accordionRows.forEach(row => {
    row.style.display = isOpen ? "none" : "table-row";
  });
  
  element.classList.toggle("open", !isOpen);
  
  const arrowIcon = element.querySelector('.arrow-icon');
  if (arrowIcon) arrowIcon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
  
  element.classList.toggle("no-border", !isOpen);
}

document.getElementById('deleteStackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var stackId = document.getElementById('stackId').value;

  axios.delete(`/stacks/${stackId}`)
    .then(response => {
      console.log('Stack deleted successfully');
      // Optionally, you can redirect the user to a different page or update the UI
    })
    .catch(error => {
      console.error('Error deleting stack:', error);
      if (error.response && error.response.status === 403) {
        console.error('You do not have permission to delete this stack');
        // Handle the forbidden error scenario
      } else {
        console.error('Failed to delete stack');
        // Handle other error scenarios
      }
    });
});















// Mode end//