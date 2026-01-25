import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { Pagination, PaginationItem, PaginationEllipsis } from "./Pagination";

const PaginationWrapper = component$<{ totalPages: number }>((props) => {
  const currentPage = useSignal(1);

  return (
    <Pagination>
      <PaginationItem
        active={false}
        onClick$={() => currentPage.value = Math.max(1, currentPage.value - 1)}
        disabled={currentPage.value === 1}
      >
        Previous
      </PaginationItem>
      {[...Array(Math.min(props.totalPages, 5))].map((_, i) => {
        const pageNum = i + 1;
        return (
          <PaginationItem
            key={pageNum}
            active={currentPage.value === pageNum}
            onClick$={() => currentPage.value = pageNum}
          >
            {pageNum}
          </PaginationItem>
        );
      })}
      {props.totalPages > 5 && <PaginationEllipsis>...</PaginationEllipsis>}
      <PaginationItem
        active={false}
        onClick$={() => currentPage.value = Math.min(props.totalPages, currentPage.value + 1)}
        disabled={currentPage.value === props.totalPages}
      >
        Next
      </PaginationItem>
    </Pagination>
  );
});

const meta = {
  title: "Components/Pagination",
  component: PaginationWrapper,
  tags: ["autodocs"],
  argTypes: {
    totalPages: {
      control: { type: "number", min: 1, max: 20 },
    },
  },
} satisfies Meta<typeof PaginationWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    totalPages: 3,
  },
};
