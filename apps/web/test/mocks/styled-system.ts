// Mock for Panda CSS styled-system in tests
// This prevents the macro plugin from running during tests

export const css = (...args: unknown[]) => {
  return args.join(" ");
};

export const cx = (...args: unknown[]) => {
  return args.filter(Boolean).join(" ");
};

export default css;
