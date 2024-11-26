document.addEventListener("DOMContentLoaded", () => {
  async function handleStartStopAction(event) {
    const button = event.currentTarget;
    const stackId = button.dataset.stackId;
    const action = button.dataset.action;

    if (!stackId) {
      alert("Stack ID not found!");
      return;
    }

    try {
      const url = `/stacks/${stackId}/${action}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message, "Wait 5 sec");

        // location.reload();
        setTimeout(location.reload.bind(location), 5000);
      } else {
        const result = await response.json();
        alert(result.error || `Failed to ${action} the stack.`);
      }
    } catch (error) {
      console.error(`Error during ${action} action:`, error);
      alert(`An error occurred while trying to ${action} the stack.`);
    }
  }

  // Add event listeners to all Start and Stop buttons
  document.querySelectorAll(".start-stop-btn").forEach((button) => {
    button.addEventListener("click", handleStartStopAction);
  });
});
