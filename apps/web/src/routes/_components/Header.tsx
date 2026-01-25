import { component$ } from "@builder.io/qwik";
import { cx } from "~/styled-system/css";

export const Header = component$((props: { class?: string }) => {
  return (
    <header class={cx(props.class)}>
      <h1>Dashboard</h1>
    </header>
  );
});
