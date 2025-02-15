import test, { expect } from "@playwright/test";

test("basic interactions", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/simple-form-demo"
  );
  const message = "Test message";

  const messageInput = page.locator("//input[@id='user-message']");

  expect(messageInput).toHaveAttribute(
    "placeholder",
    "Please enter your Message"
  );

  await messageInput.fill(message);

  expect(await messageInput.inputValue()).toBe(message);

  await page.locator("//button[@id='showInput']").click();

  const myMessageText = await page.locator("//p[@id='message']").textContent();
  const myMessage = await page.locator("//p[@id='message']").textContent();

  expect(myMessageText).toBe(message);

  expect(myMessage);
});
