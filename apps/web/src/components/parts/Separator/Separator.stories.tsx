import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$ } from "@builder.io/qwik";
import { Separator } from "./Separator";

const SeparatorWrapper = component$<{ orientation?: "horizontal" | "vertical" }>((props) => {
  return (
    <div style={{ display: "flex", flexDirection: props.orientation === "vertical" ? "row" : "column", gap: "1rem", padding: "1rem" }}>
      {props.orientation === "vertical" ? (
        <>
          <div>Content on the left</div>
          <Separator orientation={props.orientation} />
          <div>Content on the right</div>
        </>
      ) : (
        <>
          <div>Content above</div>
          <Separator orientation={props.orientation} />
          <div>Content below</div>
        </>
      )}
    </div>
  );
});

const meta = {
  title: "Components/Separator",
  component: SeparatorWrapper,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof SeparatorWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};
