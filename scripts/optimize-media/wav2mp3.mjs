import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const lamejs = createRequire(import.meta.url)('lamejs');

const [srcDir, outDir, kbpsArg] = process.argv.slice(2);
const kbps = Number(kbpsArg || 128);
fs.mkdirSync(outDir, { recursive: true });

function parseWav(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') throw new Error('not a WAV');
  let off = 12, fmt = null, data = null;
  while (off + 8 <= buf.length) {
    const id = buf.toString('ascii', off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    const body = off + 8;
    if (id === 'fmt ') fmt = { format: buf.readUInt16LE(body), channels: buf.readUInt16LE(body + 2), sampleRate: buf.readUInt32LE(body + 4), bits: buf.readUInt16LE(body + 14) };
    if (id === 'data') data = buf.subarray(body, body + size);
    off = body + size + (size % 2);
  }
  if (!fmt || !data) throw new Error('missing fmt/data chunk');
  if (fmt.format !== 1 || fmt.bits !== 16) throw new Error(`unsupported WAV format ${fmt.format}/${fmt.bits}-bit`);
  return { ...fmt, data };
}

for (const f of fs.readdirSync(srcDir).filter((n) => n.toLowerCase().endsWith('.wav'))) {
  const wav = parseWav(fs.readFileSync(path.join(srcDir, f)));
  const frames = wav.data.length / (2 * wav.channels);
  const left = new Int16Array(frames), right = new Int16Array(frames);
  for (let i = 0; i < frames; i++) {
    left[i] = wav.data.readInt16LE(i * 2 * wav.channels);
    right[i] = wav.channels > 1 ? wav.data.readInt16LE(i * 2 * wav.channels + 2) : left[i];
  }
  const enc = new lamejs.Mp3Encoder(2, wav.sampleRate, kbps);
  const parts = [];
  const block = 1152;
  for (let i = 0; i < frames; i += block) {
    const out = enc.encodeBuffer(left.subarray(i, i + block), right.subarray(i, i + block));
    if (out.length) parts.push(Buffer.from(out));
  }
  const tail = enc.flush();
  if (tail.length) parts.push(Buffer.from(tail));
  const outPath = path.join(outDir, f.replace(/\.wav$/i, '.mp3'));
  fs.writeFileSync(outPath, Buffer.concat(parts));
  console.log(`${f.padEnd(28)} ${(wav.data.length / 1048576).toFixed(2)} MB -> ${(fs.statSync(outPath).size / 1024).toFixed(0)} KB  (${(frames / wav.sampleRate).toFixed(1)} s, ${wav.sampleRate} Hz, ${kbps} kbps)`);
}
