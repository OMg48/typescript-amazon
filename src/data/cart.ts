import { getElement } from '../scripts/utils/dom-utils';
import { CartProduct } from '../types';

let cart: CartProduct[] = loadCartFromStorage();

function handleAddToCart(productId: string): void {
  const quantitySelector = getElement<HTMLSelectElement>(
    `.js-quantity-selector-${productId}`
  );
  const quantity: number = Number(quantitySelector.value);

  // Find matching item, or add if it doesnt exist
  addQuantity(productId, quantity);
}

function addQuantity(productId: string, quantity: number): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveCartToStorage();
}

function updateQuantity(productId: string, newQuantity: number): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  } else {
    cart.push({
      productId,
      quantity: newQuantity,
      deliveryOptionId: '1'
    });
  }

  saveCartToStorage();
}

function removeFromCart(productId: string): void {
  const newCart: CartProduct[] = cart.filter((cartItem) => cartItem.productId !== productId);

  cart = newCart;

  saveCartToStorage();
}

function calculateCartQuantity(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCartToStorage(): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage(): CartProduct[] {
  let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) {
    cart =
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
  }
  return cart;
}

function updateDeliveryOption(productId: string, deliveryOptionId: string): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (!matchingItem) {
    console.error(`No Cart Product found with productID: ${productId}`);
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCartToStorage();
}

export { calculateCartQuantity, cart, handleAddToCart, removeFromCart, updateDeliveryOption, updateQuantity };

