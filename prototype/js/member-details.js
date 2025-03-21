document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-indigo-100', 'text-indigo-700');
                btn.classList.add('text-gray-500', 'hover:text-gray-700');
            });
            tabContents.forEach(content => content.classList.add('hidden'));

            // Add active class to clicked button and show corresponding content
            button.classList.add('active', 'bg-indigo-100', 'text-indigo-700');
            button.classList.remove('text-gray-500', 'hover:text-gray-700');
            const tabId = `${button.dataset.tab}-tab`;
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Initialize the first tab as active
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        activeTab.classList.add('bg-indigo-100', 'text-indigo-700');
        activeTab.classList.remove('text-gray-500', 'hover:text-gray-700');
        const tabId = `${activeTab.dataset.tab}-tab`;
        document.getElementById(tabId).classList.remove('hidden');
    }

    // Handle Edit Profile button
    const editProfileButton = document.querySelector('button.bg-indigo-600');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            alert('Edit profile functionality will be implemented here');
            // TODO: Implement edit profile functionality
        });
    }

    // Handle View Details buttons
    document.querySelectorAll('button.text-indigo-600').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const accountNumber = row.querySelector('td:nth-child(2)').textContent;
            alert(`View details for ${accountNumber}`);
            // TODO: Implement view details functionality
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