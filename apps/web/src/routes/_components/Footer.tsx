import { component$ } from "@builder.io/qwik";
import { cx } from "~/styled-system/css";

export const Footer = component$((props: { class?: string }) => {
  return <footer class={cx(props.class)}>footer</footer>;
});
