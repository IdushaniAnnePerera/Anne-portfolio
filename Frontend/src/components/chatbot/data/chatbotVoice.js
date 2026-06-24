function normalize(value = '') {
  return value.toLowerCase();
}

function scoreVoice(voice) {
  const name = normalize(voice?.name);
  const lang = normalize(voice?.lang);

  let score = 0;

  if (lang.startsWith('en-in')) score += 120;
  else if (lang.startsWith('en-gb')) score += 100;
  else if (lang.startsWith('en-us')) score += 80;
  else if (lang.startsWith('en')) score += 60;

  // High-quality voices
  if (name.includes('neural')) score += 200;
  if (name.includes('natural')) score += 180;
  if (name.includes('online')) score += 100;

  // Prefer female voices
  if (name.includes('female')) score += 100;
  if (name.includes('woman')) score += 80;
  if (name.includes('zira')) score += 80;       // Microsoft Zira (female)
  if (name.includes('samantha')) score += 80;   // Apple Samantha (female)
  if (name.includes('aria')) score += 80;       // Microsoft Aria Neural (female)
  if (name.includes('jenny')) score += 80;      // Microsoft Jenny (female)
  if (name.includes('emma')) score += 80;       // Google/Microsoft Emma (female)
  if (name.includes('hazel')) score += 60;      // Microsoft Hazel (female)
  if (name.includes('sonia')) score += 60;      // Microsoft Sonia (female)
  if (name.includes('susan')) score += 60;
  if (name.includes('victoria')) score += 60;

  if (name.includes('google')) score += 40;
  if (name.includes('microsoft')) score += 30;
  if (voice?.localService) score += 8;
  if (voice?.default) score += 6;

  return score;
}

export function selectPreferredVoice(voices = []) {
  if (!Array.isArray(voices) || voices.length === 0) {
    return null;
  }

  const englishVoices = voices.filter((voice) => normalize(voice?.lang).startsWith('en'));
  const pool = englishVoices.length > 0 ? englishVoices : voices;

  return [...pool].sort((left, right) => scoreVoice(right) - scoreVoice(left))[0] ?? null;
}
