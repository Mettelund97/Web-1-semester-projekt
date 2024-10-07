// Handle login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");
    window.location.href = "/";
  });
