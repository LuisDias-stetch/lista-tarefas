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

test('usuário consegue adicionar uma tarefa pressionando Enter', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Digite uma tarefa').fill('Estudar Python');
  await page.getByPlaceholder('Digite uma tarefa').press('Enter');

  await expect(page.getByText('Estudar Python')).toBeVisible();
});

test('página possui o título correto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByRole('heading', { name: 'Lista de Tarefas' })).toBeVisible();
});

test('página possui campo para digitar tarefa', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByPlaceholder('Digite uma tarefa')).toBeVisible();
});

test('página possui botão Adicionar', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByRole('button', { name: 'Adicionar' })).toBeVisible();
});

test('página possui lista de tarefas', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('#lista')).toHaveCount(1);
});