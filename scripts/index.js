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

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction =>{
        const transactionElement = document.createElement('div');
        transactionElement.textContent = `Name: ${transaction.name}, Amount: ${transaction.amount}, Currency: ${transaction.currency}`;
        transactionsContainer.appendChild(transactionElement);
    });

}

document.addEventListener("DOMContentLoaded", () => {
    loadTransactions();
});





