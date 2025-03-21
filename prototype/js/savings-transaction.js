document.addEventListener('DOMContentLoaded', function() {
    // Initialize forms
    initTransactionForm();
    initInterestCalculator();

    // Handle user profile button
    const userProfileButton = document.querySelector('button.text-gray-700');
    userProfileButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
});

function initTransactionForm() {
    const form = document.getElementById('transactionForm');
    const amountInput = document.getElementById('amount');
    const transactionType = document.getElementById('transactionType');

    // Set current date as default
    const dateInput = form.querySelector('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        if (!amountInput.value) {
            alert('Please enter an amount');
            return;
        }

        // Show success message
        alert('Transaction submitted successfully!');
        form.reset();
        dateInput.value = today;
    });

    // Handle amount validation
    amountInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
}

function initInterestCalculator() {
    const form = document.getElementById('interestForm');
    const balanceInput = form.querySelector('input[value="50000"]');
    const rateInput = form.querySelector('input[value="3.5"]');
    const periodSelect = form.querySelector('select');

    // Function to calculate interest
    function calculateInterest() {
        const balance = parseFloat(balanceInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const months = parseInt(periodSelect.value) || 1;

        // Simple interest calculation
        const annualInterest = (balance * rate * months) / (12 * 100);
        const monthlyInterest = annualInterest / months;
        const totalAmount = balance + annualInterest;

        // Update calculation display
        updateInterestDisplay(balance, rate, annualInterest, totalAmount);
        updateMonthlyBreakdown(monthlyInterest, months);
    }

    // Add event listeners
    balanceInput.addEventListener('input', calculateInterest);
    rateInput.addEventListener('input', calculateInterest);
    periodSelect.addEventListener('change', calculateInterest);

    // Initial calculation
    calculateInterest();
}

function updateInterestDisplay(principal, rate, interest, total) {
    const calculationDiv = document.querySelector('.bg-gray-50');
    const amounts = calculationDiv.querySelectorAll('.font-medium');

    amounts[0].textContent = '₹' + principal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    amounts[1].textContent = rate.toFixed(1) + '% p.a.';
    amounts[2].textContent = '₹' + interest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    amounts[3].textContent = '₹' + total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateMonthlyBreakdown(monthlyInterest, months) {
    const breakdownDiv = document.querySelectorAll('.bg-gray-50')[1];
    const breakdownList = breakdownDiv.querySelector('.space-y-2');
    breakdownList.innerHTML = '';

    // Show first 3 months
    for (let i = 1; i <= Math.min(3, months); i++) {
        breakdownList.innerHTML += `
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Month ${i}:</span>
                <span class="text-sm font-medium">₹${monthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        `;
    }
} 