document.addEventListener('DOMContentLoaded', () => {
    // Initialize Deposits Overview Chart
    const depositsCtx = document.getElementById('depositsChart').getContext('2d');
    const depositsChart = new Chart(depositsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Total Deposits',
                data: [650000, 750000, 850000, 900000, 1000000, 1200000],
                borderColor: 'rgb(79, 70, 229)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value/1000) + 'K';
                        },
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                }
            },
            layout: {
                padding: {
                    left: window.innerWidth < 768 ? 5 : 10,
                    right: window.innerWidth < 768 ? 5 : 10,
                    top: window.innerWidth < 768 ? 5 : 10,
                    bottom: window.innerWidth < 768 ? 5 : 10
                }
            }
        }
    });

    // Initialize Loan Status Chart
    const loansCtx = document.getElementById('loansChart').getContext('2d');
    const loansChart = new Chart(loansCtx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Completed', 'Pending'],
            datasets: [{
                data: [75, 15, 10],
                backgroundColor: [
                    'rgb(34, 197, 94)',  // Green for Active
                    'rgb(79, 70, 229)',  // Blue for Completed
                    'rgb(234, 179, 8)'   // Yellow for Pending
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'right',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        padding: window.innerWidth < 768 ? 15 : 20,
                        font: {
                            size: window.innerWidth < 768 ? 11 : 12,
                            weight: '500'
                        },
                        color: '#4B5563',
                        boxWidth: window.innerWidth < 768 ? 8 : 10
                    }
                }
            },
            layout: {
                padding: {
                    top: window.innerWidth < 768 ? 10 : 20,
                    bottom: window.innerWidth < 768 ? 10 : 20,
                    left: window.innerWidth < 768 ? 10 : 20,
                    right: window.innerWidth < 768 ? 10 : 20
                }
            }
        }
    });

    // Handle window resize for responsive charts
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update chart options based on new window size
            depositsChart.options.scales.y.ticks.font.size = window.innerWidth < 768 ? 10 : 12;
            depositsChart.options.scales.x.ticks.font.size = window.innerWidth < 768 ? 10 : 12;
            
            loansChart.options.plugins.legend.position = window.innerWidth < 768 ? 'bottom' : 'right';
            loansChart.options.plugins.legend.labels.padding = window.innerWidth < 768 ? 15 : 20;
            loansChart.options.plugins.legend.labels.font.size = window.innerWidth < 768 ? 11 : 12;
            loansChart.options.plugins.legend.labels.boxWidth = window.innerWidth < 768 ? 8 : 10;

            // Update layout padding for both charts
            [depositsChart, loansChart].forEach(chart => {
                chart.options.layout.padding = {
                    top: window.innerWidth < 768 ? 10 : 20,
                    bottom: window.innerWidth < 768 ? 10 : 20,
                    left: window.innerWidth < 768 ? 10 : 20,
                    right: window.innerWidth < 768 ? 10 : 20
                };
                chart.update();
            });
        }, 250);
    });

    // Add click event listeners to sidebar links
    document.querySelectorAll('aside a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            document.querySelectorAll('aside a').forEach(l => {
                l.classList.remove('bg-indigo-800');
            });
            // Add active class to clicked link
            e.currentTarget.classList.add('bg-indigo-800');
        });
    });

    // Add click event to user profile button
    const profileButton = document.querySelector('button.flex.items-center');
    if (profileButton) {
        profileButton.addEventListener('click', () => {
            // For prototype: just log out
            if (confirm('Do you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
}); 