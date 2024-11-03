const initialBalance = parseFloat(document.getElementById('balance').innerHTML);
let balance = initialBalance;


function addTransaction(transaction){
    //if not in storage, initialize as empty array
    const transactions = JSON.parse(localStorage.getItem('transactions')) || []; 
    transactions.push(transaction);
    localStorage.setItem('transactions',JSON.stringify(transactions));
    loadTransactions();
}

function loadTransactions(){
    const transactionsContainer=document.getElementById('transactions-list');    
    transactionsContainer.innerHTML='';

    balance = initialBalance;

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction =>{
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction-element');
        transactionElement.innerHTML = 
            `<p>Name: ${transaction.name}</p>
            <p>Amount: ${parseFloat(transaction.amount).toFixed(2)}USD</p>
            <p><span>${transaction.date}</span><span>${transaction.time}</span><p>`;

        transactionsContainer.appendChild(transactionElement);


        balance -= parseFloat(transaction.amount);
        
    
    }); 
    
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
    localStorage.setItem('currentBalance',balance.toFixed(2));
}



document.addEventListener("DOMContentLoaded", () => {
    loadTransactions();
});





