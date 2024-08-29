import { test, expect } from "@playwright/test";
import { Navigation } from "../page-object/Navigation";
import { ProductPage } from "../page-object/Product";
import { isDesktopViewport } from "../page-object/helpers";

test("Navigation bar has correct layout", async ({ page }) => {
  const navigation = new Navigation(page);
  const productPage = new ProductPage(page);
  await productPage.visit();

  await expect(
    isDesktopViewport(page) ? navigation.navigationBarDesktop : navigation.navigationBarMobile
  ).toHaveScreenshot();
});
