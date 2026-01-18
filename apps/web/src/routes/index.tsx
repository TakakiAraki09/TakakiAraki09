import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { AccordionContent } from "~/components/Accordion";
import { Button } from "~/components/parts/Button/Button";
import { AppLink } from "~/routes.config";
import { css } from "~/styled-system/css";
import { contentStates, getContentById } from "@repo/mal-database";

const styled = css({
  fontSize: "heading-lg",
  color: "accent.disabled",
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
      <Button size="small">button</Button>
      <AppLink route="/">home</AppLink>
      <p>{contentStates.length}</p>
      <ul
        class={css({
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          padding: "0",
        })}
      >
        {contentStates.map((state) => {
          const content = getContentById(state.id);
          return (
            <li
              key={state.id}
              class={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStyle: "none",
                width: "200px",
                border: "1px solid",
                borderColor: "accent.secondary",
              })}
            >
              <img
                src={content?.mainPictureLarge ?? ""}
                alt={content?.title}
                width={200}
                height={300}
                class={css({
                  objectFit: "contain",
                  borderBottom: "1px solid",
                  borderColor: "accent.primary",
                })}
              />
              <p>{state.listStatusStatus}</p>
              <p
                class={css({
                  fontSize: "sm",
                  color: "text.secondary",
                  flex: "1",
                })}
              >
                <Link
                  href={`https://myanimelist.net/anime/${content?.myanimelistId}/`}
                  target="_blank"
                >
                  {content?.alternativeTitlesJa}
                </Link>
              </p>
            </li>
          );
        })}
      </ul>

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
