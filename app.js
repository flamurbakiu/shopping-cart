/* app.js */
let productsList = document.querySelector('.products');
let cartItems = document.querySelector('.cart-items');
let subtotal = document.querySelector('.subtotal');
let totalItemsInCart = document.querySelector('.total-items-in-cart');

let cart = [];

function renderProducts() {
    products.forEach((product) => {
        productsList.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src='${product.imgSrc}' alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-cart" onclick="addProductToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
    })
}

function addProductToCart(productId) {
    const selectedProduct = products.find((product) => product.id === productId);
    const findedProductInCart = cart.find((item) => item.id === productId);
    const isProductInCart = !!findedProductInCart;

    if (isProductInCart) {
        findedProductInCart.units++;
    } else {
        cart.push({ 
            ...selectedProduct,
            units: 1
         });
    }


    renderCartItems();
}

function renderCartItems() {
    cartItems.innerHTML = '';

    cart.forEach((item) => {
        cartItems.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick='updateUnit("substract", ${item.id})'>-</div>
                <div class="number">${item.units}</div>
                <div class="btn plus" onclick='updateUnit("add", ${item.id})'>+</div>           
            </div>
        </div>
    `;
    });

    calculateSubTotal();
}

function updateUnit(action, itemId) {
    const foundedItem = cart.find((item) => item.id === itemId);

    if (action === 'add' && foundedItem.units < foundedItem.instock) {
        foundedItem.units++;
    } else if (action === 'substract' && foundedItem.units >= 2) {
        foundedItem.units--;
    }

    renderCartItems();
}

function calculateSubTotal() {
    let sum = 0;
    let countItems = 0;

    for (let i = 0; i < cart.length; i++) {
        sum += (cart[i].units * cart[i].price);
        countItems += cart[i].units * 1;
    }
    subtotal.innerHTML = `Subtotal (${countItems} items): $${sum.toFixed(2)}`;
    totalItemsInCart.innerHTML = countItems;
}

renderProducts();