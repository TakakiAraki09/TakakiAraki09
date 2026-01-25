import { component$ } from "@builder.io/qwik";
import { Children } from "~/interfaces/components";
import { css, cx } from "~/styled-system/css";

export interface CardProps {
  title: string;
  imageUrl: string;
  link: string;
  content?: Children;
  labels: {
    displayName: string;
    color: string;
    onAction?: () => void;
  }[];
}

export const Card = component$<CardProps>((props) => {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      class={css({
        display: "flex",
        gap: "3",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        width: "800px",
        textDecoration: "none",
        color: "accent.primary",
      })}
    >
      <img
        src={props.imageUrl}
        alt={props.title}
        width="200"
        height="100"
        class={css({
          display: "block",
          bg: "bg.secondary",
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "inner",
        })}
      />
      <div
        class={css({
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        })}
      >
        <h3 class={css({ marginTop: 2, flex: 1 })}>{props.title}</h3>

        {props.content && (
          <div
            class={css({
              marginTop: "2",
              flex: 1,
            })}
          >
            {props.content}
          </div>
        )}

        <p class={css({ display: "flex", gap: "4px", flexWrap: "wrap" })}>
          {props.labels.map((label, index) => (
            <span
              key={index}
              onClick$={label.onAction}
              class={cx(
                label.color,
                css({
                  paddingX: "2",
                  paddingY: "1",
                  fontWeight: "bold",
                  fontSize: "small",
                }),
              )}
              style={{
                borderRadius: "4px",
                cursor: label.onAction ? "pointer" : "default",
              }}
            >
              {label.displayName}
            </span>
          ))}
        </p>
      </div>
    </a>
  );
});
