// document.getElementById('fav_row').innerHTML=``;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// document.getElementById('favoritesCount').innerHTML=`You have ${favorites.length} items in your cart`;
if(favorites.length>0){
favorites.forEach(value => {
  if(value.id){
    document.getElementById('fav_row').innerHTML += `
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
    const imgElement = document.getElementById(`cardImg_${value.id}`);
    imgElement.style.width = "260px";
    imgElement.style.height = "188px";
    imgElement.style.objectFit = "fill";
    imgElement.classList.add("rounded-3")}else{
      document.getElementById('fav_row').innerHTML += `
    <div class="product-item swiper-slide">
            <a id="fav-btn-${value.ID}" href="#" class=" btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>
        <div style="">
          <a href="../pages/productDetails.html?id=${value.ID}" title="Product Title">
            <img id="cardImg_${value.ID}" class="rounded-2" style="height=130px; width=100%;" src="${value.DishImage}">
          </a>
        </div>
        <h3>${value.mainName}</h3>
        <span class="qty">1 Unit</span><span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>
        <span class="price">${value.Price}</span>
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
    const imgElement = document.getElementById(`cardImg_${value.ID}`);
    imgElement.style.width = "260px";
    imgElement.style.height = "188px";
    imgElement.style.objectFit = "fill";
    imgElement.classList.add("rounded-3")
    }
});}

