document.addEventListener('DOMContentLoaded', function() {
    initSchemeSelection();
    initCalculators();
    initBreakdownViews();
    initActionButtons();

    // Handle user profile button
    const userProfileButton = document.querySelector('button.text-gray-700');
    userProfileButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
});

// Scheme-specific configurations
const schemeConfig = {
    TD: {
        terms: [3, 6, 12, 24, 36],
        interestRates: {
            3: 5.50,
            6: 6.00,
            12: 6.50,
            24: 7.00,
            36: 7.25
        },
        minAmount: 10000,
        maxAmount: 5000000,
        interestFrequency: 'Quarterly'
    },
    RD: {
        terms: [12, 24, 36, 48, 60],
        interestRates: {
            12: 5.75,
            24: 6.00,
            36: 6.25,
            48: 6.50,
            60: 6.75
        },
        minAmount: 1000,
        maxAmount: 50000,
        interestFrequency: 'Monthly'
    },
    MIS: {
        terms: [12, 24, 36],
        interestRates: {
            12: 6.00,
            24: 6.25,
            36: 6.50
        },
        minAmount: 50000,
        maxAmount: 1000000,
        interestFrequency: 'Monthly'
    }
};

function initSchemeSelection() {
    const schemeTabs = document.querySelectorAll('.scheme-tab');
    const termSelection = document.getElementById('termSelection');
    const depositAmount = document.getElementById('depositAmount');
    const interestRate = document.getElementById('interestRate');
    const maturityDate = document.getElementById('maturityDate');
    const amountGuidelines = document.getElementById('amountGuidelines');
    let currentScheme = 'TD';

    // Initialize with TD scheme
    updateTermOptions('TD');
    updateAmountGuidelines('TD');
    setDefaultMaturityDate();

    schemeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            schemeTabs.forEach(t => {
                t.classList.remove('active', 'border-indigo-500', 'text-indigo-600');
                t.classList.add('border-transparent', 'text-gray-500');
            });
            this.classList.add('active', 'border-indigo-500', 'text-indigo-600');
            this.classList.remove('border-transparent', 'text-gray-500');

            // Update scheme-specific elements
            const scheme = this.dataset.scheme;
            currentScheme = scheme;
            updateTermOptions(scheme);
            updateAmountGuidelines(scheme);
            updateCalculations();
            toggleSchemeSpecificSections(scheme);
        });
    });

    // Handle term selection change
    termSelection.addEventListener('change', function() {
        const selectedTerm = parseInt(this.value);
        if (selectedTerm) {
            const rate = schemeConfig[currentScheme].interestRates[selectedTerm];
            interestRate.value = rate;
            updateMaturityDate(selectedTerm);
            updateCalculations();
        }
    });

    // Handle deposit amount change
    depositAmount.addEventListener('input', function() {
        // Remove any non-numeric characters except decimal point
        this.value = this.value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = this.value.split('.');
        if (parts.length > 2) {
            this.value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit decimal places to 2
        if (parts[1] && parts[1].length > 2) {
            this.value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        
        validateAmount(this, currentScheme);
        updateCalculations();
    });

    // Handle interest rate change
    interestRate.addEventListener('input', function() {
        const term = parseInt(termSelection.value);
        if (term) {
            updateMaturityDate(term);
            updateCalculations();
        }
    });

    // Handle maturity date change
    maturityDate.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        const months = (selectedDate.getFullYear() - today.getFullYear()) * 12 + 
                      (selectedDate.getMonth() - today.getMonth());
        
        if (months > 0) {
            termSelection.value = months;
            const rate = schemeConfig[currentScheme].interestRates[months] || 0;
            interestRate.value = rate;
            updateCalculations();
        }
    });
}

function setDefaultMaturityDate() {
    const maturityDate = document.getElementById('maturityDate');
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 1); // Minimum date is tomorrow
    
    maturityDate.min = minDate.toISOString().split('T')[0];
    maturityDate.value = minDate.toISOString().split('T')[0];
}

function updateTermOptions(scheme) {
    const termSelection = document.getElementById('termSelection');
    termSelection.innerHTML = '<option value="">Select Term</option>';
    
    schemeConfig[scheme].terms.forEach(term => {
        const option = document.createElement('option');
        option.value = term;
        option.textContent = term + (term === 1 ? ' Month' : ' Months');
        termSelection.appendChild(option);
    });
}

