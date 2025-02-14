import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  await page.hover(
    "//a[@data-toggle='dropdown']//span[contains(.,'My account')]"
  );

  await page.getByRole("link", { name: "Login" }).click();

  expect(page).toHaveURL(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );

  await page.getByRole("textbox", { name: "E-Mail Address" }).click();
  await page
    .getByRole("textbox", { name: "E-Mail Address" })
    .fill("lalodosanjos@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Iamking@");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/account"
  );

  await page.getByRole("link", { name: " Edit your account" }).click();
  await page.getByRole("textbox", { name: "First Name *" }).click();
  await page.getByRole("textbox", { name: "First Name *" }).fill("Lalo");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.hover(
    "//a[@data-toggle='dropdown']//span[contains(.,'My account')]"
  );

  await page.getByRole("link", { name: "Logout", exact: true }).click();

  await expect(page).toHaveURL(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/logout"
  );
});
