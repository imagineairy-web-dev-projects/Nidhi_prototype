document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initActionButtons();
    initPagination();
    initSchemeFilter();

    // Handle user profile button
    const userProfileButton = document.querySelector('button.text-gray-700');
    userProfileButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
});

function initSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    const rows = document.querySelectorAll('tbody tr');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        rows.forEach(row => {
            const accountHolder = row.querySelector('.text-sm.font-medium.text-gray-900').textContent.toLowerCase();
            const accountNumber = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const schemeType = row.querySelector('.rounded-full').textContent.toLowerCase();

            const matches = accountHolder.includes(searchTerm) || 
                          accountNumber.includes(searchTerm) || 
                          schemeType.includes(searchTerm);

            row.style.display = matches ? '' : 'none';
        });
    });
}

function initActionButtons() {
    const viewButtons = document.querySelectorAll('button.text-indigo-600');
    const deleteButtons = document.querySelectorAll('button.text-red-600');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const accountNumber = row.querySelector('td:nth-child(2)').textContent;
            alert(`View details for account: ${accountNumber}`);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const accountNumber = row.querySelector('td:nth-child(2)').textContent;
            if (confirm(`Are you sure you want to delete account: ${accountNumber}?`)) {
                alert('Account deleted successfully');
                row.remove();
            }
        });
    });
}

function initPagination() {
    const paginationButtons = document.querySelectorAll('nav[aria-label="Pagination"] button');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // For prototype, just show an alert
            alert('Pagination will be implemented in the final version');
        });
    });
}

function initSchemeFilter() {
    const filterButtons = document.querySelectorAll('.scheme-filter');
    const rows = document.querySelectorAll('tbody tr');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'border-indigo-500', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            this.classList.add('active', 'border-indigo-500', 'text-indigo-600');
            this.classList.remove('border-transparent', 'text-gray-500');

            // Filter rows
            const selectedScheme = this.dataset.scheme;
            let visibleCount = 0;
            
            rows.forEach(row => {
                const schemeBadge = row.querySelector('.bg-green-100, .bg-blue-100, .bg-purple-100');
                if (!schemeBadge) return;
                
                const schemeText = schemeBadge.textContent.trim();
                let showRow = false;

                if (selectedScheme === 'all') {
                    showRow = true;
                } else if (selectedScheme === 'TD') {
                    showRow = schemeText === 'Term Deposit';
                } else if (selectedScheme === 'RD') {
                    showRow = schemeText === 'Recurring Deposit';
                } else if (selectedScheme === 'MIS') {
                    showRow = schemeText === 'Monthly Income';
                }
                
                row.style.display = showRow ? '' : 'none';
                if (showRow) visibleCount++;
            });

            // Update the results count
            const resultsText = document.querySelector('.text-sm.text-gray-700');
            if (resultsText) {
                resultsText.innerHTML = `Showing <span class="font-medium">1</span> to <span class="font-medium">${visibleCount}</span> of <span class="font-medium">${visibleCount}</span> results`;
            }
        });
    });
} 