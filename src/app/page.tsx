'use client';

import { useEffect, useState } from 'react';

import {
  Button,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from '@nextui-org/react';
import NextImage from 'next/image';
import { Image } from 'openai/resources';
import { SubmitHandler, set, useForm } from 'react-hook-form';

import { EyeFilledIcon } from '@/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/icons/EyeSlashFilledIcon';
import { Inputs, imageSizes } from '@/types';

import { action } from './action';

const OPENAI_API_KEY = 'OPENAI_API_KEY';

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<Image[]>([]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<Inputs>({
      defaultValues: {
        openaiApiKey: '',
        prompt: '',
        size: imageSizes[0].value,
        n: 1,
      },
      progressive: true,
    });

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setError(null);
    setImagesUrls([]);

    const { data, error } = await action(formData);

    if (data) {
      setImagesUrls(data);
    }

    if (error) {
      setError(error);
    }
  };

  const images = imagesUrls.map((image) => image.url).filter(Boolean);

  const n = watch('n');
  const size = watch('size');

  const skieletons = Array.from({ length: n }).map((_, i) => i + 1);

  const totalCost =
    (imageSizes.find((item) => item.value === size)?.cost ?? 0) * n;

  useEffect(() => {
    setValue('openaiApiKey', localStorage.getItem(OPENAI_API_KEY) || '');
  }, [setValue]);

  return (
    <main className="flex flex-col items-center  min-h-screen my-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-3 mx-auto max-w-lg gap-2"
      >
        <Input
          label="OpenAI API Key"
          labelPlacement="outside"
          isRequired
          placeholder="Enter your openai api key"
          description="Enter once - it will be saved in your browser"
          {...register('openaiApiKey', {
            onChange: (e) => {
              localStorage.setItem(OPENAI_API_KEY, e.target.value);
            },
          })}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
        <Textarea
          label="What image do you want to generate?"
          labelPlacement="outside"
          minRows={2}
          isRequired
          {...register('prompt')}
        />
        <Select
          label="Select image size"
          isRequired
          labelPlacement="outside"
          defaultSelectedKeys={[imageSizes[0].value]}
          className="pt-4"
          {...register('size')}
        >
          {imageSizes.map((item) => {
            const label = `${item.label} $${item.cost.toPrecision(2)} / image`;
            return (
              <SelectItem key={item.value} value={item.value} textValue={label}>
                {label}
              </SelectItem>
            );
          })}
        </Select>
        <Input
          type="number"
          label="How many images do you want?"
          placeholder="1"
          labelPlacement="outside"
          {...register('n', { setValueAs: (value) => Number(value) })}
          description={`The total cost is $${totalCost.toPrecision(2)}.`}
        />
        <Button color="primary" isLoading={isSubmitting} type="submit">
          Generate
        </Button>
      </form>
      {error && <p className="mx-auto p-2 max-w-md">{error}</p>}
      <div className="flex gap-4 m-4 flex-wrap items-center justify-center">
        {images.map((url) => (
          <NextImage src={url} key={url} alt="image" width={512} height={512} />
        ))}
        {isSubmitting &&
          skieletons.map((v) => (
            <Skeleton key={v} className="rounded-lg">
              <div className="h-[400px] w-[400px]"></div>
            </Skeleton>
          ))}
      </div>
    </main>
  );
}
