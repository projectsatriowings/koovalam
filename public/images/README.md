# Images for the Koovalam landing page

Images are **not** included in this repository. Generate them from the
manifest at the project root, then they appear automatically:

```bash
export OPENAI_API_KEY="sk-..."
node scripts/generate-images.mjs                  # all missing images
node scripts/generate-images.mjs --only hero-bg --force
```

Files land in `public/images/<name>.png` (plus `.webp` when `sharp` is
installed). The page wires them via `src/components/ImageSlot.jsx` and
`src/data/images.js` — if a file is missing, a soft forest-green/cream
gradient block renders instead, never a broken-image icon.

To replace an image with a real photo, drop a file with the same name
(`<name>.png`, and optionally `<name>.webp`) into this folder.

## Honesty note

The temple, river and accommodation images (`highlight-temple`,
`highlight-nila-river`, `included-stay`) are generic AI-generated scenes.
**Replace them with real photos of the confirmed venue and locations
before launch.** The social share image (`og-share`) should be cropped to
1200×630 after generation.
