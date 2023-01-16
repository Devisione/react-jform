export const concatPaths = (...paths: string[]): string => {
  return paths.filter(Boolean).join('.');
};
