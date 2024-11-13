/*Group management */
function toggleAccordion2(element) {
    const content = element.nextElementSibling;
    const currentlyActive = document.querySelector('.accordion-block.active');
    
    if (currentlyActive && currentlyActive !== element) {
      currentlyActive.classList.remove('active');
      currentlyActive.nextElementSibling.style.display = 'none';
    }
    
    element.classList.toggle('active');
    
    if (content.style.display === 'none' || content.style.display === '') {
      content.style.display = 'table';
    } else {
      content.style.display = 'none';
    }

    if (isOpen) {
      element.classList.remove('active'); 
      element.querySelector('.arrow-icon2').style.transform = "rotate(0deg)";
    } else {
      element.classList.add('active'); 
      element.querySelector('.arrow-icon2').style.transform = "rotate(180deg)";
    }
  }