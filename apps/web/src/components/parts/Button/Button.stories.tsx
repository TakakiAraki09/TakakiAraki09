import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "info", "success", "error", "warning", "ghost", "outline"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
  },
  render: (args) => <Button {...args}>Primary Button</Button>,
};

export const Info: Story = {
  args: {
    variant: "info",
    size: "medium",
  },
  render: (args) => <Button {...args}>Info Button</Button>,
};

export const Success: Story = {
  args: {
    variant: "success",
    size: "medium",
  },
  render: (args) => <Button {...args}>Success Button</Button>,
};

export const Error: Story = {
  args: {
    variant: "error",
    size: "medium",
  },
  render: (args) => <Button {...args}>Error Button</Button>,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    size: "medium",
  },
  render: (args) => <Button {...args}>Warning Button</Button>,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "medium",
  },
  render: (args) => <Button {...args}>Ghost Button</Button>,
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "medium",
  },
  render: (args) => <Button {...args}>Outline Button</Button>,
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
  },
  render: (args) => <Button {...args}>Small Button</Button>,
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
  },
  render: (args) => <Button {...args}>Large Button</Button>,
};
