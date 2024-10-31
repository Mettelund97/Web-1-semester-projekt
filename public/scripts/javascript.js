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

const toggle = document.getElementById('toggle');
const root = document.documentElement; // This refers to the <html> element

// Event listener for change on the checkbox
toggle.addEventListener('change', () => {
    root.classList.toggle('dark', toggle.checked);
});


// Maintain the theme on page reload
document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('dark-theme') === 'true';
    toggle.checked = isDark; // Set the toggle state based on saved preference
    root.classList.toggle('dark', isDark); // Apply the class based on saved preference
});

// Save the theme preference in local storage
toggle.addEventListener('change', () => {
    localStorage.setItem('dark-theme', toggle.checked);
});


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

/*Group management */
function toggleAccordion2(element) {
  const accordionRows = element.nextElementSibling.querySelectorAll('.accordion-content2');
  
  // Check if the accordion is currently open (by checking the display of the first row)
  const isOpen = accordionRows[0].style.display === "table-row";
  
  // Toggle display for all rows with the class "accordion-content2"
  accordionRows.forEach(row => {
    row.style.display = isOpen ? "none" : "table-row";
  });

  // Toggle the "open" class on the accordion block
  if (isOpen) {
    element.classList.remove('open'); // Remove "open" class when collapsed
    element.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
  } else {
    element.classList.add('open'); // Add "open" class when expanded
    element.querySelector('.arrow-icon2').style.transform = "rotate(180deg)";
  }
}














// Mode end//