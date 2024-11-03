document.addEventListener('DOMContentLoaded',()=>{
    const balance = localStorage.getItem('currentBalance');
    console.log(balance);
    
    document.getElementById('balance').innerHTML =balance;

    if(balance>2000){
        document.getElementById('arrow').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#189C34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';
    }else if(balance<2000){
        document.getElementById('arrow').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E02C2A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-left"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>'
    }

    document.getElementById('total-income').style.color='#189C34';
    document.getElementById('expenses').style.color='#E02C2A';

});

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
