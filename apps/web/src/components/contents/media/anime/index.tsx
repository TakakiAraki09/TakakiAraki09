import { component$ } from "@builder.io/qwik";
import { AnimeContent } from "./data";

export const Anime = component$((props: AnimeContent) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
});
