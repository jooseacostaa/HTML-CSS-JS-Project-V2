document.addEventListener('DOMContentLoaded', function () {
  loadProducts();
});

function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productListUl = document.getElementById('product-list-ul');

  productListUl.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.description} - $${product.price}`;
    productListUl.appendChild(li);
  });
}

document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productPrice = document.getElementById('product-price').value;

  if (!productName || !productDescription || !productPrice) {
    if (!productName) {
      document.getElementById('product-name-error').style.visibility = 'visible';
    }
    if (!productDescription) {
      document.getElementById('product-description-error').style.visibility = 'visible';
    }
    if (!productPrice) {
      document.getElementById('product-price-error').style.visibility = 'visible';
    }
    return;
  }

  const newProduct = {
    name: productName,
    description: productDescription,
    price: parseFloat(productPrice),
  };

  const products = JSON.parse(localStorage.getItem('products')) || [];

  products.push(newProduct);

  localStorage.setItem('products', JSON.stringify(products));

  document.getElementById('product-form').reset();

  document.querySelectorAll('.error-message').forEach(error => {
    error.style.visibility = 'hidden';
  });

  loadProducts();
});
