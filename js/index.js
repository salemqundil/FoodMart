let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

fetch("../pages/dataPro.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products; // Access the products array
    let categoryName = "breadsAndSweets";
    const favoritesList = document.getElementById("fav-list"); // Favorites list element

    products.forEach((product) => {
      if (categoryName != product.category) {
        categoryName = product.category;
        console.log(categoryName);
        document.getElementById("card_trending").innerHTML += `
          <div class="col product-item" data-product-id="${product.id}">
            <a id="fav-btn-${product.id}" href="#" class="btn-wishlist">
              <svg width="24" height="24">
                <use xlink:href="#heart"></use>
              </svg>
            </a>
            <figure>
              <a href="" title="Product Title">
                <img id="product-img-${product.id}" src="${product.image_url}" class="tab-image">
              </a>
            </figure>
            <h3 id="product-name-${product.id}"></h3>
            <span class="qty">1 Unit</span>
            <span class="rating">
              <svg width="24" height="24" class="text-primary">
                <use xlink:href="#star-solid"></use>
              </svg> 4.5
            </span>
            <span id="product-price-${product.id}" class="price">
              ${product.price.toFixed(2)} $
            </span>
            <div class="d-flex align-items-center justify-content-between">
              <div class="input-group product-qty">
                <span class="input-group-btn">
                  <button id="btn_${product.id}" onclick="minusProductQty(${product.id})" type="button" class="quantity-left-minus btn btn-danger btn-number btn_cart_count" data-type="minus">
                    <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                  </button>
                </span>
                <input type="text" id="quantity_${product.id}" name="quantity" class="form-control input-number" value="1">
                <span class="input-group-btn">
                  <button onclick="plusProductQty(${product.id})" type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                    <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                  </button>
                </span>
              </div>
              <a href="#" id="cart_${product.id}" class="nav-link cart_count"> 
                <iconify-icon icon="uil:shopping-cart"></iconify-icon>
              </a>
            </div>
          </div>`;
        addToCartText(product);

        const imgElement = document.getElementById(`product-img-${product.id}`);
        const productPrice = document.getElementById(
          `product-price-${product.id}`
        );
        const productName = document.getElementById(
          `product-name-${product.id}`
        );
        const favButton = document.getElementById(`fav-btn-${product.id}`);
        favoriteIcon(product, favButton);

        imgElement.src = product.image_url;
        productPrice.textContent = product.price.toFixed(2) + " $";
        productName.textContent = product.name;

        imgElement.style.width = "240px";
        imgElement.style.height = "188px";
        imgElement.style.objectFit = "fill";
        imgElement.classList.add("rounded-3");
      }

      favoritesList.addEventListener("click", (event) => {
        console.log("دخلت");
        event.preventDefault();
        displayFavorites();

        window.location.href = "../pages/fav.html";
      });
    });

    // Add event listener on card (if event on fav button call addtofav() , if on image nav me to productDetailsPage, if on cart button call addtoCart())
    document
      .getElementById("card_trending")
      .addEventListener("click", (event) => {
        // Check if the clicked element is a favorite button
        if (event.target.closest(".btn-wishlist")) {
          event.preventDefault();

          // Get the closest product item and retrieve the product ID
          const productItem = event.target.closest(".product-item");
          const productId = productItem.getAttribute("data-product-id");

          // Find the corresponding product in the data
          const product = products.find((p) => p.id == productId);

          // Add or remove from favorites
          addToFavorites(product, event.target.closest(".btn-wishlist"));
        } else if (event.target.closest(".tab-image")) {
          event.preventDefault();
          const productItem = event.target.closest(".product-item");
          const productId = productItem.getAttribute("data-product-id");
          window.location.href = `../pages/productDetails.html?id=${productId}`;
        } else if (event.target.closest(".cart_count")) {
          const productItem = event.target.closest(".product-item");
          const productId = productItem.getAttribute("data-product-id");
          const product = products.find((p) => p.id == productId);
          addToCart(product, event.target.closest(".cart_count"));
        }
        // else if (event.target.closest(".btn_cart_count")) {
        //   const productItem = event.target.closest(".product-item");
        //   const productId = productItem.getAttribute("data-product-id");
        //   const product = products.find((p) => p.id == productId);
        //   addToCart(product, event.target.closest(".cart_count"));
        // }
      });
  })
  .catch((error) => console.error("Error fetching JSON:", error));




  // -----------------------------CheckOut---------------------------------------------------------
