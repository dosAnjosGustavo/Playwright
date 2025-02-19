import test, { expect, Page } from "@playwright/test";

test("demo", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/nested-frames/"
  );

  const frames = page.frames();
  console.log(frames.length);
});

test("nested", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/iframe-demo/"
  );

  const frames = page.frames();
  console.log(frames.length);

  const frameEditor = page.frame({
    url: "https://www.lambdatest.com/selenium-playground/iframe-demo/contant",
  });

  const frameEditorContent = frameEditor?.locator(".rsw-ce");

  expect(await frameEditorContent?.textContent()).toBe("Your content.");

  const newContent = "My name is Lalo";

  await frameEditorContent?.fill(newContent);
  expect(await frameEditorContent?.textContent()).toBe(newContent);

  const frameWebpage = page.frame({
    url: "https://www.lambdatest.com/support/docs/",
  });

  expect(
    await frameWebpage?.locator(".Doc_intro_cta_text h1").textContent()
  ).toBe("LambdaTest Documentation and Knowledge Hub");

  await frameWebpage?.locator("a:has-text('Get Started')").click();

  const insideFrames = frameWebpage?.childFrames();
  insideFrames?.forEach((frame) => {
    console.log(frame.url());
  });
});

let facebookPage: Page;
test("multiple tabs", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/window-popup-modal-demo"
  );

  const [multiPages, _clickFollowAll] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("#followall"),
  ]);

  await multiPages.waitForLoadState();
  const pages = multiPages.context().pages();

  pages.forEach((page, i) => {
    if (page.url().includes("facebook")) {
      facebookPage = page;
    }
  });

  await facebookPage.click("//div[@aria-label='Close']");
  const title = await facebookPage.textContent("//h1");

  expect(title?.trim()).toContain("LambdaTest");
});
