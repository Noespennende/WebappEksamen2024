import {
  test,
  expect,
  type Page,
  type Locator,
  type BrowserContext,
} from "@playwright/test";

let page: Page;
let context: BrowserContext;

test.describe("Oppgave 1 Create", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/courses/create");
  });
  test.describe("When showing create page", () => {
    test("Should have test-id steps", async () => {
      const steps = await page.locator('[data-testid="steps"]');
      await expect(steps).toBeVisible();
    });
    test("Should have test-id form_submit", async () => {
      
      const formSubmitButton = await page.locator('[data-testid="form_submit"]');
      await expect(formSubmitButton).toBeVisible();

    });
    test("Should have test-id title", async () => {
     
      const title = await page.locator('[data-testid="title"]');
      await expect(title).toBeVisible();

    });
    test("Should have test-id form", async () => {

      const form = await page.locator('[data-testid="form"]');
      await expect(form).toBeVisible();
      
    });
    
    test("Should have test-id course_step", async () => {
      const courseStep = await page.locator('[data-testid="course_step"]');
      await expect(courseStep).toBeVisible();

    });

    test("Should have test-id form_title", async () => {
      const formTitle = await page.locator('[data-testid="form_title"]');
      await expect(formTitle).toBeVisible();

    });

    test("Should have test-id form_slug", async () => {
      const formSlug = await page.locator('[data-testid="form_slug"]');
      await expect(formSlug).toBeVisible();

    });

    test("Should have test-id form_description", async () => {
      
      const formDescription = await page.locator('[data-testid="form_description"]');
      await expect(formDescription).toBeVisible();

    });
    
    test("Should have test-id form_category", async () => {

      const formCategory = await page.locator('[data-testid="form_category"]');
      await expect(formCategory).toBeVisible();
      
    });

  });
  test.describe("When stepping from first to second step", () => {
    test.beforeEach(async () => {
      // Nullstiller felt før hver test
      await page.fill('[data-testid="form_slug"]', '');
      await page.fill('[data-testid="form_title"]', '');
      await page.fill('[data-testid="form_description"]', '');
      await page.selectOption('[data-testid="form_category"]', { value: '' });
      
    });

    test("Should show error if any required field are missing", async () => {

    const stepButton = page.locator('button[data-testid="step"]:text("Leksjoner")');
    await stepButton.click();

    const errorMessage = page.locator('[data-testid="form_error"]');
    await errorMessage.waitFor({ state: 'visible' });

    await expect(errorMessage).toBeVisible();
          
    });

    test("Should show error if title field is missing", async () => {
      
      // Fyller alle utenom form_title
      await page.fill('[data-testid="form_slug"]', 'test-kurs');
      await page.fill('[data-testid="form_description"]', 'Beskrivelse');
      await page.selectOption('[data-testid="form_category"]', { label: 'Marketing' });

      const stepButton = await page.locator('button[data-testid="step"]:text("Leksjoner")');
      await stepButton.click();

      const errorMessage = await page.locator('[data-testid="form_error"]');
      await errorMessage.waitFor({ state: 'visible' });

      await expect(errorMessage).toBeVisible();

    });

    test("Should show error if slug field is missing", async () => {

      // Fyller alle utenom form_slug
      await page.fill('[data-testid="form_title"]', 'Kurs tittel');
      await page.fill('[data-testid="form_description"]', 'Beskrivelse');
      await page.selectOption('[data-testid="form_category"]', { label: 'Marketing' });

      const stepButton = await page.locator('button[data-testid="step"]:text("Leksjoner")');
      await stepButton.click();

      const errorMessage = await page.locator('[data-testid="form_error"]');
      await errorMessage.waitFor({ state: 'visible' });

      await expect(errorMessage).toBeVisible();


    });

    test("Should show error if description field is missing", async () => {

      // Fyller alle utenom form_description
      await page.fill('[data-testid="form_title"]', 'Kurs tittel');
      await page.fill('[data-testid="form_slug"]', 'test-slug');
      await page.selectOption('[data-testid="form_category"]', { label: 'Photoshop' });

      const stepButton = await page.locator('button[data-testid="step"]:text("Leksjoner")');
      await stepButton.click();

      const errorMessage = await page.locator('[data-testid="form_error"]');
      await errorMessage.waitFor({ state: 'visible' });

      await expect(errorMessage).toBeVisible();

    });

    test("Should show error if category field is missing", async () => {
      
      // Fyller alle utenom form_category
      await page.fill('[data-testid="form_title"]', 'Tittel');
      await page.fill('[data-testid="form_slug"]', 'test-slug');
      await page.fill('[data-testid="form_description"]', 'Beskrivelse');
    
      // Klikk på "Leksjoner" knappen
      const stepButton = page.locator('button[data-testid="step"]:text("Leksjoner")');
      await stepButton.click();
      
      // Vent på at feilmeldingen blir synlig
      const errorMessage = page.locator('[data-testid="form_error"]');
      await expect(errorMessage).toBeVisible();
      
      // Bekreft feilmeldingens tekst
      await expect(errorMessage).toHaveText("Fyll ut alle felter med *");
    });
    
    test("Should not show error if all fields are provided", async () => {

      // Fyller alle
      await page.fill('[data-testid="form_title"]', 'Tittel');
      await page.fill('[data-testid="form_slug"]', 'test-slug');
      await page.fill('[data-testid="form_description"]', 'Beskrivelse');
      await page.selectOption('[data-testid="form_category"]', { label: 'Photoshop' });
      
      // Klikk på "Leksjoner" knappen
      const stepButton = page.locator('button[data-testid="step"]:text("Leksjoner")');
      await stepButton.click();
      
      // Vent på at feilmeldingen blir synlig
      const errorMessage = page.locator('[data-testid="form_error"]');
      await expect(errorMessage).not.toBeVisible();
    });

  });
  test.describe("When at step two", () => {
    test.beforeEach(async () => { 
    
     })
   
    test("Should have disabled submit btn", async () => {

      // Fyll ut feltene

      await page.screenshot({ path: 'test-results/disabledSubmitBtn.png' });

      
      const submitButton = page.locator('[data-testid="form_submit"]');
      await expect(submitButton).toBeDisabled();
    });
/*
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
  });
  test.describe("When added new lesson", () => {
    test("Should have disabled submit btn", async () => {});
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
    test("Should have test-id form_lesson_add_text", async () => {});
    test("Should have test-id form_lesson_title", async () => {});
    test("Should have test-id form_lesson_slug", async () => {});
    test("Should have test-id form_lesson_preAmble", async () => {});
    test("Should have one lesson", async () => {});
  });
  test.describe("When creating multiple lessons", () => {
    test("Should have disabled submit btn if title is missing", async () => {});
    test("Should have disabled submit btn if preAmble is missing", async () => {});
    test("Should have disabled submit btn if slug is missing", async () => {});
    test("Should have disabled submit btn if text is missing", async () => {});
    test("Should have disabled submit btn if all fields are added on last lesson", async () => {});
    test("Should have enabled submit btn if all fields are added on all lesson", async () => {});
    test("Should disable publish button if new lesson is added", async () => {});
  });
  test.describe("When creating multiple lessons with multiple textboxes", () => {
    test("Should have enabled publish button if all text fields are valid", async () => {});
  });
  test.describe("When created new course", () => {
    test("Should have show success when submitted", async () => {});
    test("Should show preview of content when submitted", async () => {});
    test("Should get response 200 from server", async () => {});
    test("Should get correct data from server", async () => {});
    */
  });
});
