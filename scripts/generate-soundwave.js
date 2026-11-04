const fs = require('fs');
const sharp = require('sharp');

// 13 distinct bars with natural cluster gaps
const columns = [
  // Left cluster (Bass)
  { cx: 102, peak: 5, bottom: 9 },
  { cx: 135, peak: 3, bottom: 10 },
  { cx: 167, peak: 1, bottom: 11 }, // Left peak
  { cx: 198, peak: 4, bottom: 11 },

  // Isolated accent bar (creates airy gap)
  { cx: 263, peak: 5, bottom: 8 },

  // Center cluster (Mid - main spectrum)
  { cx: 329, peak: 4, bottom: 12 },
  { cx: 362, peak: 2, bottom: 13 },
  { cx: 394, peak: 0, bottom: 13 }, // Center highest peak
  { cx: 427, peak: 2, bottom: 13 },
  { cx: 459, peak: 4, bottom: 12 },

  // Right cluster (Treble)
  { cx: 545, peak: 5, bottom: 10 },
  { cx: 577, peak: 2, bottom: 11 }, // Right peak
  { cx: 609, peak: 6, bottom: 10 },
];

const dashW = 18;
const dashH = 4.5;
const rx = 2.25;
const startY = 22;
const pitchY = 11.2;

let rects = '';
for (const col of columns) {
  const x = col.cx - dashW / 2;
  for (let d = col.peak; d <= col.bottom; d++) {
    const y = startY + d * pitchY;
    const op = (d === col.peak ? 0.48 : 0.38).toFixed(2);
    rects += `  <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${dashW}" height="${dashH}" rx="${rx}" fill="#f68b9d" fill-opacity="${op}" />\n`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 170" fill="none">
${rects}</svg>`;

fs.writeFileSync('public/images/Footer/soundwave.svg', svg);
console.log('Saved public/images/Footer/soundwave.svg');

sharp(Buffer.from(svg))
  .png()
  .toFile('public/images/Footer/soundwave.png')
  .then(() => console.log('Saved public/images/Footer/soundwave.png'))
  .catch(err => console.error(err));
