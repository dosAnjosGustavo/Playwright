import test, { expect } from "@playwright/test";

test("demo", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/select-dropdown-demo"
  );

  const dayWeek = "Monday";

  await page.selectOption("//select[@id='select-demo']", dayWeek);

  // get the selected value
  const selectedValue = await page
    .locator("//select[@id='select-demo']")
    .inputValue();

  expect(selectedValue).toBe(dayWeek);

  await page.selectOption("//select[@id='multi-select']", [
    {
      index: 1,
    },
    {
      label: "Washington",
    },
    { index: 3 },
  ]);
});

async function selectCountry(countryName: string, page) {
  await page.click("#country+span");
  await page
    .locator("ul#select2-country-results")
    .locator("li", {
      hasText: countryName,
    })
    .click();
}

test("jquery search", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo"
  );

  await selectCountry("United States", page);
  await selectCountry("India", page);
  await selectCountry("Japan", page);

  await page.waitForTimeout(3000);
});
