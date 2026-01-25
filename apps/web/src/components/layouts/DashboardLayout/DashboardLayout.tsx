import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const DashboardLayout = component$(() => {
  const isNavOpen = useSignal(false);

  const toggleNav = $(() => {
    isNavOpen.value = !isNavOpen.value;
  });

  const closeNav = $(() => {
    isNavOpen.value = false;
  });

  return (
    <div class={styles.layout}>
      <Header class={styles.header} onToggleNav={toggleNav} />
      <Navigation
        class={styles.nav}
        isOpen={isNavOpen.value}
        onClose={closeNav}
      />
      <main class={styles.content}>
        <Slot />
      </main>
      <Footer class={styles.footer} />
    </div>
  );
});

const styles = {
  layout: css({
    display: "grid",
    minHeight: "100vh",
    position: "relative",
    gridTemplate: {
      base: `
        "header" var(--header-height)
        "content" 1fr
        "footer" auto
        / 1fr
      `,
      tb: `
        "header header" var(--header-height)
        "nav content" 1fr
        "footer footer" auto
        / var(--nav-width) 1fr
      `,
    },
    ["--header-height"]: "60px",
    ["--nav-width"]: "240px",
  }),
  header: css({
    gridArea: "header",
  }),
  nav: css({
    gridArea: "nav",
  }),
  content: css({
    gridArea: "content",
    padding: "4",
  }),
  footer: css({
    gridArea: "footer",
  }),
};
