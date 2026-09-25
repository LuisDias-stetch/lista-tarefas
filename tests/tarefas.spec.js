const { test, expect } = require('@playwright/test');

test('usuário consegue adicionar uma tarefa', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Digite uma tarefa').fill('Estudar Java');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByText('Estudar Java')).toBeVisible();
});

test('usuário não consegue adicionar uma tarefa vazia', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.locator('#lista li')).toHaveCount(0);
});

test('usuário consegue concluir uma tarefa', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Digite uma tarefa').fill('Estudar Java');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  const tarefa = page.getByText('Estudar Java');

  await expect(tarefa).toBeVisible();

  await tarefa.click();

  await expect(tarefa).toHaveCSS('text-decoration-line', 'line-through');
});

test('usuário consegue excluir uma tarefa', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Digite uma tarefa').fill('Estudar Java');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  const tarefa = page.locator('li').filter({ hasText: 'Estudar Java' });

  await expect(tarefa).toBeVisible();

  await tarefa.getByRole('button', { name: 'Excluir' }).click();

  await expect(tarefa).not.toBeVisible();
});