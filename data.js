const menuItems = {
  pizza: {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    id: 0,
    price: 14,
    emoji: "🍕",
  },
  hamburger: {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1,
  },
  beer: {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    emoji: "🍺",
    id: 2,
  },
};

const orderData = {};
for (const key of Object.keys(menuItems)) {
  orderData[key] = 0;
}

export { menuItems, orderData };
