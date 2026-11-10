# Optimising the heavy media

The files in `public/models` and `public/audio` are the *optimised* versions.
Keep the originals (source GLBs, WAVs) outside the repo and re-run these steps
whenever one changes.

## 3D models (`public/models/*.glb`)

Originals were 4–33 MB (uncompressed geometry, embedded PNG textures). They are
compressed with [glTF Transform](https://gltf-transform.dev): meshopt geometry
compression, WebP textures, pruned/welded/joined meshes. Result: 57 MB → 4.5 MB.

```bash
npx @gltf-transform/cli optimize source/electric_guitar.glb public/models/electric_guitar.glb \
  --compress meshopt --texture-compress webp --texture-size 2048

for f in electronic_piano_keyboard guitar fredsters_microphone; do
  npx @gltf-transform/cli optimize "source/$f.glb" "public/models/$f.glb" \
    --compress meshopt --texture-compress webp --texture-size 1024
done
```

The hero guitar keeps 2048 px textures (it is inspected close up); the three
"Core Disciplines" models share one 1280×500 canvas, so 1024 px is enough.

Every loader must be given the meshopt decoder or the files will not load:

```ts
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
loader.setMeshoptDecoder(MeshoptDecoder);
```

This is already done in `components/home/GuitarModel.tsx`,
`components/home/Disciplines3D.tsx` and `scripts/render-instruments/harness.html`.
If a model's pose or look changes, re-render the phone/tablet PNG stand-ins
with `scripts/render-instruments`.

## Timeline audio (`public/audio/*.mp3`)

The About-page timeline tracks were 44.1 kHz 16-bit stereo WAV (16 MB for
nine files). They are encoded to 128 kbps MP3 (1.5 MB) with `wav2mp3.mjs`
(pure JS, uses `lamejs@1.2.0` — 1.2.1 is broken under Node):

```bash
npm i -D lamejs@1.2.0            # one-off, or install it in a scratch folder
node scripts/optimize-media/wav2mp3.mjs source/audio public/audio 128
```

`AboutTimelineSection` creates the players with `preload="none"` and only
starts fetching the active track and the transition chime once the timeline
is on screen, so a visit to `/about` no longer downloads any audio up front.
