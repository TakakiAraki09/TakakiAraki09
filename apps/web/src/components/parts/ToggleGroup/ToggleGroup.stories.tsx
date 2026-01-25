import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const ToggleGroupWrapper = component$(() => {
  const selected = useSignal<string | null>("left");

  return (
    <ToggleGroup>
      <ToggleGroupItem
        pressed={selected.value === "left"}
        onClick$={() => selected.value = "left"}
      >
        Left
      </ToggleGroupItem>
      <ToggleGroupItem
        pressed={selected.value === "center"}
        onClick$={() => selected.value = "center"}
      >
        Center
      </ToggleGroupItem>
      <ToggleGroupItem
        pressed={selected.value === "right"}
        onClick$={() => selected.value = "right"}
      >
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
});

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroupWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroupWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
