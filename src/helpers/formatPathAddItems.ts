export const formatPathAddItems = <T extends string, U extends string = T>(
  path: T,
  items = 'items'
): U => {
  return path.replace(/(\.[0-9]+?)/gm, `.${items}$1`) as U;
};
