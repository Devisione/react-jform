export const concatPaths = <T extends string = string>(...paths: T[]): T => {
  return paths.filter(Boolean).join('.') as T;
};
