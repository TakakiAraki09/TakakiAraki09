import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

const CollapsibleWrapper = component$(() => {
  const isOpen = useSignal(false);

  return (
    <Collapsible>
      <CollapsibleTrigger onClick$={() => isOpen.value = !isOpen.value}>
        {isOpen.value ? "Hide" : "Show"} Content
        <span style={{ marginLeft: "auto" }}>{isOpen.value ? "▲" : "▼"}</span>
      </CollapsibleTrigger>
      {isOpen.value && (
        <CollapsibleContent>
          <div style={{ padding: "1rem" }}>
            This is collapsible content that can be shown or hidden by clicking the trigger button.
            It's useful for hiding less important information until the user wants to see it.
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
});

const meta = {
  title: "Components/Collapsible",
  component: CollapsibleWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof CollapsibleWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
