document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initDepositsChart();
    initLoansChart();
    initCollectionsChart();
    initMemberGrowthChart();

    // Handle date filter
    const applyButton = document.querySelector('button.bg-indigo-600');
    applyButton.addEventListener('click', function() {
        // In a real application, this would fetch new data and update charts
        alert('Date filter will be implemented in the final version');
    });

    // Handle export button
    const exportButton = document.querySelector('button.bg-green-600');
    exportButton.addEventListener('click', function() {
        alert('Report export functionality will be implemented in the final version');
    });

    // Handle user profile button
    const userProfileButton = document.querySelector('button.text-gray-700');
    userProfileButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
});

function initDepositsChart() {
    const ctx = document.getElementById('depositsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Savings',
                    data: [450000, 520000, 580000, 600000, 650000, 700000],
                    backgroundColor: 'rgba(99, 102, 241, 0.5)',
                    borderColor: 'rgb(99, 102, 241)',
                    borderWidth: 1
                },
                {
                    label: 'Term Deposits',
                    data: [250000, 300000, 320000, 380000, 400000, 500000],
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function initLoansChart() {
    const ctx = document.getElementById('loansChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Pending', 'Overdue', 'Closed'],
            datasets: [{
                data: [65, 15, 10, 10],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.5)',
                    'rgba(245, 158, 11, 0.5)',
                    'rgba(239, 68, 68, 0.5)',
                    'rgba(107, 114, 128, 0.5)'
                ],
                borderColor: [
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(107, 114, 128)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initCollectionsChart() {
    const ctx = document.getElementById('collectionsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Collections',
                data: [120000, 135000, 125000, 150000, 160000, 175000],
                fill: true,
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                borderColor: 'rgb(147, 51, 234)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function initMemberGrowthChart() {
    const ctx = document.getElementById('memberGrowthChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Total Members',
                data: [2200, 2280, 2350, 2390, 2420, 2453],
                fill: false,
                borderColor: 'rgb(99, 102, 241)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
} 