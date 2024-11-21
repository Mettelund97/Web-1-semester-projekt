const axios = require('axios'); 

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newProjectForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      projectname: document.getElementById('projectname').value,
      subdomainname: document.getElementById('subdomainname').value
    };

    try {
      await axios.post('/start-new-project', formData);
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating project:', error);
    }
  });
});