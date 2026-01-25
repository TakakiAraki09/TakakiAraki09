import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$ } from "@builder.io/qwik";
import { Label } from "./Label";

const LabelWrapper = component$<{ variant?: "default" | "required"; children: string }>((props) => {
  return <Label variant={props.variant}>{props.children}</Label>;
});

const meta = {
  title: "Components/Label",
  component: LabelWrapper,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "required"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof LabelWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Label Text",
  },
};

export const Required: Story = {
  args: {
    variant: "required",
    children: "Required Field",
  },
};
