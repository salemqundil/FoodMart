var productsData
// تحميل ملف JSON الخارجي
fetch('../pages/dataPro.json')
    .then(response => response.json())
    .then(jsonData => {
        productsData = jsonData.products; // تخزين البيانات في المتغير
    })
    .catch(error => console.error('Error loading JSON:', error))
// دالة البحث
function searchData() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // تنظيف النتائج السابق
    productsData.forEach(product => {
        // فحص الاسم أو الفئة
        if (product.name.toLowerCase().includes(input) || product.category.toLowerCase().includes(input)) {
            resultsDiv.innerHTML += `  <a href="../pages/productDetails.html?id=${product.id}" title="Product Title" class="text-decoration-none">
                                <div  class="card mb-3 shadow border-0">
      <div  class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>                
              <img id="cardImg_${product.id}"
                src="${product.image_url}"
                class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
            </div>
            <div class="ms-3">
              <h5>${product.name}</h5>
              <p class="small mb-0">${product.category}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 50px;">
              <h5 class="fw-normal mb-0">1</h5>
            </div>
            <div style="width: 80px;">
              <h5 class="mb-0">${product.price} JD</h5>
            </div>
            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>
      </div>
    </div>
</a>
                `;
        }
    })
    // في حالة عدم وجود نتائج
    if (!resultsDiv.innerHTML) {
        resultsDiv.innerHTML = `<p>No results found</p>`;
    }
}
