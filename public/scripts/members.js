function showRoleEdit(userId) {
    const displayElement = document.getElementById(`role-display-${userId}`);
    const editElement = document.getElementById(`role-edit-${userId}`);
    const buttonGroup = document.getElementById(`button-group-${userId}`);
    
    if (displayElement && editElement) {
        displayElement.style.display = 'none';
        editElement.style.display = 'flex';
        // Hide buttons initially
        if (buttonGroup) {
            buttonGroup.style.display = 'none';
        }
    }
}

function handleRoleChange(userId, currentRoleId) {
    const select = document.getElementById(`role-select-${userId}`);
    const buttonGroup = document.getElementById(`button-group-${userId}`);
    
    // Only show buttons if selected role is different from current role
    if (buttonGroup) {
        buttonGroup.style.display = select.value !== currentRoleId ? 'flex' : 'none';
    }
}

function cancelEdit(userId) {
    const displayElement = document.getElementById(`role-display-${userId}`);
    const editElement = document.getElementById(`role-edit-${userId}`);
    const select = document.getElementById(`role-select-${userId}`);
    const buttonGroup = document.getElementById(`button-group-${userId}`);
    
    if (displayElement && editElement) {
        displayElement.style.display = 'flex';
        editElement.style.display = 'none';
        // Reset select to original value
        if (select) {
            select.value = currentRoleId;
        }
        // Hide buttons
        if (buttonGroup) {
            buttonGroup.style.display = 'none';
        }
    }
}

function updateRole(userId) {
    const select = document.getElementById(`role-select-${userId}`);
    const newRoleId = select.value;

    fetch(`/user/${userId}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roleId: newRoleId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert('Error updating role: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating role');
    });
}