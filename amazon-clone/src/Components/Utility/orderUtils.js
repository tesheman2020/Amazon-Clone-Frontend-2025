export const groupItems = (basket = []) => {
  return basket.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };
    } else {
      acc[item.id].quantity += 1;
      acc[item.id].totalPrice += item.price;
    }
    return acc;
  }, {});
};

export const getOrderTotal = (basket = []) =>
  basket.reduce((sum, item) => sum + item.price, 0);
