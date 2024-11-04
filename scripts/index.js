const initialBalance = parseFloat(document.getElementById('balance').innerHTML);
let balance = initialBalance;

function loadBalance(){
    balance = parseFloat(localStorage.getItem('currentBalance')) || initialBalance;
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
}

function loadTransactions() {
    const transactionsContainer = document.getElementById('transactions-list');
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const dashboardTableContainer = document.getElementById('dashboard-table-container');

    transactionsContainer.innerHTML = ''; // Clear previous transactions

    incomes.forEach(income => {
        const incomeElement = document.createElement('div');
        incomeElement.innerHTML = `
            <div class="flex dashboard-table-row">
                <p class="row-element">${income.name}</p>
                <p class="row-element">${income.date}</p>
                <p class="row-element" style="color: green;">${parseFloat(income.amount).toFixed(2)}</p>
                <p class="row-element">${income.currency}</p>
                <p class="row-element">${income.source}</p>
            </div>
        `;
        dashboardTableContainer.appendChild(incomeElement);
    });

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction-element');
        transactionElement.innerHTML = `
            <p>Name: ${transaction.name}</p>
            <p>Amount: ${parseFloat(transaction.amount).toFixed(2)} ${transaction.currency}</p>
            <p><span>${transaction.date}</span><span>${transaction.time}</span></p>
        `;
        transactionsContainer.appendChild(transactionElement);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadBalance();
    loadTransactions();
});

// console.log(localStorage.getItem('incomes'));

// const incomes = JSON.parse(localStorage.getItem('incomes')) || [];






