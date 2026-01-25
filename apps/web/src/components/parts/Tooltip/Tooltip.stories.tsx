import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from "./Tooltip";

const TooltipWrapper = component$<{ tooltipText: string }>((props) => {
  const isVisible = useSignal(false);

  return (
    <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
      <Tooltip>
        <TooltipTrigger
          onMouseEnter$={() => isVisible.value = true}
          onMouseLeave$={() => isVisible.value = false}
        >
          Hover me
        </TooltipTrigger>
        {isVisible.value && (
          <TooltipContent>
            {props.tooltipText}
            <TooltipArrow />
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
});

const meta = {
  title: "Components/Tooltip",
  component: TooltipWrapper,
  tags: ["autodocs"],
  argTypes: {
    tooltipText: {
      control: "text",
    },
  },
} satisfies Meta<typeof TooltipWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltipText: "This is a tooltip",
  },
};

export const LongText: Story = {
  args: {
    tooltipText: "This is a longer tooltip with more information",
  },
};
