import { test, expect } from '@playwright/test';
let email = Math.random().toString(36).substring(2) + "@mail.com";
let password = "SecretPassword";

test("Should access front-end page", async ({ page }) => {
  await page.goto("http://localhost:4321");
  await expect(page).toHaveTitle("Welcome to Memories 📚");
});

test("Should identify the register button in the menu and click on it to access the register page", async ({ page }) => {
  await page.goto("http://localhost:4321");
  await page.click("text=Register");
  await expect(page).toHaveTitle("Register");
});

test("Should access the registration form and register a new user", async ({ page }) => {
  await page.goto("http://localhost:4321/register");
  await page.fill("input[name='firstname']", "foo");
  await page.fill("input[name='lastname']", "bar");
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("text=Create account");
  await expect(page).toHaveTitle("Sign in");
});

test("Should access the login form and login with the user created", async ({ page }) => {
  await page.goto("http://localhost:4321/login");
  await page.fill("input[name='email']", email);
  await page.fill("input[name='password']", password);
  await page.click("text=Sign in");
});