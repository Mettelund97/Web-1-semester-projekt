document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            if (!email.endsWith('@ucl.dk') && !email.endsWith('@edc.ucl.dk')) {
                e.preventDefault();
                alert('Please use a valid UCL email address (@ucl.dk or @edc.ucl.dk)');
            }
        });
    }
});