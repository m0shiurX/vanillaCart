// dom
let products_element = document.querySelector('#products_element');
let loader_element = document.querySelector('#loader');


getProducts('https://fakestoreapi.com/products');




// Category
let categories = document.querySelectorAll('.category');

categories.forEach(category => {
    let cat = category.getAttribute('data-id');
    
    category.addEventListener('click', e => {
        e.preventDefault();
        let cat_url = 'https://fakestoreapi.com/products/category/' + cat;
        getProducts(cat_url);
    });

});


function getProducts(url) {
    loader_element.style.display = "block";
    products_element.innerHTML = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                data.forEach(product => {
                    let product_card = `
                        <div class="col-4">
                            <div class=" col-12 card p-0 mb-3 shadow-sm border-0">
                                <div class="row no-gutters">
                                <div class="col-4 product_img">
                                    <img src="${product.image}" class="card-img" alt="...">
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                    <p class="product-price"> ${product.price} $</p>
                                    <h5 class="product-title">${product.title}</h5>
                                    <p class="product-text"> ${product.description.slice(0,80)}</p>
                                    <p class="product-btn"> <a href="#" class="btn rounded-pill px-3 text-white"> Add to cart</a> </p>
            
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        `;
                    products_element.innerHTML += product_card;
                });
            }
            loader_element.style.display = "none";
        });
}