import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { AccordionContent } from "~/components/Accordion";
import { css } from "~/styled-system/css";
import {
  contentStates,
  getContentAnimeById,
  contentNews,
} from "@repo/mal-database";
import { day } from "~/libs/day";

import { Card, CardProps } from "~/components/card/Card";
import { getMyListState, getMyListStateLabel } from "~/utils/mal/MyListState";
import { pipe, filter, map, sortBy } from "remeda";

const newsList = pipe(
  contentNews,
  map((news): (CardProps & { id: string }) | null => {
    if (!news.title || !news.link || !news.id) return null;
    return {
      id: news.id,
      title: news.title,
      imageUrl: news.ogImageUrl ?? "",
      description: `${day(news.isoDate).format("YYYY/MM/DD")}`,
      link: news.link,
      labels: [
        {
          displayName: "ニュース",
          color: css({
            bg: "bg.info",
          }),
        },
      ],
    };
  }),
  filter((val): val is CardProps & { id: string } => val !== null),
  (val) => val.slice(0, 10),
);

const animeList = pipe(
  contentStates,
  map((state) => {
    const animeContent = getContentAnimeById(state.id);
    if (animeContent == null) return null;
    return {
      state: state,
      content: animeContent,
    };
  }),
  filter((val) => val != null),
  sortBy((val) => -day(val!.content.startDate ?? 0).unix()),
  map((val): CardProps & { id: string } => {
    const state = getMyListState(val.state.listStatusStatus ?? "");
    const label = getMyListStateLabel(state);
    return {
      id: val.content.id.toString(),
      title: val.content.alternativeTitlesJa ?? "No Title",
      imageUrl: val.content.mainPictureLarge ?? "",
      link: `https://myanimelist.net/anime/${val.content.myanimelistId}/`,
      description: `
        開始日: ${day(val.content.startDate ?? 0).format("YYYY/MM/DD")}
        終了日: ${day(val.content.endDate ?? 0).format("YYYY/MM/DD")}
      `,
      labels: [
        {
          displayName: label.displayLabel,
          color: label.color,
        },
      ],
    };
  }),
  (val) => val.slice(0, 10),
);

export default component$(() => {
  return (
    <div>
      <h1> dashboard 👋</h1>
      <h2>最新ニュース</h2>
      <Link href="/">a</Link>
      <ul
        class={css({
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          padding: "0",
        })}
      >
        {newsList.map((item, index) => (
          <li key={index} class={css({ listStyle: "none", display: "flex" })}>
            <Card {...item} />
            <p>
              <Link href={`/TakakiAraki09/detail/${item.id}/`}>detail</Link>
            </p>
          </li>
        ))}
      </ul>
      <h2>視聴可能</h2>
      <ul
        class={css({
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          padding: "0",
        })}
      >
        {animeList.map((item, index) => (
          <li key={index} class={css({ listStyle: "none", display: "flex" })}>
            <Card {...item} />
            <Link href={`/TakakiAraki09/detail/${item.id}/`}>detail</Link>
          </li>
        ))}
      </ul>
      <AccordionContent />
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
