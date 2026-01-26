import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { getContents, getContentStatesById } from "@repo/mal-database";
import { pipe, filter } from "remeda";
import { ContentCard } from "~/adapter/contents/ContentCard/ContentCard";
import { Carousel } from "~/components/parts/Carousel/Carousel";
import { css } from "~/styled-system/css";

const newsList = pipe(
  getContents(),
  filter((content) => content.contentType === "news"),
  (val) => val.slice(0, 10),
);

const animeList = pipe(
  getContents(),
  filter((content) => content.contentType === "anime"),
  filter((content) => {
    const state = getContentStatesById(content.id);
    return (
      state.listStatusStatus === "watching" ||
      state.listStatusStatus === "plan_to_watch"
    );
  }),
  (val) => val.slice(0, 10),
);

export default component$(() => {
  return (
    <main
      class={css({
        display: "flex",
        flexDirection: "column",
        width: "full",
        gap: "12",
        paddingY: "8",
        paddingX: "4",
      })}
    >
      <h2>最新ニュース</h2>

      <Carousel.Root>
        <div>
          <Carousel.Prev>prev</Carousel.Prev>
          <Carousel.Next>next</Carousel.Next>
        </div>
        <Carousel.Container>
          {newsList.map((content) => (
            <Carousel.Item key={content.id}>
              <ContentCard payload={content} />
            </Carousel.Item>
          ))}
        </Carousel.Container>
      </Carousel.Root>

      <h2>視聴可能</h2>
      <Carousel.Root>
        <div>
          <Carousel.Prev>prev</Carousel.Prev>
          <Carousel.Next>next</Carousel.Next>
        </div>
        <Carousel.Container>
          {animeList.map((content) => (
            <Carousel.Item key={content.id} class={css({
              padding: "3"
            })}>
              <ContentCard payload={content} />
            </Carousel.Item>
          ))}
        </Carousel.Container>
      </Carousel.Root>
    </main>
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
