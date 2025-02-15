import test, { expect } from "@playwright/test";

test("alert box", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo"
  );

  const myName = "Lalo";

  page.on("dialog", async (alert) => {
    console.log(alert.message());
    console.log(alert.defaultValue());
    await alert.accept(myName);
  });

  await page.locator("button:has-text('Click Me')").nth(0).click();
  await page.locator("button:has-text('Click Me')").nth(1).click();
  expect(page.locator("//p[@id='confirm-demo']")).toContainText("OK");

  await page.locator("button:has-text('Click Me')").nth(2).click();
  expect(page.locator("//p[@id='prompt-demo']")).toContainText(myName);
});

test("modal", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo"
  );

  await page.locator("//button[@data-target='#myModal']").click();

  await page
    .locator(
      "//div[@id='myModal']//button[@type='button'][normalize-space()='Save Changes']"
    )
    .click();

  await page.locator("//button[@data-target='#myMultiModal']").click();

  await page.locator("button[data-target='#mySecondModal']").click();

  await page
    .locator(
      "//div[@id='mySecondModal']//button[@type='button'][normalize-space()='Save Changes']"
    )
    .click();

  await page
    .locator(
      "//div[@id='myMultiModal']//button[@type='button'][normalize-space()='Save Changes']"
    )
    .click();
});
