import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Checkbox, CheckboxInput, CheckboxLabel } from "./Checkbox";

const CheckboxWrapper = component$<{ label: string }>((props) => {
  const checked = useSignal(false);

  return (
    <Checkbox>
      <CheckboxInput
        type="checkbox"
        checked={checked.value}
        onChange$={() => checked.value = !checked.value}
      />
      <CheckboxLabel>{props.label}</CheckboxLabel>
    </Checkbox>
  );
});

const meta = {
  title: "Components/Checkbox",
  component: CheckboxWrapper,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof CheckboxWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithLongLabel: Story = {
  args: {
    label: "I agree to the privacy policy and terms of service",
  },
};
