# System Pressure UI Copy Pack

Репозиторий хранит:

- **исходники контента** для Figma (`figma/`),
- **экспортированные артефакты** прототипа (`artifacts/figma-make-export/`).

## Рекомендуемая структура

```text
.
├─ figma/
│  ├─ README.md
│  └─ neuro_containment_ui_pack.csv
├─ artifacts/
│  └─ figma-make-export/
│     ├─ README.md
│     ├─ html/
│     ├─ assets/
│     └─ previews/
└─ README.md
```

## Зачем так

- `figma/` = источник истины (копирайтинг, severity, animation hints).
- `artifacts/` = результат генерации/экспорта, который можно смотреть и тестировать отдельно.
- Контекст не теряется: и source, и output живут в одном репозитории, но не перемешаны.

## Если у тебя уже есть папка `Systempressureuicopypack-main`

Перемести её содержимое в `artifacts/figma-make-export/` и удали старую корневую папку.

Пример (локально в терминале):

```bash
mkdir -p artifacts/figma-make-export
cp -R Systempressureuicopypack-main/. artifacts/figma-make-export/
rm -rf Systempressureuicopypack-main
```

После этого сделай коммит:

```bash
git add -A
git commit -m "Restructure repository: keep figma sources and move exports to artifacts"
git push
```
