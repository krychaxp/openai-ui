"use client";
import Image from "next/image";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import {
  Configuration,
  CreateImageRequestSizeEnum,
  ImagesResponseDataInner,
  OpenAIApi,
} from "openai";
import { FormEventHandler, useEffect, useRef, useState } from "react";

const sizes: CreateImageRequestSizeEnum[] = ["256x256", "512x512", "1024x1024"];

export default function Home() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [images, setImages] = useState<ImagesResponseDataInner[]>([]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!ref.current) {
      return;
    }

    const form = new FormData(ref.current);

    const openaiApiKey = form.get("openaiApiKey")?.toString();

    const prompt = form.get("prompt")?.toString();
    const size = form.get("size")?.toString() as CreateImageRequestSizeEnum;

    if (!prompt) {
      window.alert("Please enter a prompt");
      return;
    }

    if (!openaiApiKey) {
      window.alert("Please enter a openaiApiKey");
      return;
    }

    window.localStorage.setItem("openaiApiKey", openaiApiKey);

    console.log(openaiApiKey, prompt);

    const configuration = new Configuration({
      apiKey: openaiApiKey,
    });

    const openai = new OpenAIApi(configuration);

    openai
      .createImage({
        prompt,
        n: 1,
        size,
      })
      .then((res) => {
        setImages(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        window.alert(err.message);
      });
  };

  useEffect(() => {
    const input = ref.current?.querySelector<HTMLInputElement>(
      '[name="openaiApiKey"]'
    );

    if (input) {
      input.value = localStorage.getItem("openaiApiKey") ?? "";
    }
  }, []);

  return (
    <main>
      <Flex
        width="full"
        height="100vh"
        align="center"
        justify="center"
        maxWidth="2xl"
        direction="column"
        gap={5}
        mx="auto"
      >
        <form ref={ref} onSubmit={onSubmit}>
          <Flex direction="column" gap={3} width={600}>
            <FormControl>
              <FormLabel>Openai Api Key</FormLabel>
              <Input name="openaiApiKey" />
            </FormControl>
            <FormControl>
              <FormLabel>What you want to generate?</FormLabel>
              <Input name="prompt" />
            </FormControl>
            <FormControl>
              <FormLabel>Image size</FormLabel>
              <Select
                placeholder="Select image size"
                defaultValue={sizes[0]}
                isRequired
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit">Generate</Button>
          </Flex>
        </form>
        <Stack>
          {images.map(
            (image) =>
              image.url && (
                <Image
                  src={image.url}
                  key={image.url}
                  alt="image"
                  width={256}
                  height={256}
                />
              )
          )}
        </Stack>
      </Flex>
    </main>
  );
}
