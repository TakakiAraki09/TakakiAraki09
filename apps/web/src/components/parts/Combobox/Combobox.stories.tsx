import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption } from "./Combobox";

const ComboboxWrapper = component$<{ options: string[] }>((props) => {
  const isOpen = useSignal(false);
  const inputValue = useSignal("");
  const selected = useSignal<string | null>(null);

  const filteredOptions = props.options.filter((option) =>
    option.toLowerCase().includes(inputValue.value.toLowerCase())
  );

  return (
    <Combobox>
      <ComboboxInput
        type="text"
        value={selected.value || inputValue.value}
        onInput$={(e: Event) => {
          const target = e.target as HTMLInputElement;
          inputValue.value = target.value;
          selected.value = null;
          isOpen.value = true;
        }}
        onFocus$={() => isOpen.value = true}
        placeholder="Search..."
      />
      {isOpen.value && filteredOptions.length > 0 && (
        <ComboboxList>
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option}
              onClick$={() => {
                selected.value = option;
                inputValue.value = "";
                isOpen.value = false;
              }}
            >
              {option}
            </ComboboxOption>
          ))}
        </ComboboxList>
      )}
    </Combobox>
  );
});

const meta = {
  title: "Components/Combobox",
  component: ComboboxWrapper,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
    },
  },
} satisfies Meta<typeof ComboboxWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"],
  },
};

export const Countries: Story = {
  args: {
    options: ["Japan", "United States", "United Kingdom", "Germany", "France", "Italy", "Spain"],
  },
};
