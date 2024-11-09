balance=parseFloat(document.getElementById('balance').innerHTML);


function loadBalance() {
    balance = parseFloat(localStorage.getItem('currentBalance')) || 2000;
    document.getElementById('balance').innerHTML = `${balance.toFixed(2)}`;
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

    const userID = localStorage.getItem('userId'); 

    const name = document.getElementById("receiver-name").value;
    let amount = document.getElementById('transaction-amount').value;
    const phoneNumber = document.getElementById('receiver-tel').value;
    const currency = document.getElementById('currency').value;

    const url = `http://localhost/expense-tracker/apis/handleTransaction.php?name=${encodeURIComponent(name)}&amount=${encodeURIComponent(amount)}&tel=${encodeURIComponent(phoneNumber)}&currency=${encodeURIComponent(currency)}&userID=${encodeURIComponent(userID)}`;

    fetch(url, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    

    
});

document.addEventListener("DOMContentLoaded", () => {
    loadBalance();
    loadTransactions();
});

