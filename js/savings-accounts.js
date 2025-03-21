document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search accounts..."]');
    const tableRows = document.querySelectorAll('tbody tr');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        tableRows.forEach(row => {
            const accountHolder = row.querySelector('td:first-child').textContent.toLowerCase();
            const accountNumber = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const matches = accountHolder.includes(searchTerm) || accountNumber.includes(searchTerm);
            row.style.display = matches ? '' : 'none';
        });
    });

    // Action buttons functionality
    document.querySelectorAll('tbody tr').forEach(row => {
        // View button
        row.querySelector('button:nth-child(1)').addEventListener('click', () => {
            const accountNumber = row.querySelector('td:nth-child(2)').textContent.trim();
            alert(`View details for account ${accountNumber}`);
            // TODO: Implement view functionality
        });

        // Edit button
        row.querySelector('button:nth-child(2)').addEventListener('click', () => {
            const accountNumber = row.querySelector('td:nth-child(2)').textContent.trim();
            alert(`Edit account ${accountNumber}`);
            // TODO: Implement edit functionality
        });

        // Delete button
        row.querySelector('button:nth-child(3)').addEventListener('click', () => {
            const accountNumber = row.querySelector('td:nth-child(2)').textContent.trim();
            if (confirm(`Are you sure you want to delete account ${accountNumber}?`)) {
                // TODO: Implement delete functionality
                alert('Account deleted successfully');
            }
        });
    });

    // New Account button
    const newAccountButton = document.querySelector('button.bg-indigo-600');
    newAccountButton.addEventListener('click', () => {
        alert('Create new account');
        // TODO: Implement new account creation
    });

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('nav button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // TODO: Implement pagination
            alert('Pagination clicked');
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
}); 