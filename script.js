// to reterive all the cart items
document.addEventListener("DOMContentLoaded", () => {
  // accessing all the add to cart elements
  let addtocartBtn = document.querySelectorAll(".add-to-cart-btn");
  console.log(addtocartBtn);
  addtocartBtn.forEach((e) => {
    console.log(e);
    console.log(e.target);
    e.addEventListener("click", () => {
      let ProductInfo = e.parentNode.parentNode;
      console.log(ProductInfo);
      let ProductName = ProductInfo.querySelector(".product-title").innerText;
      let ProductPrice = ProductInfo.querySelector(".product-price").innerText;
      let ProductImg = ProductInfo.querySelector(".product-img").src;
      console.log(ProductName);
      console.log(ProductPrice);
      console.log(ProductImg);
      let SelectedItems = {
        name: ProductName,
        price: ProductPrice,
        imgUrl: ProductImg,
        // quantity:quantity:1
      };
      //passing the selected as parameter to addtocart fun to push it into empty
      AddToCart(SelectedItems);
    });
  });
});
//empty array to store the selected cart items
const CartItems = [];
console.log(CartItems);
// fun to add items to cart
function AddToCart(products) {
  // console.log(products)
  let existingItems = CartItems.find((items) => items.name === products.name);
  if (existingItems) {
    existingItems.quantity++;
  } else {
    CartItems.push({ ...products, quantity: 1 });
  }
  //to update the cart page
  UpdateCartUI();
  localStorage.setItem("cartItem", JSON.stringify(CartItems));
}

//fun to update the cart UI
function UpdateCartUI() {
  let CartItem = document.querySelector(".cart_items"); // ul elements
  CartItem.innerHTML = "";
  // console.log(CartItem)
  // printing  added array elements in the cart
  CartItems.forEach((item) => {
    // console.log(item) //obj data
    //step-1
    let Cartprod = document.createElement("li");
    // this section is used to print all the product details in the cart
    // along with inc/dec and remove functionality
    Cartprod.innerHTML = `
    <div class="product">
      <img src=${item.imgUrl} class="product-img"/>
      <div class="product-info">
        <h4 class="product-title">${item.name}</h4>
        <p class="product-price">${item.price}</p>
        <span>Quantity:${item.quantity}</span>
       <div class="quantitycon">
       <button class="IncreaseQuan" >+</button>
       <span class='quantity-val' >${item.quantity}</span>
     <button class="DecreaseQua" >-</button>
      </div>
  </div>
  <button class="remove-Quantity">remove</button>
    </div>`;

    //step-2
    // accessing the inc/dec and remove buttons along with quantity
    const QuantityConEle = Cartprod.querySelector(".quantitycon");
    const increaseQuaEle = QuantityConEle.querySelector(".IncreaseQuan");
    const DecreaseQuaEle = QuantityConEle.querySelector(".DecreaseQua");
    const RemoveQuantityEle = Cartprod.querySelector(".remove-Quantity");
    const QuantityValele = Cartprod.querySelector(".quantity-val");

    //step-3
    //adding functionality for inc/dec/remove buttons through addEventListeners
    // adding addEvent listeners to increase quantity
    increaseQuaEle.addEventListener("click", () => {
      HandleIncQuantity(item, QuantityValele);
    });

    //    adding addEvent listeners to decrease quantity
    DecreaseQuaEle.addEventListener("click", () => {
      HandledecreQuantity(item, QuantityValele);
    });

    //adding functionality for inc/dec/remove buttons through addEventListeners
    //   adding addEvent listeners to remove quantity
    RemoveQuantityEle.addEventListener("click", () => {
      RemoveItem(item);
    });

    //append li child to ul list
    CartItem.appendChild(Cartprod);
  });
}
//fun to increase the quantity
function HandleIncQuantity(item, QuantityValele) {
  item.quantity++;
  QuantityValele.textContent = item.quantity;

  //calling the updatecartUI() to update the quantities in the ui
  UpdateCartUI();
  UpdateCartTotal();
  UpdateCartIcon();
}

//fun to decrease the quantity
function HandledecreQuantity(item, QuantityValele) {
  if (item.quantity > 1) {
    item.quantity--;
    QuantityValele.textContent = item.quantity;
  }
  //calling the updatecartUI() to update the quantities in the ui
  UpdateCartUI();
  UpdateCartTotal();
  UpdateCartIcon();
}
// fun to remove single item
function RemoveItem(item) {
  const index = CartItems.findIndex((product) => product.name === item.name);
  if (index !== -1) {
    if (CartItems[index].quantity > 1) {
      CartItems[index].quantity--;
    } else {
      CartItems.splice(index, 1);
    }
  }
  //calling the updatecartUI() to update the quantities in the ui
  UpdateCartUI();
  UpdateCartTotal();
  UpdateCartIcon();
}

//fun to update cart total
function UpdateCartTotal() {
  const cartTotalcontEle = document.querySelector("#cart-total");
  const cartTotal = CartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartTotalcontEle.textContent = cartTotal;
}
// fun to increase  cart icon value
function UpdateCartIcon() {
  const cartIconTotal = document.querySelector("#cart-icon");
  const cartIconVal = CartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartIconTotal.textContent = cartIconVal;
}
// fun to remove all items in the cart
function Removeall() {
  CartItems.splice(0);
  localStorage.clear();
  UpdateCartUI();
}
//fun to load all the cartitems  into the ui
function LoadCartUi() {
  const StoredItems = localStorage.getItem("cartItem");
  if (StoredItems) {
    CartItems.push(...JSON.parse(StoredItems));
    UpdateCartIcon();
    UpdateCartTotal();
    UpdateCartUI();
    Removeall();
  }
}
// to load when browser is opened
LoadCartUi();
