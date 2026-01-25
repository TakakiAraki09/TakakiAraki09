import { component$, type PropFunction, Slot } from "@builder.io/qwik";
import { css, cx } from "~/styled-system/css";

interface NavigationProps {
  class?: string;
  isOpen: boolean;
  onClose: PropFunction<() => void>;
}

export const Navigation = component$<NavigationProps>(
  ({ class: className, isOpen, onClose }) => {
    return (
      <>
        {/* モバイル用のオーバーレイ */}
        {isOpen && (
          <div class={styles.overlay} onClick$={onClose} aria-hidden="true" />
        )}

        {/* ナビゲーション本体 */}
        <nav class={cx(styles.nav, isOpen && styles.navOpen, className)}>
          <div class={styles.navContent}>
            <Slot />
          </div>
        </nav>
      </>
    );
  }
);

const styles = {
  overlay: css({
    display: {
      base: "block",
      tb: "none",
    },
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bg: "rgba(0, 0, 0, 0.5)",
    zIndex: 40,
    animation: "fadeIn 0.3s ease-out",
  }),
  nav: css({
    position: {
      base: "fixed",
      tb: "static",
    },
    top: {
      base: 0,
      tb: "auto",
    },
    left: {
      base: 0,
      tb: "auto",
    },
    bottom: {
      base: 0,
      tb: "auto",
    },
    width: {
      base: "280px",
      tb: "100%",
    },
    bg: "bg.primary",
    borderRight: {
      base: "none",
      tb: "1px solid",
    },
    borderColor: {
      tb: "accent.primary",
    },
    transform: {
      base: "translateX(-100%)",
      tb: "translateX(0)",
    },
    transition: "transform 0.3s ease-out",
    zIndex: 50,
    overflowY: "auto",
  }),
  navOpen: css({
    transform: "translateX(0)",
  }),
  navContent: css({
    padding: "4",
  }),
};
