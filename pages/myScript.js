let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
const fruitLinks = document.getElementsByClassName("fruit-btn");
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

for (let i = 0; i < fruitLinks.length; i++) {
    fruitLinks[i].addEventListener('click', (event) => {
      event.preventDefault();  // Prevents the default action (navigation)
      window.location.href = '../pages/product.html?category=VegetablesFruits';  // Navigate to fruits.html
    });
  }

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('category');  // Get the product ID from the URL
console.log(typeof(categoryId));
  fetch('../pages/dataPro.json')
  .then(response => response.json())
  .then(data => {
    
    
    
    data.products.forEach(value => {
        if (value.category == categoryId) {
            console.log(categoryId);
            document.getElementById("section_title").innerText= categoryId+" Products";
            document.getElementById('product_row').innerHTML += `
            <div class="product-item swiper-slide">
                    <a id="fav-btn-${value.id}" href="#" class=" btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
                <div style="">
                  <a href="../pages/productDetails.html?id=${value.id}" title="Product Title">
                    <img id="cardImg_${value.id}" class="rounded-2" style="height=130px; width=100%;" src="${value.image_url}">
                  </a>
                </div>
                <h3>${value.name}</h3>
                <span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>
                <span class="price">${value.price}</span>
                <div class="d-flex align-items-center justify-content-between">
              <div class="input-group product-qty">
                <span class="input-group-btn">
                  <button id="btn_${value.id}" onclick="minusProductQty(${value.id})" type="button" class="quantity-left-minus btn btn-danger btn-number btn_cart_count" data-type="minus">
                    <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                  </button>
                </span>
                <input type="text" id="quantity_${value.id}" name="quantity" class="form-control input-number" value="1">
                <span class="input-group-btn">
                  <button onclick="plusProductQty(${value.id})" type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                    <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                  </button>
                </span>
              </div>
              <a href="#" id="cart_${value.id}" class="nav-link cart_count"> 
                <iconify-icon icon="uil:shopping-cart"></iconify-icon>
              </a>
            </div>
            </div>`;
            addToCartTextDetails(value);
            // Adjust image styles
            document.getElementById(`cardImg_${value.id}`).style.width = "100%";
            document.getElementById(`cardImg_${value.id}`).style.height = "200px";
            document.getElementById(`cardImg_${value.id}`).style.objectFit = "cover";
            document.getElementById(`cardImg_${value.id}`).style.backgroundPosition = "center center";
            const favButton = document.getElementById(`fav-btn-${value.id}`);    
                    // favoriteIcon(value,favButton);
 

            // Add event listener for the click event for each product image
            document.getElementById(`cardImg_${value.id}`).addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = `../pages/productDetails.html?id=${value.id}`;
                console.log(window.location.href);
            });
            // favButton.addEventListener('click', (event) => {
            //     event.preventDefault();
            //     // favButton.style.backgroundColor ="orange";
            //     addToFavorites(value ,favButton);
                
            //   });            
            
        }
    }
    );
  
    document.getElementById('product_row').addEventListener('click', (event) => {
      // Check if the clicked element is a favorite button
      if (event.target.closest('.btn-wishlist')) {
        event.preventDefault();

        // Get the closest product item and retrieve the product ID
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        
        // Find the corresponding product in the data
        const product = data.products.find(p => p.id == productId);

        // Add or remove from favorites
        addToFavorites(product, event.target.closest('.btn-wishlist'));
      }else if(event.target.closest('.tab-image')){
        event.preventDefault();
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        window.location.href = `../pages/productDetails.html?id=${productId}`;


      }else if(event.target.closest('.cart_count')){
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        const product = data.products.find(p => p.id == productId);
        addToCartDetails(product, event.target.closest('.cart_count'));

      }else if(event.target.closest('.btn_cart_count')){
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        const product = data.products.find(p => p.id == productId);
        addToCartDetails(product, event.target.closest('.cart_count'));

      }
    });
  
  })
  .catch(error => console.error(error));

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
  
  const urlParams2 = new URLSearchParams(window.location.search);
  const productId = urlParams2.get('id');  // Get the product ID from the URL
  
  fetch('../pages/dataPro.json')
    .then(response => response.json())
    .then(data => {
      const products_2 = data.products;
      const product = products_2.find(p => p.id == productId);  // Find the product by ID
  
      if (product) {
        // Inject product details using innerHTML on the product.html page
        
        document.getElementById('productCategory').innerText = "Category : "+ product.category;
        document.getElementById('product-details-container').innerHTML = `
        <div class="card mb-3 border-0">
          <div class="d-flex p-4">
            <div id="prodImgDet" class="rounded shadow" style="background:url('${product.image_url}') no-repeat;background-position: right bottom">
            </div>
            <div>
              <div class=" col-12 card-body  ms-5">
                <h1 class="card-title">${product.name}</h1>
                <h3 class="p-3 card-text"><p>Price: $${product.price.toFixed(2)}</p></h3>
                <div class="pt-5 align-items-center justify-content-between">
                  <div class="input-group product-qty">
                      <span class="input-group-btn">
                          <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                            <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                          </button>
                      </span>
                      <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1">
                      <span class="input-group-btn">
                          <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                              <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                          </button>
                      </span>
                  </div>
                  <div class="d-flex justify-content-around align-content-center pt-4">
                  <a href="#" class="nav-link pt-3">Add to Cart <iconify-icon icon="uil:shopping-cart"></a>
                  <a id="fav-btn-${product.id}" href="#" class="pt-3 btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
        ;
        document.getElementById("prodImgDet").style.width="500px";
        // document.getElementById("prodImgDet").style.hight="200px" ;
        document.getElementById(`prodImgDet`).style.backgroundSize = "cover";
        document.getElementById(`prodImgDet`).style.backgroundPosition = "center center";
        const favButton = document.getElementById(`fav-btn-${value.id}`);     
        favButton.addEventListener('click', (event) => {
            event.preventDefault();
            // favButton.style.backgroundColor ="orange";
            // addToFavorites(value ,favButton);
            
          });  
      }
    })
    .catch(error => console.error('Error fetching product data:', error));

    function addToFavorites(product, favButton) {
      const favoritesCounter = document.getElementById('favorites-counter');
    
      // Check if the product is already in favorites
      const existingIndexFavorit = favorites.findIndex(fav => fav.id === product.id);
    
      if (existingIndexFavorit === -1) {
        // Product is not in favorites, add it
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        favButton.classList.add("text-white");
        favButton.style.backgroundColor = 'red'; // Set background color to orange when added
      } else {
        // Product is already in favorites, remove it
        favorites.splice(existingIndexFavorit, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        favButton.style.backgroundColor = ''; // Set background color back to white when removed
        favButton.classList.remove("text-white");
      }
    
      // Update the favorites counter
      favoritesCounter.textContent = favorites.length;
}
      
function addToCartDetails(product) {
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



function addToCartTextDetails(product) {
  const existingIndexCart = cartList.findIndex((fav) => fav.id === product.id);
  const cardAddBtn = document.getElementById(`cart_${product.id}`);
  if (existingIndexCart >= 0) {
    cardAddBtn.innerText = "Remove from Cart";
  } else {
    cardAddBtn.innerText = "Add to Cart";
  }
}
// document.addEventListener('DOMContentLoaded', function() {
  
//   const form = document.getElementById('contactForm');
//   form.addEventListener('submit', function(e) {
//     e.preventDefault(); 
  
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const comments = document.getElementById('floatingTextarea2').value;

//     const userData = {
//       name: name,
//       email: email,
//       comments: comments
//     };

//     let contactUsArray = JSON.parse(localStorage.getItem('contactUs')) || [];
//     contactUsArray.push(userData);
//     localStorage.setItem('contactUs', JSON.stringify(contactUsArray));
//     alert('Your data has been saved in local storage!');
//     form.reset();
//   });
// });



