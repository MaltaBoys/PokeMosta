import { Flowbite } from "flowbite-react";
import { Menus, Home, Tcg, Pokedex, Pokemon } from "./hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * To learn more about Playwright Test visit:
 * https://www.checklyhq.com/docs/browser-checks/playwright-test/
 * https://playwright.dev/docs/writing-tests
 */
const { expect, test } = require("@playwright/test");

test("visit page and take screenshot", async ({ page }) => {
  // If available, we set the target URL to a preview deployment URL provided by the ENVIRONMENT_URL created by Vercel.
  // Otherwise, we use the Production URL.
  const targetUrl =
    process.env.ENVIRONMENT_URL || "https://pokemosta.vercel.app";

  // We visit the page. This waits for the "load" event by default.
  const response = await page.goto(targetUrl);

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);

  // Take a screenshot
  await page.screenshot({ path: "screenshot.jpg" });
});

function App() {
  return (
    <Flowbite>
      <header>
        <Menus />
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/tcg" element={<Tcg />} />
            <Route path="/pokemon" elemen={<Pokemon />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Flowbite>
  );
}

export default App;
