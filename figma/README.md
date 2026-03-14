# Figma UI Copy Pack

Файл `neuro_containment_ui_pack.csv` — готовый набор строк для импорта в Figma (через плагины типа **Google Sheets Sync**, **CSV to Layers**, **Content Reel**, или вручную через таблицу).

## Колонки
- `screen` — экран/сцена (BOOT / WAKE, METRICS OVERLOAD, DIRECTIVE / DESCENT).
- `section` — логическая зона на экране.
- `key` — стабильный идентификатор строки.
- `text` — текст для интерфейса.
- `severity` — тон строки (`info`, `warning`, `critical`) для раскраски.
- `anim_hint` — подсказка по анимации (`steady`, `type_on`, `pulse_hard`, `glitch_hard`, и т.д.).

## Рекомендованный workflow
1. Импортируй CSV в таблицу/плагин, чтобы получать `text` по `key`.
2. Настрой цветовые стили под `severity`:
   - `info` → холодный серо-зелёный;
   - `warning` → янтарный;
   - `critical` → красный/оранжевый с пульсом.
3. Привяжи прототипные анимации по `anim_hint` (микро-глитчи, мигание, type-on).
4. Собери 3 фрейма (по `screen`) и сделай 20–40 сек презентационный прогон.
