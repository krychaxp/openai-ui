'use server';

import { Inputs } from '@/types';
import { openai } from '@/utils/openai';

export const action = async (data: Inputs) => {
  const { openaiApiKey, prompt, size, n } = data;
  try {
    const response = await openai(openaiApiKey).images.generate({
      prompt,
      n,
      size,
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
