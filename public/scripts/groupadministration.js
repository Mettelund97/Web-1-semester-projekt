/*Group management */
function toggleAccordion2(element) {
  const content = element.nextElementSibling;
  const currentlyActive = document.querySelector('.accordion-block.active');
  const isCurrentlyOpen = element.classList.contains('active');
  

  if (currentlyActive && currentlyActive !== element) {
    currentlyActive.classList.remove('active');
    currentlyActive.nextElementSibling.style.display = 'none';
    currentlyActive.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
  }
  

  element.classList.toggle('active');
  
 
  if (!isCurrentlyOpen) {
    content.style.display = 'table';
    element.querySelector('.arrow-icon2').style.transform = "rotate(180deg)";
  } else {
    content.style.display = 'none';
    element.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
  }
}