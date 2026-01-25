import { JSXOutput } from "@builder.io/qwik";

export type Children = JSXOutput | JSXOutput[] | string | null | undefined;
export type PropsWithChildren<T> = T & {
  children?: Children;
}
