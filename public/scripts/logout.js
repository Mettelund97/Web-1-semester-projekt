if (document.getElementById("logoutLink")) {
  document
    .getElementById("logoutLink")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const response = await fetch("/logout", { method: "GET" });
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        alert("Not able to logout, try again later!");
      }
    });
}
