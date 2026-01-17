import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { AccordionContent } from "~/components/Accordion";
import { AppLink } from "~/routes.config";
import { css } from "~/styled-system/css";

const styled = css({
  fontSize: "heading-lg",
});
export default component$(() => {
  return (
    <>
      <h1 class={styled}>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <AppLink route="/">home</AppLink>

      <AccordionContent />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
