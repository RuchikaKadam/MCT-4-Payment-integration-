// const addToCartBtn = document.querySelector('.btn');
//   const cart = [];

//   addToCartBtn.addEventListener('click', () => {
//     const product = {
//       name: 'Beginner',
//       price: 10
//     };
//     cart.push(product);
//     console.log(cart);
//   });
  


// $(document).ready(function(){
// 	$('.pay-form').submit(function(e){
// 		e.preventDefault();

// 		var formData = $(this).serialize();

// 		$.ajax({
// 			url:"/createOrder",
// 			type:"POST",
// 			data: formData,
// 			success:function(res){
// 				if(res.success){
// 					var options = {
// 						"key": ""+res.key_id+"",
// 						"amount": ""+res.amount+"",
// 						"currency": "INR",
// 						"name": ""+res.product_name+"",
// 						"description": ""+res.description+"",
// 						"image": "https://dummyimage.com/600x400/000/fff",
// 						"order_id": ""+res.order_id+"",
// 						"handler": function (response){
// 							alert("Payment Succeeded");
// 							// window.open("/","_self")
// 						},
// 						"prefill": {
// 							"contact":""+res.contact+"",
// 							"name": ""+res.name+"",
// 							"email": ""+res.email+""
// 						},
// 						"notes" : {
// 							"description":""+res.description+""
// 						},
// 						"theme": {
// 							"color": "#2300a3"
// 						}
// 					};
// 					var razorpayObject = new Razorpay(options);
// 					razorpayObject.on('payment.failed', function (response){
// 							alert("Payment Failed");
// 					});
// 					razorpayObject.open();
// 				}
// 				else{
// 					alert(res.msg);
// 				}
// 			}
// 		})

// 	});
// });

document.addEventListener('DOMContentLoaded', () => {
	const addToCartButtons = document.querySelectorAll('.addToCart');
	const cart = document.getElementById('cart');
	const payNowButton = document.querySelector('#cart .payNow');
	let totalPrice = 0;
  
	addToCartButtons.forEach(button => {
	  button.addEventListener('click', () => {
		const name = button.dataset.name;
		const price = button.dataset.price;
  
		const product = document.createElement('div');
		product.classList.add('product');
		product.innerHTML = `
		  <h3>${name}</h3>
		  <p>&#8377; ${price}</p>
		`;
  
		cart.appendChild(product);
  
		totalPrice += parseInt(price);
		payNowButton.innerHTML = `Pay <span>&#8377; ${totalPrice}</span>`;
	  });
	});
  });













//   not important or related to the actual project
  const animatedBtn = document.querySelector(".popup");
  animatedBtn.addEventListener("click",()=>{
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = '🌠';
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);
  
    heart.style.left = randomX + 'px';
    heart.style.top = randomY + 'px';
  
    backgroundContainer.appendChild(heart);
    // Removes the heart element after 2 seconds
    setTimeout(()=>{
        heart.remove();

    }, 2000);
});