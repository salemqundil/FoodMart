

fetch('../pages/packag.json')
  .then(response => response.json())
  .then(data => {
    const products = data.packages;  // Access the products array
    const favoritesList = document.getElementById('fav-list');  // Favorites list element

    products.forEach((product) => {
        document.getElementById('packag').innerHTML += `
          <div class="product-item swiper-slide" data-product-id="${product.ID}">
              <a href="#" id="fav-btn-${product.ID}" class="btn-wishlist">
                 <svg width="24" height="24">
                     <use xlink:href="#heart"></use>
                 </svg>
              </a>
              <figure>
              <a href="" title="Product Title">
                <img id="product-img-${product.ID}" src="${product.DishImage}" class="tab-image">
              </a>
            </figure>
              <h3 id="product-name-${product.ID}">${product.mainName}</h3>
              <span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>
              <span class="price">${product.Price} JD</span>
              <div class="d-flex align-items-center justify-content-between">
              <div class="input-group product-qty">
                <span class="input-group-btn">
                  <button id="btn_${product.ID}" onclick="minusProductQty(${product.ID})" type="button" class="btn btn-danger btn-number" data-type="minus">
                    <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                  </button>
                </span>
                <input type="text" id="quantity_${product.ID}" name="quantity"  class="form-control input-number" value="1">
                <span class="input-group-btn">
                  <button onclick="plusProductQty(${product.ID})" type="button" class="btn btn-success btn-number" data-type="plus">
                    <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                  </button>
                </span>
              </div>
              <a href="#" id="cart_${product.ID}" class="nav-link cart_count"> 
                <iconify-icon icon="uil:shopping-cart"></iconify-icon>
              </a>
            </div>
            </div>`;
            addToCartPackageTextPackag(product);

        const imgElement = document.getElementById(`product-img-${product.ID}`);
    
        const favButton = document.getElementById(`fav-btn-${product.ID}`);   
        favoriteIconPackage(product,favButton);
      
        imgElement.style.width = "186px";
        imgElement.style.height = "188px";
        imgElement.style.objectFit = "fill";
        imgElement.classList.add("rounded-3")





            
// // Navigate to the product details page with the product ID in the URL


// //-------------------------------------------------------------



      

      
      favoritesList.addEventListener('click', (event) => {
        console.log("دخلت");
          event.preventDefault();
          displayFavorites();
      
          window.location.href = '../pages/fav.html';
      
        });
      
    }
  



);


    

    // Add event listener for favorite buttons using delegation
    document.getElementById('packag').addEventListener('click', (event) => {
      // Check if the clicked element is a favorite button
      if (event.target.closest('.btn-wishlist')) {
        event.preventDefault();

        // Get the closest product item and retrieve the product ID
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        
        // Find the corresponding product in the data
        const product = products.find(p => p.ID == productId);

        // Add or remove from favorites
        addToFavoritesPackag(product, event.target.closest('.btn-wishlist'));
      }else if(event.target.closest('.tab-image')){
        event.preventDefault();
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        window.location.href = `../pages/packageDetails.html?id=${productId}`;


      }else if(event.target.closest('.cart_count')){
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        const product = products.find(p => p.ID == productId);
        addToCartPackage(product, event.target.closest('.cart_count'));

      }else if(event.target.closest('.btn_cart_count')){
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        const product = products.find(p => p.ID == productId);
        addToCartPackage(product, event.target.closest('.cart_count'));

      }
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));


  
  
// // product details page -----------------------------------------

// Get the product ID from the URL
// const urlParams_3 = new URLSearchParams(window.location.search);
// const productId_3 = urlParams_3.get('id');  // Get the product ID from the URL



function addToCartPackageTextPackag(product){
  
  const existingIndexCart = cartList.findIndex(fav => fav.ID === product.ID);
  const cardAddBtn = document.getElementById(`cart_${product.ID}`);
  if (existingIndexCart>=0) {
    cardAddBtn.innerText = "Remove";
  } else {
    cardAddBtn.innerText = "Add to Cart";

  }
}

function addToCartPackage(product) {
  const cartListCounter = document.getElementById('cart_count');
  const cardAddBtn = document.getElementById(`cart_${product.ID}`);
//   const cardBtn = document.getElementById(`btn_${product.id}`);


  // Check if the product is already in cartList
  const existingIndexCart = cartList.findIndex(fav => fav.ID === product.ID);

  if (existingIndexCart === -1) {
    // Product is not in cartList, add it
    cartList.push(product);
    localStorage.setItem('cartList', JSON.stringify(cartList));
    cardAddBtn.innerText = "Remove";
    // favButton.classList.add("text-white");
    // favButton.style.backgroundColor = 'red'; // Set background color when added
  } else {
    // Product is already in cartList, remove it
    cartList.splice(existingIndexCart, 1);
    localStorage.setItem('cartList', JSON.stringify(cartList));
    cardAddBtn.innerText = "Add to Cart";

  }
  cart();
  // Update the cartList counter
  cartListCounter.textContent = cartList.length;
}



    function addToFavoritesPackag(product, favButton) {
        const favoritesCounter = document.getElementById('favorites-counter');
      
        // Check if the product is already in favorites
        const existingIndexFavorit = favorites.findIndex(fav => fav.ID === product.ID);
      
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
      </li>`;}else if(element.ID){
        document.getElementById('cart_list').innerHTML+=`
  
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


function plusProductQty(num){
  var product_num =Number( document.getElementById(`quantity_${num}`).value);
  if(product_num<9){
    var product_sum = product_num +1;
    document.getElementById(`quantity_${num}`).value = product_sum;
  }
  
}
function minusProductQty(num){
  var product_num =Number( document.getElementById(`quantity_${num}`).value);
  if(product_num>1){
    var product_sum = product_num -1;
    document.getElementById(`quantity_${num}`).value = product_sum;
  }
 
}





function favoriteIconPackage(product, favButton){
  const existingIndexFavorit = favorites.findIndex(fav => fav.ID === product.ID);

  if (existingIndexFavorit > -1) {
    // Product is not in favorites, add it
    favButton.classList.add("text-white");
    favButton.style.backgroundColor = 'red'; // Set background color to orange when added
  } else {
    favButton.style.backgroundColor = ''; // Set background color back to white when removed
    favButton.classList.remove("text-white");
  }
}
  

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('category');  // Get the product ID from the URL
console.log(typeof(categoryId));
  fetch('../pages/packag.json')
  .then(response => response.json())
  .then(data => {
    
    
    
    data.products.forEach(value => {
        if (value.packages == categoryId) {
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
                  <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></a>
                </div>
            </div>`;
    
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
        addToCartPackage(product, event.target.closest('.cart_count'));

      }else if(event.target.closest('.btn_cart_count')){
        const productItem = event.target.closest('.product-item');
        const productId = productItem.getAttribute('data-product-id');
        const product = data.products.find(p => p.id == productId);
        addToCartPackage(product, event.target.closest('.cart_count'));

      }
    });
  
  })
  .catch(error => console.error(error));


