let balance = parseFloat(localStorage.getItem('currentBalance')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('currentBalance')) {
        localStorage.setItem('currentBalance', '2000');
    }
    loadBalance();
});

document.addEventListener('DOMContentLoaded', () => {
    loadBalance();
    loadIncomes();
    updateBalanceArrow();
});

document.addEventListener('DOMContentLoaded',()=>{
    console.log("Initial balance", balance);
    
    document.getElementById('balance').innerHTML =balance.toFixed(2);

    updateBalanceArrow();

    document.getElementById('total-income').style.color='#189C34';
    document.getElementById('expenses').style.color='#E02C2A';

});

function updateBalanceArrow(){
    if(balance>2000){
        document.getElementById('arrow').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#189C34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';
    }else if(balance<2000){
        document.getElementById('arrow').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E02C2A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-left"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>'
    }
}


document.getElementById('toggle-income-btn').addEventListener('click',()=>{
    event.preventDefault();

    const tableContainer = document.getElementById('table-container');
    const incomeForm = document.getElementById('income-form');

    if(incomeForm.classList.contains('hidden')){
        tableContainer.style.transition = 'opacity 0.5s ease';
        tableContainer.style.opacity = '0';

        setTimeout(() => {
            tableContainer.classList.add('hidden');
            incomeForm.classList.remove('hidden');
            incomeForm.style.animation = 'slideIn 0.5s forwards';
        }, 500);
    }else if(tableContainer.classList.contains('hidden')){
        incomeForm.style.transition = 'opacity 0.5s ease';
        incomeForm.style.opacity = '0';

        setTimeout(() => {
            incomeForm.classList.add('hidden');
            tableContainer.classList.remove('hidden');
            tableContainer.style.animation = 'slideIn 0.5s forwards';
        }, 500);
    } 
});


document.getElementById("income-form").addEventListener('submit',(e)=>{
    e.preventDefault();

    const name = document.getElementById("sender-name").value;
    let amount = parseFloat(document.getElementById('income-amount').value);
    const phoneNumber = document.getElementById('sender-tel').value;
    const source = document.getElementById('source').value;
    const currency = document.getElementById('currency').value;

    // if(currency === 'LBP') { amount = amount/90000 }
    
    const income={
        id:Date.now().toString(),
        name:name,
        amount:amount,
        tel:phoneNumber,
        source:source,
        currency:currency,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    }
    
    addIncome(income);
    loadIncome(income);

    document.getElementById('form').reset();
});

function addIncome(income){
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push(income);
    localStorage.setItem('incomes', JSON.stringify(incomes));

    balance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    balance = income.currency === 'USD' ? balance + income.amount : balance + (income.amount / 90000);

    localStorage.setItem('currentBalance', balance.toFixed(2));
    document.getElementById('balance').innerHTML = localStorage.getItem('currentBalance');
    loadBalance();
}

function loadBalance() {
    balance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    document.getElementById('balance').innerHTML = balance.toFixed(2);
    updateBalanceArrow();
}

function loadIncome(income){
    const tableContainer = document.getElementById('table-container');
    const incomeElement = document.createElement('div')
    incomeElement.innerHTML=`<div class="flex income-table-row">
                    <p class="row-element">${income.name}</p>
                    <p class="row-element">${income.date}</p>
                    <p class="row-element">${income.amount}</p>
                    <p class="row-element">${income.currency}</p>
                    <p class="row-element">${income.source}</p>
                </div>
                `
    
    tableContainer.appendChild(incomeElement);
}


function loadIncomes() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.forEach(income => loadIncome(income));
}

// load incomes on page load
window.addEventListener('DOMContentLoaded', loadIncomes);