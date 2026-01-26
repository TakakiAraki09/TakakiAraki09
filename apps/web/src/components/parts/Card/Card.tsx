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
        maxHeight: "200px",
        width: "100%",
        borderRadius: "outer",
        bg: "bg.secondary",
        overflow: "hidden",
        textDecoration: "none",
        border: "1px solid token(colors.bg.tertiary)",
        boxShadow: "card",
        transition: "all 300ms ease",
        _hover: {
          transform: "translateY(-4px)",
          boxShadow:
            "0px 12px 26px 0px rgba(0, 0, 0, 0.15), 0px 48px 48px 0px rgba(0, 0, 0, 0.13), 0px 106px 64px 0px rgba(0, 0, 0, 0.08), 0px 190px 76px 0px rgba(0, 0, 0, 0.02), 0px 296px 84px 0px rgba(0, 0, 0, 0)",
        },
      })}
    >
      <div
        class={css({
          overflow: "hidden",
          borderLeftRadius: "inner",
          flexShrink: 0,
        })}
      >
        <img
          src={props.imageUrl}
          alt={props.title}
          width="200"
          height="200"
          class={css({
            display: "block",
            width: "200px",
            height: "full",
            objectFit: "cover",
            transition: "transform 300ms ease",
            _hover: {
              transform: "scale(1.05)",
            },
          })}
        />
      </div>
      <div
        class={css({
          padding: "4",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        })}
      >
        <h3
          class={css({
            overflow: "hidden",
            display: "box",
            boxOrient: "vertical",
            textOverflow: "ellipsis",
            margin: 0,
            fontWeight: "bold",
            flex: "none",
            lineClamp: 2,
          })}
        >
          {props.title}
        </h3>

        {props.content && (
          <div
            class={css({
              flex: 1,
              opacity: 0.85,
            })}
          >
            {props.content}
          </div>
        )}

        <p
          class={css({
            display: "flex",
            gap: "2",
            flex: "none",
            margin: 0,
          })}
        >
          {props.labels.map((label, index) => (
            <span
              key={index}
              onClick$={label.onAction}
              class={cx(
                label.color,
                styles.label.base,
                label.onAction && styles.label.clickable,
              )}
            >
              {label.displayName}
            </span>
          ))}
        </p>
      </div>
    </a>
  );
});

const styles = {
  label: {
    base: css({
      paddingX: "3",
      paddingY: "1",
      fontWeight: "bold",
      fontSize: "small",
      borderRadius: "full",
      transition: "all 200ms ease",
    }),
    clickable: css({
      cursor: "pointer",
      _hover: {
        transform: "scale(1.05)",
      },
    }),
  },
};
