const axios = require('axios');
class stackOperations {
    constructor() {
    }
    async deleteStack(id) {
        console.log ("hej");
        try {
            const response = await axios.delete(`/stacks/${id}`);
            
            if (response.data.success) {
                // Remove the stack element from the DOM
                const stackElement = document.querySelector(`[data-stack-id="${id}"]`);
                const accordionContent = stackElement.nextElementSibling;
                const buttonRow = accordionContent.nextElementSibling;
                
                stackElement.remove();
                accordionContent.remove();
                buttonRow.remove();
                
                // Reload the page if there are no more stacks
                if (document.querySelectorAll('.accordion-header').length === 0) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}