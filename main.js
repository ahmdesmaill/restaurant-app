import { menuItems, orderData } from "./data";

const menu = document.getElementById("menu");
const order = document.getElementById("order");
const orderItems = document.getElementById("order-items");
const priceEl = document.getElementById("total-price");
const dialog = document.getElementById("payment-dialog");
const confirmation = document.getElementById("confirmation");

document.addEventListener("click", (e) => {
  const { target } = e;
  const dataset = target.dataset;

  if (dataset.addItem) {
    addItem(dataset.addItem);
  } else if (dataset.removeItem) {
    removeItem(dataset.removeItem);
  } else if (target.id === "order-btn") {
    showDialog();
  } else if (target.id === "close-dialog") {
    closeDialog();
  }
});
document.addEventListener("submit", (e) => {
  e.preventDefault();
  order.style.display = "none";
  confirmation.style.display = "block";
  dialog.close();
  console.log(orderData); // A sign of order completion
});

function closeDialog() {
  dialog.close();
}

function showDialog() {
  dialog.showModal();
}

function addItem(itemKey) {
  orderData[itemKey]++;
  renderOrder();
}
function removeItem(itemKey) {
  orderData[itemKey]--;
  renderOrder();
}

function renderOrder() {
  let htmlString = "";
  let totalPrice = 0;
  for (const [itemKey, count] of Object.entries(orderData)) {
    const item = menuItems[itemKey];
    if (count === 0) continue;
    if (count === 1) {
      htmlString += `<div class="order-item">
          <h3>${item.name}</h3>
          <button type="button" data-remove-item="${itemKey}">
              remove
          </button>
          <h4>$${item.price}</h4>
      </div>`;
      totalPrice += item.price;
    } else {
      // More than one
      htmlString += `<div class="order-item">
          <h3>${item.name} (${count})</h3>
          <button type="button" data-remove-item="${itemKey}">
              remove
          </button>
          <h4>$${item.price * count}</h4>
      </div>`;
      totalPrice += item.price * count;
    }
  }
  if (htmlString === "") {
    order.style.display = "none";
  } else {
    order.style.display = "block";
  }
  orderItems.innerHTML = htmlString;
  priceEl.textContent = `$${totalPrice}`;
}

function renderMenu() {
  let htmlString = "";
  for (const [itemKey, item] of Object.entries(menuItems)) {
    htmlString += `<div class="menu-item">
        <p>${item.emoji}</p>
        <div>
            <h2>${item.name}</h2>
            <h3>${item.ingredients.join(",")}</h3>
            <h4>$${item.price}</h4>
        </div>
        <button type="button" data-add-item="${itemKey}">+</button>
    </div>`;
  }
  menu.innerHTML = htmlString;
}

document.getElementById("order-again").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});

renderMenu();
