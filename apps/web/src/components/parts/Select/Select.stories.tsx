import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { SelectTrigger, SelectContent, SelectOption } from "./Select";

const SelectWrapper = component$<{ options: string[] }>((props) => {
  const isOpen = useSignal(false);
  const selected = useSignal<string | null>(null);

  return (
    <div style={{ position: "relative" }}>
      <SelectTrigger onClick$={() => isOpen.value = !isOpen.value}>
        {selected.value || "Select an option"}
        <span>▼</span>
      </SelectTrigger>
      {isOpen.value && (
        <SelectContent>
          {props.options.map((option) => (
            <SelectOption
              key={option}
              onClick$={() => {
                selected.value = option;
                isOpen.value = false;
              }}
            >
              {option}
            </SelectOption>
          ))}
        </SelectContent>
      )}
    </div>
  );
});

const meta = {
  title: "Components/Select",
  component: SelectWrapper,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
    },
  },
} satisfies Meta<typeof SelectWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`),
  },
};
