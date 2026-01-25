import { component$, Slot } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

import { Navigation } from "./_components/Navigation";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export default component$(() => {
  return (
    <div class={styles.layout}>
      <Header class={styles.header} />
      <Navigation class={styles.nav} />
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
    ["--header-height"]: "100px",
    ["--nav-width"]: "200px",
    gridTemplate: `
      "header header" var(--header-height)
      "nav content" 1fr
      "footer footer" auto
      / var(--nav-width) auto
`,
  }),
  header: css({
    gridArea: "header",
  }),
  nav: css({
    gridArea: "nav",
    paddingX: "3",
    paddingY: "5",
  }),
  content: css({
    gridArea: "content",
  }),
  footer: css({
    gridArea: "footer",
  }),
};
