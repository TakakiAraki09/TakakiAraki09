import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const TabsWrapper = component$(() => {
  const activeTab = useSignal("tab1");

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          active={activeTab.value === "tab1"}
          onClick$={() => activeTab.value = "tab1"}
        >
          Tab 1
        </TabsTrigger>
        <TabsTrigger
          active={activeTab.value === "tab2"}
          onClick$={() => activeTab.value = "tab2"}
        >
          Tab 2
        </TabsTrigger>
        <TabsTrigger
          active={activeTab.value === "tab3"}
          onClick$={() => activeTab.value = "tab3"}
        >
          Tab 3
        </TabsTrigger>
      </TabsList>
      {activeTab.value === "tab1" && (
        <TabsContent>
          <h3>Content for Tab 1</h3>
          <p>This is the content area for the first tab.</p>
        </TabsContent>
      )}
      {activeTab.value === "tab2" && (
        <TabsContent>
          <h3>Content for Tab 2</h3>
          <p>This is the content area for the second tab.</p>
        </TabsContent>
      )}
      {activeTab.value === "tab3" && (
        <TabsContent>
          <h3>Content for Tab 3</h3>
          <p>This is the content area for the third tab.</p>
        </TabsContent>
      )}
    </Tabs>
  );
});

const meta = {
  title: "Components/Tabs",
  component: TabsWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof TabsWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
