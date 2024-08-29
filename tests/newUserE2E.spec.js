import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductPage } from "../page-object/Product";
import { Navigation } from "../page-object/Navigation";
import { CheckoutPage } from "../page-object/Checkout";
import { LoginPage } from "../page-object/Login";
import { RegisterPage } from "../page-object/Register";
import { DeliveryDetailsPage } from "../page-object/DeliveryDetails";
import { PaymentPage } from "../page-object/Payment";
import { deliveryDetails as testDataDelivery } from "../data/deliveryDetails";
import { paymentInfo as testDataPayment } from "../data/paymentInfo";

test("New user full end-to-end test", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.goToRegisterPage();

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetailsPage(page);
  await deliveryDetails.fillDetails(testDataDelivery);

  const isAddressNumHigher = await deliveryDetails.saveDetails();
  expect(isAddressNumHigher).toBe(true);
  await deliveryDetails.goToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(testDataPayment);
  await paymentPage.completePayment();
});
