balance=parseFloat(document.getElementById('balance').innerHTML);

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('currentBalance')) {
        localStorage.setItem('currentBalance', '2000');
    }
    loadBalance();
});


function loadBalance() {
    balance = parseFloat(localStorage.getItem('currentBalance')) || 2000;
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
}

function addTransaction(transaction) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    balance -= parseFloat(transaction.amount);
    localStorage.setItem('currentBalance', balance.toFixed(2));

    loadBalance();
    loadTransactions();
}

function loadTransactions(){
    const transactionsContainer=document.getElementById('transactions-list');    
    transactionsContainer.innerHTML='';

    balance = parseFloat(localStorage.getItem('currentBalance')) || 0;;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction =>{
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction-element');
        transactionElement.classList.add('pointer');
        transactionElement.innerHTML = 
            `<p>Name: ${transaction.name}</p>
            <p>Amount: ${parseFloat(transaction.amount).toFixed(2)}USD</p>
            <p><span>${transaction.date}</span><span>${transaction.time}</span><p>
            <button class="refund-button" style="display: block;">Refund</button>`;

        transactionsContainer.appendChild(transactionElement);   
        
        const tableContainer = document.getElementById('transaction-table-container'); 
        const transactionRow = document.createElement('div');
        transactionRow.innerHTML = `
            <div class="flex transaction-table-row">
                <p class="row-element">${transaction.name}</p>
                <p class="row-element">${transaction.date}</p>
                <p class="row-element" style="color: #E02C2A;">${parseFloat(transaction.amount).toFixed(2)}</p>
                <p class="row-element">${transaction.currency}</p>
                <p class="row-element">${transaction.tel}</p>
            </div>
        `;

        tableContainer.appendChild(transactionRow);

        const refundButton = transactionElement.querySelector('.refund-button');
        refundButton.addEventListener('click', () => {
            balance += parseFloat(transaction.amount);
            document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
            localStorage.setItem('currentBalance', balance.toFixed(2));

            const updatedTransactions = transactions.filter(tx => tx !== transaction);
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

            loadTransactions();
        });
    }); 
    
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
    localStorage.setItem('currentBalance',balance.toFixed(2));
}

//open the form
document.getElementById("send-money").addEventListener('click',()=>{
    const item2= document.getElementById('item2');
    const item3= document.getElementById("item3");
    if (item3.style.display === 'none' || item3.style.display === '') {
        item3.style.display = 'flex';
        setTimeout(() => {
            item2.style.gridRow=1;
            item3.style.transform = 'translateY(0)'; 
        }, 100); 
    }
});

document.getElementById("transactions-form").addEventListener('submit',(e)=>{

    const name = document.getElementById("receiver-name").value;
    let amount = document.getElementById('transaction-amount').value;
    const phoneNumber = document.getElementById('receiver-tel').value;
    const currency = document.getElementById('currency').value;

    if(currency === 'LBP') { amount = amount/90000 }

    if(balance >= amount){
        const transaction = {
            id:Date.now().toString(),
            name:name,
            amount:amount,
            tel: phoneNumber,
            currency: currency,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
    
        addTransaction(transaction);
    }else{
        alert('Insufficient balance to complete this transaction');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    loadBalance();
    loadTransactions();
});

