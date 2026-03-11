const GENERATION_DELAY_MS = 1200;

function hashString(value) {
  return Array.from(value).reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 7);
}

function buildPalette(prompt) {
  const hash = hashString(prompt);
  const hueA = hash % 360;
  const hueB = (hash >> 3) % 360;
  const hueC = (hash >> 6) % 360;

  return {
    start: `hsl(${hueA} 82% 58%)`,
    middle: `hsl(${hueB} 78% 50%)`,
    end: `hsl(${hueC} 72% 42%)`
  };
}

function wrapPrompt(prompt, maxLineLength = 22) {
  const words = prompt.trim().split(/\s+/);
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxLineLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = nextLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, 4);
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildPlaceholderImage(prompt) {
  const palette = buildPalette(prompt);
  const lines = wrapPrompt(prompt);
  const text = lines
    .map((line, index) => {
      const y = 175 + index * 34;
      return `<text x="50%" y="${y}" text-anchor="middle" font-size="28" font-family="Helvetica, Arial, sans-serif" fill="white">${escapeXml(line)}</text>`;
    })
    .join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.start}" />
          <stop offset="50%" stop-color="${palette.middle}" />
          <stop offset="100%" stop-color="${palette.end}" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)" rx="64" />
      <circle cx="220" cy="220" r="120" fill="rgba(255,255,255,0.14)" />
      <circle cx="820" cy="320" r="180" fill="rgba(255,255,255,0.1)" />
      <circle cx="720" cy="760" r="220" fill="rgba(0,0,0,0.12)" />
      <rect x="112" y="112" width="800" height="800" rx="48" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.24)" />
      <text x="50%" y="116" text-anchor="middle" font-size="30" font-family="Helvetica, Arial, sans-serif" fill="rgba(255,255,255,0.85)">AI Merch Concept</text>
      <text x="50%" y="860" text-anchor="middle" font-size="22" font-family="Helvetica, Arial, sans-serif" fill="rgba(255,255,255,0.75)">Local placeholder output</text>
      ${text}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

async function saveDesignRecord(payload) {
  try {
    await fetch('/api/designs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch {
    // Ignore persistence failures so the design flow still works offline.
  }
}

export async function generateDesign(prompt) {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt) {
    return {
      success: false,
      error: 'A prompt is required to generate a design.'
    };
  }

  await new Promise((resolve) => setTimeout(resolve, GENERATION_DELAY_MS));

  const imageUrl = buildPlaceholderImage(trimmedPrompt);
  void saveDesignRecord({
    type: 'ai-generated',
    imageUrl,
    prompt: trimmedPrompt
  });

  return {
    success: true,
    imageUrl,
    note: 'Using a local placeholder renderer until a real AI image service is connected.'
  };
}