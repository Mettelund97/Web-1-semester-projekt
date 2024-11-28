/*Group management */
function toggleAccordion2(element) {
  const content = element.nextElementSibling;
  const isCurrentlyOpen = element.classList.contains('active');

  // Toggle active class for the clicked element
  element.classList.toggle('active');
  
  // Toggle content and rotate arrow based on new state
  if (!isCurrentlyOpen) {
    content.style.display = 'table';
    element.querySelector('.arrow-icon2').style.transform = "rotate(180deg)";
  } else {
    content.style.display = 'none';
    element.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
  }
}