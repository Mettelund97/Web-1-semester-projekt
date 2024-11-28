document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const root = document.documentElement;
  const isDark = localStorage.getItem('dark-theme') === 'true';
  root.classList.toggle('dark', isDark);

  const toggle = document.getElementById('toggle');
  if (toggle) {
      toggle.checked = isDark;
  }

  // Icon Management
  const iconLights = document.querySelectorAll('.iconlight');
  const iconDarks = document.querySelectorAll('.icondarkmode');

  function updateIcons(isDark) {
      iconLights.forEach(icon => {
          icon.style.display = isDark ? 'none' : 'inline-block';
          icon.classList.toggle('disabled', isDark);
      });

      iconDarks.forEach(icon => {
          icon.style.display = isDark ? 'inline-block' : 'none';
          icon.classList.toggle('active', isDark);
      });
  }

  updateIcons(isDark);

  toggle?.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      root.classList.toggle('dark', isChecked);
      localStorage.setItem('dark-theme', isChecked);
      updateIcons(isChecked);
  });

  // Menu Management
  const menuItems = document.querySelectorAll('.menu-item');
  const sectionPaths = {
      '/': ['/', '/start-new-project'],
      '/group-administration': ['/group-administration', '/create-new-group'],
      '/members': ['/members', '/add-new-member'],
      '/settings': ['/settings']
  };

  function isPathInSection(currentPath, sectionPath) {
      if (sectionPath === '/' && currentPath === '/') {
          return true;
      }
      const validPaths = sectionPaths[sectionPath] || [sectionPath];
      return validPaths.some(path => 
          currentPath === path || currentPath.startsWith(`${path}/`)
      );
  }

  const currentPath = window.location.pathname;
  menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (isPathInSection(currentPath, href)) {
          item.classList.add('active');
      }
  });

  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
      });
  });

  // Multi-action Management
  const editToggle = document.getElementById('toggle2');
  const multiActionDropdown = document.getElementById('multiActionDropdown');
  const stackCheckboxes = document.querySelectorAll('.stack-checkbox');
  
  editToggle?.addEventListener('change', () => {
      const isEditMode = editToggle.checked;
      
      stackCheckboxes.forEach(checkbox => {
          checkbox.style.display = isEditMode ? 'block' : 'none';
      });
      
      if (multiActionDropdown) {
          multiActionDropdown.style.display = isEditMode ? 'flex' : 'none';
      }
  });

  const bulkActionsSelect = document.getElementById('bulkActions');
  const applyBulkAction = document.getElementById('applyBulkAction');

  applyBulkAction?.addEventListener('click', async () => {
      const action = bulkActionsSelect.value;
      if (!action) {
          alert('Please select an action');
          return;
      }

      const checkedBoxes = document.querySelectorAll('.stack-checkbox:checked');
      if (!checkedBoxes.length) {
          alert('Please select at least one project');
          return;
      }

      const stackIds = Array.from(checkedBoxes).map(box => box.dataset.stackId);
      
      if (!confirm(`Are you sure you want to ${action} the selected projects?`)) {
          return;
      }

      try {
          const response = await fetch(`/stacks/bulk/${action}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ stackIds })
          });

          if (response.ok) {
              alert(`Successfully performed ${action} on selected projects`);
              setTimeout(() => location.reload(), 3000);
          } else {
              const error = await response.json();
              alert(error.message || `Failed to ${action} projects`);
          }
      } catch (error) {
          console.error(`Error performing bulk action:`, error);
          alert(`An error occurred while trying to ${action} the projects`);
      }
  });

  // Toggle All Checkbox
  const toggleAllCheckbox = document.createElement('input');
  toggleAllCheckbox.type = 'checkbox';
  toggleAllCheckbox.className = 'toggle-all-checkbox';
  toggleAllCheckbox.style.marginRight = '8px';
  
  if (document.querySelector('.grid-header')) {
      const firstHeaderCell = document.querySelector('.grid-header .grid-cell');
      firstHeaderCell.insertBefore(toggleAllCheckbox, firstHeaderCell.firstChild);
  }

  toggleAllCheckbox.addEventListener('change', () => {
      stackCheckboxes.forEach(checkbox => {
          checkbox.checked = toggleAllCheckbox.checked;
      });
  });

  // Mobile Menu
  const burgerMenu = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');
  
  burgerMenu?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burgerMenu.classList.toggle('active');
  });

  // Project Accordion
  window.toggleAccordion = function(element) {
      const accordionRows = [];
      let nextRow = element.nextElementSibling;
      
      while (nextRow && nextRow.classList.contains('accordion-content')) {
          accordionRows.push(nextRow);
          nextRow = nextRow.nextElementSibling;
      }
      
      const isOpen = accordionRows[0]?.style.display === 'table-row';
      
      accordionRows.forEach(row => {
          row.style.display = isOpen ? 'none' : 'table-row';
      });
      
      element.classList.toggle('open', !isOpen);
      
      const arrowIcon = element.querySelector('.arrow-icon');
      if (arrowIcon) {
          arrowIcon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
      
      element.classList.toggle('no-border', !isOpen);
  };

  // Start/Stop Management
  document.querySelectorAll('.start-stop-btn').forEach(button => {
      button.addEventListener('click', async function(event) {
          const stackId = this.dataset.stackId;
          const action = this.dataset.action;

          try {
              const response = await fetch(`/stacks/${stackId}/${action}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });

              if (response.ok) {
                  const result = await response.json();
                  alert(result.message + '\nWait 5 seconds...');
                  setTimeout(() => location.reload(), 5000);
              } else {
                  const result = await response.json();
                  alert(result.error || `Failed to ${action} the project.`);
              }
          } catch (error) {
              console.error(`Error during ${action} action:`, error);
              alert(`An error occurred while trying to ${action} the project.`);
          }
      });
  });
});

// Stack Deletion
async function deleteStack(stackId) {
  if (!confirm('Are you sure you want to delete this project?')) {
      return;
  }

  try {
      const response = await fetch(`/stacks/${stackId}`, {
          method: 'DELETE'
      });

      if (response.ok) {
          alert('Project deleted successfully');
          setTimeout(() => location.reload(), 3000);
      } else {
          const error = await response.json();
          alert(error.message || 'Failed to delete project');
      }
  } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project');
  }
}