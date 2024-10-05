const urlParams2 = new URLSearchParams(window.location.search);
const productId = urlParams2.get('id');  // Get the product ID from the URL



fetch('../pages/packag.json')
    .then(response => response.json())
    .then(data => {
      const products_2 = data.packages;
      const product = products_2.find(p => p.ID == productId);  // Find the product by ID
  
      if (product) {
        // Inject product details using innerHTML on the product.html page
        
        document.getElementById('productCategory').innerText = "Category : "+ product.category;
        document.getElementById('product-details-container').innerHTML = `
        <div class="card mb-3 border-0">
          <div class="d-flex p-4">
            <div id="prodImgDet" class="rounded shadow"  no-repeat;background-position: right bottom">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${product.DishImage}" class="d-block w-100" style="hight = 200px" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${product.Ingredients[0].image}" class="d-block w-100" style="hight = 200px" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${product.Ingredients[1].image}" class="d-block w-100" style="hight = 200px" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${product.Ingredients[2].image}" class="d-block w-100" style="hight = 200px" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${product.Ingredients[3].image}" class="d-block w-100" style="hight = 200px" alt="...">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div>
            <div>
              <div class=" col-12 card-body  ms-5">
                <h1 class="card-title">${product.mainName}</h1>
                <h3>${product.Ingredients[0].name}</h3>
                <h3>${product.Ingredients[1].name}</h3>
                <h3>${product.Ingredients[2].name}</h3>
                <h3>${product.Ingredients[3].name}</h3>
                <h3 class="pt-5 pb-3 card-text"><p>Price: $${product.Price.toFixed(2)}</p></h3>
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
                  <a id="fav-btn-${product.ID}" href="#" class="pt-3 btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
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
        // const favButton = document.getElementById(`fav-btn-${value.id}`);     
        // favButton.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     // favButton.style.backgroundColor ="orange";
        //     // addToFavorites(value ,favButton);
            
        //   });  
      }
    })
    .catch(error => console.error('Error fetching product data:', error));
