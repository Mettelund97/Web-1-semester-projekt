// document.addEventListener('DOMContentLoaded', function() {
//   const loginForm = document.getElementById('loginForm');
//   if (loginForm) {
//       loginForm.addEventListener('submit', function(event) {
//           event.preventDefault();
//           console.log('Form submitted');
//           window.location.href = '/';
//       });
//   }
// });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    // const { token, user } = await response.json();
    // localStorage.setItem("authToken", token); // Store token
    window.location.href = "/"; // route to protected route
  } else {
    alert("Invalid email or password.");
  }
});