function updateAmountGuidelines(scheme) {
    const { minAmount, maxAmount } = schemeConfig[scheme];
    const guidelines = document.getElementById('amountGuidelines');
    guidelines.textContent = `Min: ₹${minAmount.toLocaleString('en-IN')} | Max: ₹${maxAmount.toLocaleString('en-IN')}`;
}

function validateAmount(input, scheme) {
    const value = parseFloat(input.value);
    let min, max;
    
    switch(scheme) {
        case 'TD':
            min = 10000;
            max = 5000000;
            break;
        case 'RD':
            min = 1000;
            max = 100000;
            break;
        case 'MIS':
            min = 25000;
            max = 1000000;
            break;
        default:
            min = 10000;
            max = 5000000;
    }

    if (isNaN(value) || value < min || value > max) {
        input.setCustomValidity(`Amount must be between ₹${min.toLocaleString('en-IN')} and ₹${max.toLocaleString('en-IN')}`);
        input.classList.add('border-red-500');
    } else {
        input.setCustomValidity('');
        input.classList.remove('border-red-500');
    }
    input.reportValidity();
}

function updateMaturityDate(months) {
    const maturityDate = document.getElementById('maturityDate');
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    maturityDate.value = date.toISOString().split('T')[0];
}

function initCalculators() {
    // Initialize calculator displays
    updateCalculations();
}

function updateCalculations() {
    const amount = parseFloat(document.getElementById('depositAmount').value) || 0;
    const termSelect = document.getElementById('termSelection');
    const term = parseInt(termSelect.value) || 0;
    const scheme = document.querySelector('.scheme-tab.active').dataset.scheme;
    const rate = term ? schemeConfig[scheme].interestRates[term] : 0;

    // Update Investment Summary
    document.getElementById('summaryPrincipal').textContent = formatCurrency(amount);
    document.getElementById('summaryRate').textContent = rate + '% p.a.';
    document.getElementById('summaryTerm').textContent = term + (term === 1 ? ' month' : ' months');
    document.getElementById('summaryFrequency').textContent = schemeConfig[scheme].interestFrequency;

    // Calculate interest and maturity amount based on scheme
    let interestEarned = 0;
    let maturityAmount = amount;
    let tds = 0;

    switch(scheme) {
        case 'TD':
            // Quarterly compounding
            const quarterlyRate = rate / 400; // Convert annual rate to quarterly
            const quarters = term / 3;
            maturityAmount = amount * Math.pow(1 + quarterlyRate, quarters);
            interestEarned = maturityAmount - amount;
            break;
        
        case 'RD':
            // Monthly deposits with monthly compounding
            const monthlyRate = rate / 1200; // Convert annual rate to monthly
            const monthlyDeposit = amount;
            maturityAmount = monthlyDeposit * ((Math.pow(1 + monthlyRate, term) - 1) / monthlyRate);
            interestEarned = maturityAmount - (monthlyDeposit * term);
            
            // Update RD specific details
            document.getElementById('rdInstallment').textContent = formatCurrency(monthlyDeposit);
            document.getElementById('rdTotalDeposits').textContent = formatCurrency(monthlyDeposit * term);
            break;
        
        case 'MIS':
            // Simple interest paid monthly
            interestEarned = (amount * rate * term) / 1200; // Monthly interest
            const monthlyIncome = interestEarned / term;
            maturityAmount = amount; // Principal returned at maturity
            
            // Update MIS specific details
            document.getElementById('misMonthlyIncome').textContent = formatCurrency(monthlyIncome);
            document.getElementById('misTotalPayout').textContent = formatCurrency(interestEarned);
            break;
    }

    // Calculate TDS (10% if interest > ₹40,000 per year)
    const annualizedInterest = (interestEarned * 12) / term;
    if (annualizedInterest > 40000) {
        tds = interestEarned * 0.1;
    }

    // Update Maturity Details
    document.getElementById('maturityInterest').textContent = formatCurrency(interestEarned);
    document.getElementById('maturityTDS').textContent = formatCurrency(tds);
    document.getElementById('maturityAmount').textContent = formatCurrency(maturityAmount - tds);

    // Update breakdown
    updateBreakdown(amount, interestEarned, term, scheme);
}

function toggleSchemeSpecificSections(scheme) {
    const rdDetails = document.getElementById('rdDetails');
    const misDetails = document.getElementById('misDetails');

    rdDetails.classList.toggle('hidden', scheme !== 'RD');
    misDetails.classList.toggle('hidden', scheme !== 'MIS');
}

