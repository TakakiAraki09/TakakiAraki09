import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const AccordionWrapper = component$(() => {
  const openIndex = useSignal<number | null>(0);

  return (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger onClick$={() => openIndex.value = openIndex.value === 0 ? null : 0}>
          Accordion Item 1
          <span>{openIndex.value === 0 ? "▲" : "▼"}</span>
        </AccordionTrigger>
        {openIndex.value === 0 && (
          <AccordionContent>
            This is the content for the first accordion item. It contains detailed information that can be toggled.
          </AccordionContent>
        )}
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger onClick$={() => openIndex.value = openIndex.value === 1 ? null : 1}>
          Accordion Item 2
          <span>{openIndex.value === 1 ? "▲" : "▼"}</span>
        </AccordionTrigger>
        {openIndex.value === 1 && (
          <AccordionContent>
            This is the content for the second accordion item. It provides more details when expanded.
          </AccordionContent>
        )}
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger onClick$={() => openIndex.value = openIndex.value === 2 ? null : 2}>
          Accordion Item 3
          <span>{openIndex.value === 2 ? "▲" : "▼"}</span>
        </AccordionTrigger>
        {openIndex.value === 2 && (
          <AccordionContent>
            This is the content for the third accordion item. Additional information is shown here.
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
});

const meta = {
  title: "Components/Accordion",
  component: AccordionWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof AccordionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
