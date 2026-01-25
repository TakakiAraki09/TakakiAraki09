import { component$, type PropFunction } from "@builder.io/qwik";
import { css, cx } from "~/styled-system/css";

interface HeaderProps {
  class?: string;
  onToggleNav: PropFunction<() => void>;
}

export const Header = component$<HeaderProps>(({ class: className, onToggleNav }) => {
  return (
    <header class={cx(styles.header, className)}>
      <button class={styles.hamburger} onClick$={onToggleNav} aria-label="メニューを開く">
        <span class={styles.hamburgerLine}></span>
        <span class={styles.hamburgerLine}></span>
        <span class={styles.hamburgerLine}></span>
      </button>
      <h1 class={styles.title}>Dashboard</h1>
    </header>
  );
});

const styles = {
  header: css({
    display: "flex",
    alignItems: "center",
    gap: "4",
    padding: "4",
    bg: "bg.primary",
  }),
  hamburger: css({
    display: "flex",
    flexDirection: "column",
    gap: "1.5",
    padding: "2",
    bg: "transparent",
    cursor: "pointer",
    tb: {
      display: "none",
    },
    _hover: {
      opacity: 0.7,
    },
  }),
  hamburgerLine: css({
    width: "24px",
    height: "2px",
    bg: "accent.primary",
    transition: "all 0.3s",
  }),
  title: css({
    fontSize: "2xl",
    fontWeight: "bold",
    color: "accent.primary",
  }),
};
