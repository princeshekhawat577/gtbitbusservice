export const generateToken = (count: number) => {
  return `GTB-HMR-${String(count + 1).padStart(3, "0")}`;
};