function initBreakdownViews() {
    const tableView = document.getElementById('tableView');
    const chartView = document.getElementById('chartView');
    const breakdownTable = document.getElementById('breakdownTable');
    const breakdownChart = document.getElementById('breakdownChart');

    tableView.addEventListener('click', function() {
        tableView.classList.add('bg-indigo-100', 'text-indigo-600');
        tableView.classList.remove('bg-gray-100', 'text-gray-600');
        chartView.classList.add('bg-gray-100', 'text-gray-600');
        chartView.classList.remove('bg-indigo-100', 'text-indigo-600');
        breakdownTable.classList.remove('hidden');
        breakdownChart.classList.add('hidden');
    });

    chartView.addEventListener('click', function() {
        chartView.classList.add('bg-indigo-100', 'text-indigo-600');
        chartView.classList.remove('bg-gray-100', 'text-gray-600');
        tableView.classList.add('bg-gray-100', 'text-gray-600');
        tableView.classList.remove('bg-indigo-100', 'text-indigo-600');
        breakdownChart.classList.remove('hidden');
        breakdownTable.classList.add('hidden');
    });
}

function updateBreakdown(principal, totalInterest, term, scheme) {
    updateBreakdownTable(principal, totalInterest, term, scheme);
    updateBreakdownChart(principal, totalInterest, term, scheme);
}

function updateBreakdownTable(principal, totalInterest, term, scheme) {
    const tbody = document.getElementById('breakdownTableBody');
    tbody.innerHTML = '';

    let currentPrincipal = principal;
    const monthlyInterest = totalInterest / term;

    for (let i = 1; i <= term; i++) {
        const row = document.createElement('tr');
        
        // Calculate values based on scheme
        let periodPrincipal = currentPrincipal;
        let periodInterest = monthlyInterest;
        let balance = currentPrincipal;

        switch(scheme) {
            case 'RD':
                periodPrincipal = principal * i;
                balance = periodPrincipal + (monthlyInterest * i);
                break;
            case 'TD':
                if (i % 3 === 0) { // Quarterly compounding
                    const quarterlyInterest = (totalInterest * 3) / term;
                    periodInterest = quarterlyInterest;
                    balance = currentPrincipal + quarterlyInterest;
                    currentPrincipal = balance;
                } else {
                    periodInterest = 0;
                }
                break;
            case 'MIS':
                // Principal remains same, only monthly interest is paid out
                balance = principal;
                break;
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Month ${i}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(periodPrincipal)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(periodInterest)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(balance)}</td>
        `;
        
        tbody.appendChild(row);
    }
}

function updateBreakdownChart(principal, totalInterest, term, scheme) {
    const ctx = document.getElementById('interestChart').getContext('2d');
    const labels = Array.from({length: term}, (_, i) => `Month ${i + 1}`);
    
    let principalData = [];
    let interestData = [];
    let currentPrincipal = principal;
    const monthlyInterest = totalInterest / term;

    for (let i = 0; i < term; i++) {
        switch(scheme) {
            case 'RD':
                principalData.push(principal * (i + 1));
                interestData.push(monthlyInterest * (i + 1));
                break;
            case 'TD':
                principalData.push(currentPrincipal);
                if ((i + 1) % 3 === 0) {
                    const quarterlyInterest = (totalInterest * 3) / term;
                    interestData.push(quarterlyInterest);
                    currentPrincipal += quarterlyInterest;
                } else {
                    interestData.push(0);
                }
                break;
            case 'MIS':
                principalData.push(principal);
                interestData.push(monthlyInterest * (i + 1));
                break;
        }
    }

    // Destroy existing chart if it exists
    if (window.breakdownChart instanceof Chart) {
        window.breakdownChart.destroy();
    }

    window.breakdownChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Principal',
                data: principalData,
                borderColor: 'rgb(79, 70, 229)',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true
            }, {
                label: 'Interest',
                data: interestData,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}

function initActionButtons() {
    const resetButton = document.querySelector('button.bg-gray-200');
    const createButton = document.querySelector('button.bg-indigo-600');

    resetButton.addEventListener('click', function() {
        document.getElementById('schemeForm').reset();
        document.getElementById('depositAmount').value = '';
        document.getElementById('interestRate').value = '';
        document.getElementById('maturityDate').value = '';
        updateCalculations();
    });

    createButton.addEventListener('click', function() {
        const amount = document.getElementById('depositAmount').value;
        const term = document.getElementById('termSelection').value;
        
        if (!amount || !term) {
            alert('Please fill in all required fields');
            return;
        }
        
        alert('Deposit created successfully!');
        window.location.href = 'term-deposits.html';
    });
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
} 