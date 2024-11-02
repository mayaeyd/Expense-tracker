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
    e.preventDefault();
    const name = document.getElementById("reciever-name").value;
    const amount = document.getElementById('transaction-amount').value;
    const phoneNumber = document.getElementById('reciever-tel').value;
    const currency = document.getElementById('currency').value;

    const transaction = {
        id:Date.now().toString(),
        name:name,
        amount:amount,
        tel: phoneNumber,
        currency: currency
    };

    console.log(transaction);
    

});




