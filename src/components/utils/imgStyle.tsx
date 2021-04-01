export const imgStyle = (index: number) => {
  const rem = index % 6;
  switch (rem) {
    case 1:
      return "w-1/2 pr-2 pt-2 pb-2";
    case 2:
      return "w-1/2 pl-2 pt-2 pb-2";
    case 3:
      return "w-1/3 pr-2 pt-2 pb-2";
    case 4:
      return "w-1/3 pl-2 pr-2 pt-2 pb-2";
    case 5:
      return "w-1/3 pl-2 pt-2 pb-2";
    default:
      return "w-full pt-2 pb-2";
  }
};
