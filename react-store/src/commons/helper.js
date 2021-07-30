export const formatPrice = (cents) => {
  //convert number to price
  return (cents / 100).toLocaleString("zh", {
    style: "currency",
    //price desiplayed in Canadian Dollars
    currency: "CAD",
  });
};
