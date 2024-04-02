export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF"
  }).format(price)
}
export function generateShortOrderId() {
    const now = new Date();
    const timeComponent = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

    const randomComponent = Math.random().toString(36).substring(2, 8);
    let orderId = `${timeComponent}${randomComponent}`;
    orderId = orderId.length > 30 ? orderId.substring(0, 30) : orderId;

    return orderId;
}