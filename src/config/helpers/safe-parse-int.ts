type Parseable = string | number | undefined;

export const safeParseInt = (val: Parseable): number => {
  const firstTry = Number(val);

  if (isNaN(firstTry)) return 0;

  return firstTry;
};
