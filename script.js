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



let cartData = sessionStorage.getItem("cartData")
  ? JSON.parse(sessionStorage.getItem("cartData"))
  : [];

// Cart
function cartDataLoad() {
  let cart = document.querySelector(".cart");
  cartData.map((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course");

    // Add the course details to the div
    courseDiv.innerHTML = `
    <h3>${course.name}</h3>
    <p>Price: &#8377; ${course.price}</p>
    <br>
    `;
    // Add the course div to the cart container
    cart.appendChild(courseDiv);
    // Update the total price

    const btn = document.querySelector("#payNow");
    let totalPrice = cartData.reduce((acc, curItem) => {
      return acc + curItem.price;
    }, 0);

    btn.innerHTML = `Pay &#8377 ${totalPrice}`;
  });
}

//2
// Get the cart container and pay now button
const cartContainer = document.querySelector(".cart_container");
const payNowButton = document.getElementById("payNow");

// Function to add a course to the cart
function addToCart(course) {
  let isExist = cartData.find((item) => item.name == course.name);

  if (!isExist) {
    cartData.push(course);
    sessionStorage.removeItem("cartData");
    sessionStorage.setItem("cartData", JSON.stringify(cartData));
    cartDataLoad();
  }
}

// Function to update the total price
function updateTotalPrice(priceChange) {
  // Get the current total price
  const totalPrice = parseInt(
    cartContainer.querySelector(".totalPrice").textContent.split(" ")[1]
  );

  // Update the total price
  cartContainer.querySelector(
    ".totalPrice"
  ).textContent = `Total Price: &#8377; ${totalPrice + priceChange}`;
}

// Add event listeners to the add to cart buttons
document.querySelectorAll(".addToCart").forEach((button) => {
  button.addEventListener("click", () => {
    const course = {
      name: button.dataset.name,
      price: parseInt(button.dataset.price),
    };
    addToCart(course);
  });
});

// Add event listener to the pay now button
// payNowButton.addEventListener('click', () => {
//   alert('Payment successful!');
//   // You can add code here to process the payment or redirect to a payment page
// });





//dark bg of navbar
window.addEventListener("scroll", () => {
	console.log(window);
	document.querySelector(`.navbar`).classList.toggle("bg-color", window.scrollY > 100);
});