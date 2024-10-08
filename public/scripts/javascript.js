// const burgerMenu = document.getElementById("burger-menu");
// if (burgerMenu) {
//   burgerMenu.addEventListener("click", function () {
//     const navLinks = document.getElementById("nav-links");
//     if (navLinks) {
//       navLinks.classList.toggle("active");
//     }
//     burgerMenu.classList.toggle("active");
//   });
// }

document.getElementById("burger-menu").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
  const burger = document.getElementById("burger-menu");
  burger.classList.toggle("active");
});

document.getElementById("myButton").addEventListener("click", function () {});

document.getElementById("main-Button").addEventListener("click", function () {
  window.location.href = "/create-new-project";
});
