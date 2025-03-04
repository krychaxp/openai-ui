export const imageSizes = [
  { value: '256x256', label: '256x256 (DALL-E 2)', cost: 0.016 },
  { value: '512x512', label: '512x512 (DALL-E 2)', cost: 0.018 },
  { value: '1024x1024', label: '1024x1024 (DALL-E 2)', cost: 0.02 },
  { value: '1024x1024-dall-e-3', label: '1024x1024 (DALL-E 3)', cost: 0.04 },
  { value: '1024x1792-dall-e-3', label: '1024x1792 (DALL-E 3)', cost: 0.08 },
  { value: '1792x1024-dall-e-3', label: '1792x1024 (DALL-E 3)', cost: 0.08 },
] as const;

export type Inputs = {
  openaiApiKey: string;
  prompt: string;
  size: (typeof imageSizes)[number]['value'];
  n: number;
};
