const express = require('express');
let cors = require("cors")

const app = express();
app.use(cors())
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  if (isMember) {
    let discount = (10 * 3600) / 100;
    let priceAfterDiscount = cartTotal - discount;
    res.send(priceAfterDiscount.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let priceAfterTax = (5 * 3600) / 100;
  res.send(priceAfterTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryEstimation;
  if (shippingMethod === 'express') {
    deliveryEstimation = distance / 100;
  } else if (shippingMethod === 'standard') {
    deliveryEstimation = distance / 50;
  }
  res.send(deliveryEstimation.toString());
});

app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  let shippingCost = distance * weight * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loayaltyPoints = purchaseAmount * 2
  res.send(loayaltyPoints.toString())
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
