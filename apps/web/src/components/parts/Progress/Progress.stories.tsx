import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$ } from "@builder.io/qwik";
import { Progress, ProgressBar } from "./Progress";

const ProgressWrapper = component$<{ value: number; variant?: "info" | "success" | "error" | "warning"; size?: "small" | "medium" | "large" }>((props) => {
  return (
    <Progress size={props.size}>
      <ProgressBar variant={props.variant} style={{ width: `${props.value}%` }} />
    </Progress>
  );
});

const meta = {
  title: "Components/Progress",
  component: ProgressWrapper,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    variant: {
      control: "select",
      options: ["info", "success", "error", "warning"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof ProgressWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    value: 60,
    variant: "info",
    size: "medium",
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: "success",
    size: "medium",
  },
};

export const Error: Story = {
  args: {
    value: 30,
    variant: "error",
    size: "medium",
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    variant: "warning",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    value: 50,
    variant: "info",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    value: 50,
    variant: "info",
    size: "large",
  },
};
