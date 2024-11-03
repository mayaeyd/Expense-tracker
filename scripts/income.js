document.addEventListener('DOMContentLoaded',()=>{
    const balance = localStorage.getItem('currentBalance');
    console.log(balance);
    
    document.getElementById('balance').innerHTML =balance;
});