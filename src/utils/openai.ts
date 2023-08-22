import OpenAI from 'openai';

export const openai = (apiKey: string) => new OpenAI({ apiKey });
