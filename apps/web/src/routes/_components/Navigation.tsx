import { component$ } from "@builder.io/qwik";
import { cx } from "~/styled-system/css";

export const Navigation = component$((props: { class?: string }) => {
  return <nav class={cx(props.class)}>navigation</nav>;
});
