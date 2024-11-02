export const sortNumberInStr = array => {
  return array.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true }),
  );
};
