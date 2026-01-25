import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "./Modal";
import { Button } from "../Button/Button";

const ModalWrapper = component$(() => {
  const isOpen = useSignal(false);

  return (
    <>
      <Button onClick$={() => isOpen.value = true}>Open Modal</Button>
      {isOpen.value && (
        <ModalOverlay onClick$={() => isOpen.value = false}>
          <ModalContent onClick$={(e: Event) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalCloseButton onClick$={() => isOpen.value = false}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <p>This is the modal body. You can put any content here.</p>
              <p>Click outside the modal or the close button to dismiss it.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick$={() => isOpen.value = false}>
                Cancel
              </Button>
              <Button variant="primary" onClick$={() => isOpen.value = false}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
});

const meta = {
  title: "Components/Modal",
  component: ModalWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
