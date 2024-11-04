const initialBalance = parseFloat(document.getElementById('balance').innerHTML);
let balance = initialBalance;

function loadBalance(){
    balance = parseFloat(localStorage.getItem('currentBalance')) || initialBalance;
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
}

function renderIncomeTable() {
    const summaryTableDiv = document.getElementById('summary-table');

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#f0f0f0';

    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Date', 'Amount', 'Currency', 'Source'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.innerText = headerText;
        header.style.padding = '10px';
        header.style.border = '1px solid #ddd';
        header.style.textAlign = 'left';
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Create a row for each income
    incomes.forEach(income => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.innerText = income.name;
        nameCell.style.padding = '10px';
        nameCell.style.border = '1px solid #ddd';

        const dateCell = document.createElement('td');
        dateCell.innerText = income.date;
        dateCell.style.padding = '10px';
        dateCell.style.border = '1px solid #ddd';

        const amountCell = document.createElement('td');
        amountCell.innerText = parseFloat(income.amount).toFixed(2);
        amountCell.style.padding = '10px';
        amountCell.style.border = '1px solid #ddd';

        const currencyCell = document.createElement('td');
        currencyCell.innerText = income.currency;
        currencyCell.style.padding = '10px';
        currencyCell.style.border = '1px solid #ddd';

        const sourceCell = document.createElement('td');
        sourceCell.innerText = income.source;
        sourceCell.style.padding = '10px';
        sourceCell.style.border = '1px solid #ddd';

        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(currencyCell);
        row.appendChild(sourceCell);

        table.appendChild(row);
    });

    summaryTableDiv.innerHTML = '';
    summaryTableDiv.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
    loadBalance();
    loadTransactions();
});

// console.log(localStorage.getItem('incomes'));

// const incomes = JSON.parse(localStorage.getItem('incomes')) || [];






