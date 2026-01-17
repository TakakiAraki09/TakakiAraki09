import { component$ } from "@builder.io/qwik";
import { Accordion } from "@qwik-ui/headless";
import { styled } from "~/styled-system/jsx";
import { buttonStyle } from "~/styles/button";

const Trigger = styled(Accordion.Trigger, buttonStyle);

export const AccordionContent = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Trigger>Title</Trigger>
        </Accordion.Header>
        <Accordion.Content>Content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
});
