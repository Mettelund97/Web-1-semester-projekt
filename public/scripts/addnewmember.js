document.addEventListener("DOMContentLoaded", function () {
  const memberForm = document.getElementById("memberForm");
  if (memberForm) {
    memberForm.addEventListener("submit", function (e) {
      const email = document.getElementById("email").value;
      if (!email.endsWith("@ucl.dk") && !email.endsWith("@edu.ucl.dk")) {
        e.preventDefault();
        alert(
          "Please enter a valid UCL email address (@ucl.dk or @edu.ucl.dk)"
        );
      }
    });
  }
});
