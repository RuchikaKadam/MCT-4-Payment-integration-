let cartData = sessionStorage.getItem("cartData")
  ? JSON.parse(sessionStorage.getItem("cartData"))
  : [];

let totalPrice = cartData.reduce((acc, curItem) => {
  return acc + curItem.price;
}, 0);

let amountToBePaid = totalPrice;
const courseDiv = document.createElement("div");
const btn = document.querySelector("#payNow");
// Get the cart container and pay now button
const cartContainer = document.querySelector(".cart_container");
// 1
// function dealing with cart
function cartDataLoad() {
  let cart = document.querySelector(".cart");
  cartData.map((course) => {
    
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
    btn.addEventListener("click",() =>{
      initializeRazorpay(amountToBePaid);
    })

    btn.innerHTML = `Pay &#8377 ${totalPrice}`;
  });
}
//2
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

function initializeRazorpay(amountToBePaid) {
	// Payment options for Razorpay
	var options = {
	  key: "rzp_test_3YddYTESNr2nEb",
	  amount: amountToBePaid * 100,
	  currency: 'INR',
	  name: 'Sanskrit Insider',
	  description: 'Payment for selected courses',
	  image: '/assets/logo_SI.png',
	  handler: function (response) {
	  },
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
  btn.onclick = function (e) {
    // Event listener for button click to initiate payment
    if(totalPrice === 0){
      alert("Add courses to pay");// Alert to add courses in the cart
      return;
    }
    rzp.open(); // Opening Razorpay payment popup
    e.preventDefault();// Preventing default button click behavior
  };
}
btn.addEventListener("click",() =>{
  initializeRazorpay(amountToBePaid);
})
//dark bg of navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(`.navbar`);
  if (window.scrollY > 100) {
    navbar.classList.add("bg-color");
  } else {
    navbar.classList.remove("bg-color");
  }
});