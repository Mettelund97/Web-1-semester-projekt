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
function toggleAccordion(row) {
  const accordionContent = row.nextElementSibling; // Get the next row (accordion content)
  const isVisible = accordionContent.style.display === "table-row";

  // Toggle display
  accordionContent.style.display = isVisible ? "none" : "table-row";

  // Rotate arrow icon
  row.classList.toggle("open", !isVisible);

  // Add or remove the 'no-border' class based on visibility
  if (isVisible) {
    row.classList.remove("no-border"); // Show the bottom border when content is hidden
  } else {
    row.classList.add("no-border"); // Remove the bottom border when content is shown
  }
}

/*Group management */
function toggleAccordion(element) {
  const accordionContent2 = element.nextElementSibling.querySelector('.accordion-content2');

  // Toggle display of the accordion content
  if (accordionContent2.style.display === "table-row") {
    accordionContent2.style.display = "none";
    element.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
  } else {
    accordionContent2.style.display = "table-row";
    element.querySelector('.arrow-icon2').style.transform = "rotate(180deg)";
  }
}