import type { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselItem,
  CarouselButton,
} from "./Carousel";

const CarouselWrapper = component$<{ items: string[] }>((props) => {
  const currentIndex = useSignal(0);
  const totalItems = props.items.length;

  const handlePrev = $(() => {
    currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems;
  });

  const handleNext = $(() => {
    currentIndex.value = (currentIndex.value + 1) % totalItems;
  });

  return (
    <Carousel>
      <CarouselViewport>
        <CarouselContainer
          style={{
            transform: `translateX(-${currentIndex.value * 100}%)`,
          }}
        >
          {props.items.map((item, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `hsl(${(index * 360) / totalItems}, 70%, 50%)`,
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContainer>
      </CarouselViewport>
      <CarouselButton direction="prev" onClick$={handlePrev}>
        ←
      </CarouselButton>
      <CarouselButton direction="next" onClick$={handleNext}>
        →
      </CarouselButton>
    </Carousel>
  );
});

const meta = {
  title: "Components/Carousel",
  component: CarouselWrapper,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
  },
} satisfies Meta<typeof CarouselWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"],
  },
};

export const ThreeSlides: Story = {
  args: {
    items: ["First", "Second", "Third"],
  },
};
