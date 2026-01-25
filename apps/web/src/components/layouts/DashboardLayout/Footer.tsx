import { component$, Slot } from "@builder.io/qwik";
import { css, cx } from "~/styled-system/css";

interface FooterProps {
  class?: string;
}

export const Footer = component$<FooterProps>(({ class: className }) => {
  return (
    <footer class={cx(styles.footer, className)}>
      <Slot />
    </footer>
  );
});

const styles = {
  footer: css({
    padding: "4",
    bg: "bg.primary",
    borderTop: "1px solid",
    borderColor: "accent.primary",
    textAlign: "center",
    fontSize: "sm",
    color: "accent.primary",
  }),
};