document.getElementById('checkout-btn').addEventListener('click', function (e) {
  e.preventDefault(); 

  const isLoggedIn = sessionStorage.getItem('isLoggedIn'); 

  if (isLoggedIn === 'true') {
      window.location.href = '../pages/cart.html';
  } else {
      alert('You need to log in first!');
      window.location.href = '../User-Authentication-with-session-Storage-main/login.html';
  }
});
// --------------------------------------------------------------------------------------



document.getElementById("reg_btn").addEventListener("click", function() {
  window.location.href = "../User-Authentication-with-session-Storage-main/register.html"; // Replace with your actual register page path
});



function plusProductQty(num){
  var product_num =Number( document.getElementById(`quantity_${num}`).value);
  if(product_num<9){
    var product_sum = product_num +1;
    document.getElementById(`quantity_${num}`).value = product_sum;
    cart(num);
  }
  
}
function minusProductQty(num){
  var product_num =Number( document.getElementById(`quantity_${num}`).value);
  if(product_num>1){
    var product_sum = product_num -1;
    document.getElementById(`quantity_${num}`).value = product_sum;
  }
 
}



// // product details page -----------------------------------------

// Get the product ID from the URL
const urlParams_3 = new URLSearchParams(window.location.search);
const productId_3 = urlParams_3.get("id"); // Get the product ID from the URL


//--------------------------Add/Remove to/from Cart----------------------------------
function addToCartText(product) {
  const existingIndexCart = cartList.findIndex((fav) => fav.id === product.id);
  const cardAddBtn = document.getElementById(`cart_${product.id}`);
  if (existingIndexCart >= 0) {
    cardAddBtn.innerText = "Remove from Cart";
  } else {
    cardAddBtn.innerText = "Add to Cart";
  }
}
//------------------------------------------------------------------------------------



// --------------------------------------addToCart------------------------------------
function addToCart(product) {
  const cartListCounter = document.getElementById("cart_count");
  const cardAddBtn = document.getElementById(`cart_${product.id}`);
  // const cardBtn = document.getElementById(`btn_${product.id}`);

  // Check if the product is already in cartList
  const existingIndexCart = cartList.findIndex((cart) => cart.id === product.id);

  if (existingIndexCart === -1) {
    // Product is not in cartList, add it
    cartList.push(product);
    localStorage.setItem("cartList", JSON.stringify(cartList));
    cardAddBtn.innerText = "Remove from Cart";
   
  } else {
    // Product is already in cartList, remove it
    cartList.splice(existingIndexCart, 1);
    localStorage.setItem("cartList", JSON.stringify(cartList));
    cardAddBtn.innerText = "Add to Cart";
  }
  // cart(product.id);
  // Update the cartList counter
  cartListCounter.textContent = cartList.length;
  cart();
}
//-------------------------------------------------------------------------------



// -----------------------------addToFavorites-----------------------------------
function addToFavorites(product, favButton) {
  const favoritesCounter = document.getElementById("favorites-counter");

  // Check if the product is already in favorites
  const existingIndexFavorit = favorites.findIndex(
    (fav) => fav.id === product.id      
  );

  if (existingIndexFavorit === -1) {
    // Product is not in favorites, add it
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favButton.classList.add("text-white");
    favButton.style.backgroundColor = "red"; // Set background color to orange when added
  } else {
    // Product is already in favorites, remove it
    favorites.splice(existingIndexFavorit, 1); 
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favButton.style.backgroundColor = ""; // Set background color back to white when removed
    favButton.classList.remove("text-white");
  }

  // Update the favorites counter
  favoritesCounter.textContent = favorites.length;
}
// ------------------------------------------------------------------------------------



