import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "./Dropdown";

const DropdownWrapper = component$(() => {
  const isOpen = useSignal(false);
  const selected = useSignal<string | null>(null);

  return (
    <Dropdown>
      <DropdownTrigger onClick$={() => isOpen.value = !isOpen.value}>
        {selected.value || "Select an option"} ▼
      </DropdownTrigger>
      {isOpen.value && (
        <DropdownMenu>
          <DropdownItem
            onClick$={() => {
              selected.value = "Option 1";
              isOpen.value = false;
            }}
          >
            Option 1
          </DropdownItem>
          <DropdownItem
            onClick$={() => {
              selected.value = "Option 2";
              isOpen.value = false;
            }}
          >
            Option 2
          </DropdownItem>
          <DropdownItem
            onClick$={() => {
              selected.value = "Option 3";
              isOpen.value = false;
            }}
          >
            Option 3
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
});

const meta = {
  title: "Components/Dropdown",
  component: DropdownWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
