document.getElementById('final_items').innerHTML=``;
let cartItem = JSON.parse(localStorage.getItem('cartList')) || [];
document.getElementById('cartItemCount').innerHTML=`You have ${cartItem.length} items in your cart`;
if(cartItem.length>0){
cartItem.forEach(element => {
  document.getElementById('final_items').innerHTML+=`
    <div class="card mb-3 shadow border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
              <img
                src="${element.image_url}"
                class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
            </div>
            <div class="ms-3">
              <h5>${element.name}</h5>
              <p class="small mb-0">${element.category}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 50px;">
              <h5 class="fw-normal mb-0">1</h5>
            </div>
            <div style="width: 80px;">
              <h5 class="mb-0">${element.price} JD</h5>
            </div>
            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>
      </div>
    </div>
    `;
});}else{
document.getElementById('final_items').innerHTML=``;
}

