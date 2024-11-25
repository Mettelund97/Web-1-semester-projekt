const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("error") && urlParams.get("error") === "accessDenied") {
  alert("Access Denied: You do not have permission to access that page.");
}
