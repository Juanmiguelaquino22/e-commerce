document.addEventListener("DOMContentLoaded", function() {
    var cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var name = this.getAttribute('data-name');
            var price = this.getAttribute('data-price');
            var image = this.getAttribute('data-image');

            addToCart(name, price, image);
        });
    });

    function addToCart(name, price, image) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(name + " has been added to the cart!");
    }

    if (window.location.pathname.endsWith('cart.html')) {
        var cartItemsContainer = document.querySelector('.cart-items');
        var cartTotalElement = document.getElementById('cart-total');
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var total = 0;

        cart.forEach(function(item) {
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price);
        });

        cartTotalElement.textContent = total.toFixed(2);

        document.getElementById('checkout-button').addEventListener('click', function() {
            alert('Checkout - Total: $' + total.toFixed(2));
            localStorage.removeItem('cart');
            window.location.reload();
        });
    }
});
