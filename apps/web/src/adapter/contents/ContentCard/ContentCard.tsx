import { component$ } from "@builder.io/qwik";

import { css } from "~/styled-system/css";
import { formatDay } from "~/libs/day";
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
          content: (
            <div>
              <p>
                開始日:{" "}
                {formatDay({
                  day: content.payload.startDate,
                  format: "YYYY/MM/DD",
                })}
              </p>
              <p>
                終了日:{" "}
                {formatDay({
                  day: content.payload.endDate,
                  format: "YYYY/MM/DD",
                })}
              </p>
            </div>
          ),
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
          content: (
            <p>
              日付:{" "}
              {formatDay({
                day: content.payload.isoDate,
                format: "YYYY/MM/DD",
              })}
            </p>
          ),
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
