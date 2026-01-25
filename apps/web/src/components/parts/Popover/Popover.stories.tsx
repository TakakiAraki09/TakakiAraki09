import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "./Popover";

const PopoverWrapper = component$(() => {
  const isOpen = useSignal(false);

  return (
    <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
      <Popover>
        <PopoverTrigger onClick$={() => isOpen.value = !isOpen.value}>
          Click me
        </PopoverTrigger>
        {isOpen.value && (
          <PopoverContent>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Popover Title</h4>
            <p style={{ margin: 0 }}>This is popover content with more detailed information.</p>
            <PopoverArrow />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
});

const meta = {
  title: "Components/Popover",
  component: PopoverWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof PopoverWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