//---------------------------------Your Cart-------------------------------------------
// function cart(num){
//   document.getElementById('cart_list').innerHTML=``;
// let cartItem = JSON.parse(localStorage.getItem('cartList')) || [];
// if(cartItem.length>0){
// cartItem.forEach(element => {
//   var product_num =document.getElementById(`quantity_${num}`).value;
//   var final_Price = product_num * element.price;
//   console.log(final_Price);
//   // var product_num =Number( document.getElementById(`quantity_${element.id}`).value);
//   document.getElementById('cart_list').innerHTML+=`
  
//       <li class="list-group-item d-flex justify-content-between lh-sm">
//         <div>
//           <h6 class="my-0">${element.name}</h6>
//           <small class="text-body-secondary">Brief description</small>
//         </div>
//         <span class="text-body-secondary">${final_Price} JD</span>
//       </li>`;
// });}else{
// document.getElementById('cart_list').innerHTML=``;
// }


// }
cart();
function cart(){
  document.getElementById('cart_list').innerHTML=``;
let cartItem = JSON.parse(localStorage.getItem('cartList')) || [];
if(cartItem.length>0){
cartItem.forEach(element => {
  if(element.id){
  // var product_num =Number( document.getElementById(`quantity_${element.id}`).value);
  document.getElementById('cart_list').innerHTML+=`
  
      <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">${element.name}</h6>
          <small class="text-body-secondary">Brief description</small>
        </div>
        <span class="text-body-secondary">${element.price} JD</span>
      </li>`;}else{document.getElementById('cart_list').innerHTML+=`
  
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">${element.mainName}</h6>
            <small class="text-body-secondary">Brief description</small>
          </div>
          <span class="text-body-secondary">${element.Price} JD</span>
        </li>`;

      }
});}else{
document.getElementById('cart_list').innerHTML=``;
}


}
  //----------------------------------------------------------------------------------





// ----------------------------favorites-----------------------------------------------
function favoriteIcon(product, favButton) {
  const existingIndexFavorit = favorites.findIndex(
    (fav) => fav.id === product.id
  );

  if (existingIndexFavorit > -1) {
    // Product is not in favorites, add it
    favButton.classList.add("text-white");
    favButton.style.backgroundColor = "red"; // Set background color to orange when added
  } else {
    favButton.style.backgroundColor = ""; // Set background color back to white when removed
    favButton.classList.remove("text-white");
  }
}

//---------------------------------------Favorite List-----------------------------
function displayFavorites() {
  // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites-container");

  // Check if favoritesContainer exists
  if (!favoritesContainer) {
    console.error("Favorites container element not found!");
    return;
  }

  // If no favorites, show a message
  if (favorites.length === 0) {
    favoritesContainer.innerHTML =
      '<p class="no-favorites">No favorite items added yet.</p>';
    return;
  }

  // Clear the container to avoid duplicate items
  favoritesContainer.innerHTML = "";

  // Add each favorite item to the page
  favorites.forEach((fav) => {
    const favItem = document.createElement("div");
    favItem.classList.add("fav-item");

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src = fav.image_url;
    imgElement.alt = fav.name;
    imgElement.classList.add("favorite-img"); // Optional: Add class for styling

    // Create name and price details
    const detailsElement = document.createElement("div");
    detailsElement.classList.add("favorite-details"); // Optional: Add class for styling

    const nameElement = document.createElement("h3");
    nameElement.textContent = fav.name;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${fav.price.toFixed(2)}`;

    // Append name and price to the details container
    detailsElement.appendChild(nameElement);
    detailsElement.appendChild(priceElement);

    // Append the image and details to the favorite item container
    favItem.appendChild(imgElement);
    favItem.appendChild(detailsElement);

    // Append the favorite item to the main container
    favoritesContainer.appendChild(favItem);
  });
}
//-----------------------------------------------------------------------------------

// Ensure displayFavorites is called on page load for fav.html
if (window.location.pathname.includes("fav.html")) {
  window.onload = displayFavorites;
}
//-----------------------------------------------------------------------------------
