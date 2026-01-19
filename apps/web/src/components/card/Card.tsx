import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

export interface CardProps {
  title: string;
  imageUrl: string;
  link: string;
  description?: string;
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
        <h3 style={{ margin: "0 0 8px 0", flex: 1 }}>{props.title}</h3>

        {props.description && (
          <p style={{ margin: "8px 0 0 0", flex: 1 }}>{props.description}</p>
        )}

        <p style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {props.labels.map((label, index) => (
            <span
              key={index}
              onClick$={label.onAction}
              class={label.color}
              style={{
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: label.onAction ? "pointer" : "default",
                fontSize: "12px",
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
