// const addToCartBtn = document.querySelector('.btn');
//   const cart = [];

// const { urlencoded } = require("body-parser");

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
const payNowButton = document.querySelector("payNow");

// Event listener for keyup event inside the form
// payNowButton.addEventListener("keyup", ()=>{
// 	// Retrieving the entered value for amount to be paid
// 	const amountToBePaid = payNowButton.children[1].value;
// 	// Initializing Razorpay with the entered amount
  
//   });
  
payNowButton.addEventListener('click', () => {
	const amountToBePaid = totalPrice;
	initializeRazorpay(amountToBePaid);
})
// //   alert('Payment successful!');

function initializeRazorpay(amountToBePaid) {
	// Payment options for Razorpay
	var options = {
	  key: razorpay_key_id,
	  amount: amountToBePaid * 100,
	  currency: 'INR',
	  name: 'Sanskrit Insider',
	  description: 'Payment for selected courses',
	  image: '/assets/logo_SI.png',
	  handler: function (response) {
		// alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
	  },
	  // user detail can be manipulated using logged in user's detail
	  prefill: {
		name: 'Ruchika Kadam',
		email: 'sanskritInsider.com',
		contact: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
	  },
	  notes: {
		address: 'Sanskrit Insider, Pune',
	  },
	  theme: {
		color: '#1f0a573b',
	  },
	};
	 // Creating a new Razorpay instance with the provided options

var rzp = new Razorpay(options);
  document.getElementById('payNow').onclick = function (e) {
    // Event listener for button click to initiate payment
    if(totalPrice === 0){
      alert("Add courses to pay");// Alert to add courses in the cart
      return;
    }
    rzp.open(); // Opening Razorpay payment popup
    e.preventDefault();// Preventing default button click behavior
  };
}




//dark bg of navbar
window.addEventListener("scroll", () => {
	console.log(window);
	document.querySelector(`.navbar`).classList.toggle("bg-color", window.scrollY > 100);
});