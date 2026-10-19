import { test, expect } from '@playwright/test';

// Keep empty-state tests independent from the real production progress.
test.beforeEach(async ({ page }) => {
  await page.route('**/data/production.json', route => route.fulfill({ json: { version: 1, project: 'locadora2000', records: [] } }));
});

test('overview, full catalog, search, filters, pagination and details work in production', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Toda grande loja/ })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.locator('.stats')).toContainText('358');
  await page.getByRole('link', { name: /Tabela de produção/ }).first().click();
  await expect(page.locator('.asset-table tbody tr')).toHaveCount(30);
  await page.getByRole('button', { name: 'Próxima →' }).click();
  await expect(page.locator('.pagination')).toContainText('Página 2 de 12');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await page.locator('#filters input').fill('televisao pequena');
  await page.getByRole('button', { name: 'Filtrar', exact: true }).click();
  await expect(page.locator('.asset-table tbody tr')).toHaveCount(1);
  await expect(page.locator('.asset-table')).toContainText('ELE-014');
  await page.getByRole('link', { name: /Televisão CRT pequena/ }).click();
  await expect(page.getByRole('heading', { name: 'Televisão CRT pequena' })).toBeVisible();
  await expect(page.getByText('Aguardando o primeiro arquivo.')).toBeVisible();
  await page.goto('/#/table?priority=P0&category=ENV');
  const count = await page.locator('.asset-table tbody tr').count();
  expect(count).toBeGreaterThan(0);
  await expect(page.locator('.asset-table tbody')).not.toContainText('P1');
  await expect(page.locator('.asset-table tbody')).not.toContainText('P2');
  expect(errors).toEqual([]);
});

test('all documents, chapter links, source download and empty gallery load', async ({ page }) => {
  const failedRequests = [];
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(response.url()); });
  await page.goto('/#/gdd');
  await expect(page.locator('.markdown h2')).toHaveCount(21);
  await page.getByRole('link', { name: '21. Decisões abertas e riscos', exact: true }).click();
  await expect(page.locator('#doc-21-decisoes-abertas-e-riscos')).toBeInViewport();
  for (const [route, title] of [['analysis', 'Análise do GDD'], ['art', 'Direção de arte'], ['modularity', 'Assets e modularidade'], ['pipeline', 'Pipeline de produção'], ['source', 'Documento original'], ['roadmap', 'Uma loja de cada vez.']]) {
    await page.goto('/#/' + route);
    await expect(page.locator('.page-heading h1')).toHaveText(title);
  }
  await expect(page.locator('.markdown')).not.toBeVisible();
  await page.getByRole('link', { name: 'Assets e modularidade', exact: true }).click();
  await expect(page.locator('.markdown')).toContainText('Bandejas de recebimento e devolução');
  await expect(page.locator('.markdown')).toContainText('Contrato técnico dos kits');
  await page.locator('.markdown a[href="#/asset/ELE-014"]').click();
  await expect(page.locator('.page-heading h1')).toHaveText('Televisão CRT pequena');
  await page.goto('/#/source');
  await expect(page.locator('.markdown')).toContainText('DAT-018');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Markdown', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('locadora2000-catalogo-original.md');
  await page.goto('/#/sheets');
  await expect(page.getByRole('heading', { name: 'Tudo pronto para o primeiro asset.' })).toBeVisible();
  await expect(page.locator('.gallery-card')).toHaveCount(0);
  expect(failedRequests).toEqual([]);
});

test('a registered asset is visible in table, gallery and details without a separate upload', async ({ page }) => {
  const pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jf9sAAAAASUVORK5CYII=';
  const record = { id: 'ENV-001-sprite-clean-v001', assetId: 'ENV-001', kind: 'sprite', variant: 'clean', version: 1, status: 'review', file: 'assets/production/ENV-001/fixture.png', filename: 'fixture.png', width: 1, height: 1, dimensions: '1 × 1 px', bytes: 68, creator: 'Browser test', rights: 'Test fixture', notes: 'Fixture only', createdAt: '2026-10-19T00:00:00Z' };
  await page.route('**/data/production.json', route => route.fulfill({ json: { version: 1, project: 'locadora2000', records: [record] } }));
  await page.route('**/assets/production/ENV-001/fixture.png', route => route.fulfill({ contentType: 'image/png', body: Buffer.from(pixel, 'base64') }));
  await page.goto('/#/table?q=ENV-001');
  await expect(page.locator('.asset-table')).toContainText('1 arquivo');
  await expect(page.locator('.asset-table')).toContainText('Em revisão');
  await page.goto('/#/sheets');
  await expect(page.locator('.gallery-card')).toHaveCount(1);
  await page.locator('.gallery-card').click();
  await expect(page.locator('.record')).toContainText('Browser test');
  await expect(page.getByRole('link', { name: 'Baixar arquivo' })).toHaveAttribute('href', './assets/production/ENV-001/fixture.png');
  await page.locator('.record-preview img').click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Fechar imagem' }).click();
  await expect(page.locator('dialog')).toHaveCount(0);
});

test('mobile menu, theme persistence, search and layout remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.hero')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Abrir navegação' }).click();
  await page.getByRole('link', { name: 'Game Design Document', exact: true }).first().click();
  await expect(page.locator('.markdown h2')).toHaveCount(21);
  await expect(page.locator('body')).not.toHaveClass('menu-open');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Alternar tema claro ou escuro' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('textbox', { name: 'Buscar no catálogo de assets' }).fill('ENV-001');
  await page.getByRole('textbox', { name: 'Buscar no catálogo de assets' }).press('Enter');
  await expect(page.locator('.asset-table tbody tr')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('unknown routes and IDs show an honest not-found state', async ({ page }) => {
  await page.goto('/#/asset/ENV-999');
  await expect(page.getByRole('heading', { name: 'Página não encontrada.' })).toBeVisible();
  await page.goto('/#/missing');
  await expect(page.getByRole('heading', { name: 'Página não encontrada.' })).toBeVisible();
});
