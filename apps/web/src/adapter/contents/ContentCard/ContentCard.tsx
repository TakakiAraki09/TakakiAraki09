import { component$ } from "@builder.io/qwik";

import { css } from "~/styled-system/css";
import { day } from "~/libs/day";
import { getMyListState, getMyListStateLabel } from "~/utils/mal/MyListState";
import { Card, type CardProps } from "~/components/parts/Card/Card";

import { mapContent, type ContentProps } from "~/entities/contents";

export const ContentCard = component$((props: ContentProps) => {
  const cardProps = mapContent<CardProps>({
    content: props.payload,
    mapper: {
      anime: (content) => {
        const state = getMyListState(content.state?.listStatusStatus ?? "");
        const label = getMyListStateLabel(state);
        return {
          title: content.payload.alternativeTitlesJa ?? "No Title",
          imageUrl: content.payload.mainPictureLarge ?? "",
          link: `https://myanimelist.net/anime/${content.payload.myanimelistId}/`,
          description: `
開始日: ${day(content.payload.startDate ?? 0).format("YYYY/MM/DD")}
終了日: ${day(content.payload.endDate ?? 0).format("YYYY/MM/DD")}
    `.trim(),
          labels: [
            {
              displayName: label.displayLabel,
              color: label.color,
            },
          ],
        };
      },
      news: (content) => {
        return {
          title: content.payload.title ?? "No Title",
          imageUrl: content.payload.ogImageUrl ?? "",
          description: day(content.payload.isoDate).format("YYYY/MM/DD"),
          link: content.payload.link ?? "",
          labels: [
            {
              displayName: "ニュース",
              color: css({ bg: "bg.info" }),
            },
          ],
        };
      },
    },
  });

  return <Card {...cardProps} />;
});
