import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { AccordionContent } from "~/components/Accordion";
import { animeContents } from "~/components/contents/media/anime/data";
import { myListStateGetById } from "~/components/contents/media/myList/data";
import { Button } from "~/components/parts/Button/Button";
import { AppLink } from "~/routes.config";
import { css } from "~/styled-system/css";
import { MyListState } from "~/utils/mal/MyListState";


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
      <p>{animeContents.length}</p>
      <ul>
        {animeContents.map(val => {
          const myState = myListStateGetById(val.id);
          if (myState?.status !== MyListState.PLAN_TO_WATCH) return null
          return (
            <li key={val.id}>
              <p>
                <Link href={`https://myanimelist.net/anime/${val.id}/`} target="_blank">
                  {val.name}
                </Link>
              </p>
              <p>
                <img src={val.picture} loading="lazy" alt={val.name} />
              </p>
              <p>
                開始日:
                {val.startedAt.isValid() ? (
                  <span>
                    {val.startedAt.format("YYYY年MM月")}
                  </span>
                ) : (
                  <span>
                    -
                  </span>
                )}
              </p>
              <p>
                終了日:
                {val.endedAt.isValid() ? (
                  <span>
                    {val.endedAt.format("YYYY年MM月")}
                  </span>
                ) : (
                  <span>
                    -
                  </span>
                )}
              </p>
              <p>
                {myState?.status}
              </p>

            </li>
          )
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
