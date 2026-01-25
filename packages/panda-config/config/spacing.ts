import type { GetPandaConfigMap } from "./interfaces";

const variables = Array.from({ length: 50 })
  .map((_, index) => ({
    value: `${index * 4}px`,
  }))
  // Convert the array to an object with index as keys
  .reduce(
    (acc, curr, index) => {
      acc[index] = curr;
      return acc;
    },
    {} as Record<number, { value: string }>,
  );

export const pandaSpacing: GetPandaConfigMap<"spacing"> = variables;
