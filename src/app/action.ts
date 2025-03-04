'use server';

import { Inputs } from '@/types';
import { openai } from '@/utils/openai';

export const action = async (data: Inputs) => {
  const { openaiApiKey, prompt, size, n } = data;
  try {
    const response = await openai(openaiApiKey).images.generate({
      prompt,
      n,
      size: size.replace('-dall-e-3', '') as '256x256' | '512x512' | '1024x1024' | '1024x1792' | '1792x1024',
      model: size.includes('dall-e-3') ? 'dall-e-3' : 'dall-e-2',
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
