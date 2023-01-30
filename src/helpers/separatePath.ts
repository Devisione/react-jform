type SeparatePathReturn<T extends string> = {
  tailParts: Array<T>;
  head: T;
  tail: T;
};

export const separatePath = <T extends string = string>(path: T): SeparatePathReturn<T> => {
  const pathParts = path.split('.') as T[];
  const head = pathParts[pathParts.length - 1] as T;
  const tailParts = pathParts.slice(0, -1) as T[];
  const tail = tailParts.join('.') as T;

  return {
    tailParts,
    head,
    tail
  };
};
