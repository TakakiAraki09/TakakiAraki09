import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { getContents } from "@repo/mal-database";
import { pipe, filter } from "remeda";
import { ContentCard } from "~/adapter/contents/ContentCard/ContentCard";

const newsList = pipe(
  getContents(),
  filter((content) => content.contentType === "news"),
  (val) => val.slice(0, 10),
);

const animeList = pipe(
  getContents(),
  filter((content) => content.contentType === "anime"),
  (val) => val.slice(0, 10),
);

export default component$(() => {
  return (
    <div>
      <h2>最新ニュース</h2>
      {newsList.map((content) => (
        <ContentCard key={content.id} payload={content} />
      ))}

      <h2>視聴可能</h2>
      {animeList.map((content) => (
        <ContentCard key={content.id} payload={content} />
      ))}
    </div>
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
