
const { test, expect } = require('@playwright/test');

test('usuário consegue adicionar uma tarefa', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar Java');
    await page.click('#adicionar');

    await expect(page.locator('#lista li')).toContainText('Estudar Java');
});

test('usuário não consegue adicionar uma tarefa vazia', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', '   ');
    await page.click('#adicionar');

    await expect(page.locator('#lista li')).toHaveCount(0);
});

test('usuário consegue concluir uma tarefa', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar Java');
    await page.click('#adicionar');

    const tarefa = page.locator('.tarefa-texto');

    await tarefa.click();

    await expect(tarefa).toHaveCSS('text-decoration-line', 'line-through');
});

test('usuário consegue excluir uma tarefa', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar Java');
    await page.click('#adicionar');

    await page.getByRole('button', { name: 'Excluir Estudar Java' }).click();

    await expect(page.locator('#lista li')).toHaveCount(0);
});

test('usuário consegue adicionar uma tarefa pressionando Enter', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar Java');
    await page.locator('#tarefa').press('Enter');

    await expect(page.locator('#lista li')).toContainText('Estudar Java');
});

test('página possui o título correto', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Lista de Tarefas');
});

test('página possui campo para digitar tarefa', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#tarefa')).toBeVisible();
});

test('página possui botão Adicionar', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#adicionar')).toBeVisible();
});

test('página possui lista de tarefas', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#lista')).toHaveCount(1);
});

test('cada tarefa possui botão Excluir', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar Java');
    await page.click('#adicionar');

    await expect(
        page.getByRole('button', { name: 'Excluir Estudar Java' })
    ).toBeVisible();
});

test('filtro Todas exibe tarefas pendentes e concluídas', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Tarefa pendente');
    await page.click('#adicionar');

    await page.fill('#tarefa', 'Tarefa concluída');
    await page.click('#adicionar');

    await page.locator('.tarefa-texto')
        .filter({ hasText: 'Tarefa concluída' })
        .click();

    await page.locator('[data-filtro="todas"]').click();

    await expect(page.locator('#lista li')).toHaveCount(2);
    await expect(page.locator('#lista')).toContainText('Tarefa pendente');
    await expect(page.locator('#lista')).toContainText('Tarefa concluída');
});

test('filtro Pendentes exibe apenas tarefas pendentes', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Tarefa pendente');
    await page.click('#adicionar');

    await page.fill('#tarefa', 'Tarefa concluída');
    await page.click('#adicionar');

    await page.locator('.tarefa-texto')
        .filter({ hasText: 'Tarefa concluída' })
        .click();

    await page.locator('[data-filtro="pendentes"]').click();

    await expect(page.locator('#lista li')).toHaveCount(1);
    await expect(page.locator('#lista')).toContainText('Tarefa pendente');
    await expect(page.locator('#lista')).not.toContainText('Tarefa concluída');
});

test('filtro Concluídas exibe apenas tarefas concluídas', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Tarefa pendente');
    await page.click('#adicionar');

    await page.fill('#tarefa', 'Tarefa concluída');
    await page.click('#adicionar');

    await page.locator('.tarefa-texto')
        .filter({ hasText: 'Tarefa concluída' })
        .click();

    await page.locator('[data-filtro="concluidas"]').click();

    await expect(page.locator('#lista li')).toHaveCount(1);
    await expect(page.locator('#lista')).toContainText('Tarefa concluída');
    await expect(page.locator('#lista')).not.toContainText('Tarefa pendente');
});

test('tarefa continua salva após atualizar a página', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Estudar persistência');
    await page.click('#adicionar');

    await expect(page.locator('#lista'))
        .toContainText('Estudar persistência');

    await page.reload();

    await expect(page.locator('#lista'))
        .toContainText('Estudar persistência');
});

test('estado de conclusão permanece salvo após atualizar a página', async ({ page }) => {
    await page.goto('/');

    await page.fill('#tarefa', 'Tarefa concluída');
    await page.click('#adicionar');

    const tarefa = page.locator('.tarefa-texto')
        .filter({ hasText: 'Tarefa concluída' });

    await tarefa.click();

    await expect(tarefa).toHaveCSS(
        'text-decoration-line',
        'line-through'
    );

    await page.reload();

    const tarefaRecarregada = page.locator('.tarefa-texto')
        .filter({ hasText: 'Tarefa concluída' });

    await expect(tarefaRecarregada).toHaveCSS(
        'text-decoration-line',
        'line-through'
    );
});