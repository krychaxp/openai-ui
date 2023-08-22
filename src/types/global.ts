export const imageSizes = [
  { value: '256x256', label: '256x256', cost: 0.016 },
  { value: '512x512', label: '512x512', cost: 0.018 },
  { value: '1024x1024', label: '1024x1024', cost: 0.02 },
] as const;

export type Inputs = {
  openaiApiKey: string;
  prompt: string;
  size: (typeof imageSizes)[number]['value'];
  n: number;
};
