import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Toggle } from "./Toggle";

const ToggleWrapper = component$(() => {
  const pressed = useSignal(false);

  return (
    <Toggle pressed={pressed.value} onClick$={() => pressed.value = !pressed.value}>
      {pressed.value ? "Pressed" : "Not Pressed"}
    </Toggle>
  );
});

const meta = {
  title: "Components/Toggle",
  component: ToggleWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
