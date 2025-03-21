document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search members..."]');
    const tableRows = document.querySelectorAll('tbody tr');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        tableRows.forEach(row => {
            const memberName = row.querySelector('td:first-child').textContent.toLowerCase();
            const memberId = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const matches = memberName.includes(searchTerm) || memberId.includes(searchTerm);
            row.style.display = matches ? '' : 'none';
        });
    });

    // New Member button
    const newMemberButton = document.querySelector('button.bg-indigo-600');
    if (newMemberButton) {
        newMemberButton.addEventListener('click', () => {
            alert('Create new member functionality will be implemented here');
            // TODO: Implement new member creation
        });
    }

    // Edit buttons
    document.querySelectorAll('button.text-green-600').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const memberId = row.querySelector('td:nth-child(2)').textContent.trim();
            alert(`Edit member ${memberId}`);
            // TODO: Implement edit functionality
        });
    });

    // Delete buttons
    document.querySelectorAll('button.text-red-600').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const memberId = row.querySelector('td:nth-child(2)').textContent.trim();
            if (confirm(`Are you sure you want to delete member ${memberId}?`)) {
                alert('Member deleted successfully');
                // TODO: Implement delete functionality
            }
        });
    });

    // Add click event to user profile button
    const profileButton = document.querySelector('button.flex.items-center');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('nav button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // TODO: Implement pagination
            alert('Pagination clicked');
        });
    });
}); 