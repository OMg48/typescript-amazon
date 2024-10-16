import { renderCheckoutHeader } from './checkout/checkoutHeader';
import { renderOrderSummary } from './checkout/orderSummary';
import { renderPaymentSummary } from './checkout/paymentSummary';
import { loadCartFetch } from './data/cart-class';
import { loadProductsFetch } from './data/products';
// import './data/backend-practice';

async function loadPage(): Promise<void> {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch(),
    ])
  }
  catch (error) {
    console.log(error);
    console.log('Unexpected error. Please try again later.');
  }

  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
}

loadPage();

// Same as:
/*
function loadPage() {
  new Promise<void>((resolve) => {
    console.log('load page');
    resolve();
  }).then(() => {
    return loadProductsFetch();
  }).then(() => {
    return new Promise<string>((resolve) => {
      resolve('value2');
    });
  })
}
*/

/*
Promise.all([
  loadProductsFetch(),
  new Promise<void>((resolve) => {
    loadCart(() => {
      resolve();
    })
  })

]).then((values) => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise<string>((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise<void>((resolve) => {
    loadCart(() => {
      resolve();
    })
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
});
*/