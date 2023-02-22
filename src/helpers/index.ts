export const pageCheck = (param: string, bookId: string): boolean => {
  const paramName = param.split(":")[0];
  const paramValue = param.split(": ")[1];
  console.log(param)
  const localValue = localStorage.getItem(`book:${bookId} ${paramName}`);
  console.log(paramName + " " + paramValue);
  console.log(localValue);
  if (localValue !== null && paramValue !== "") {
    return +localValue >= +paramValue;
  } else if (param === "") {
    return true;
  }
  return false;
};
export const action = (state: number, variable: string, bookId:string): number => {
  const item = localStorage.getItem(`book:${bookId} ` + variable);
  console.log(item);
  if (item !== null) {
    localStorage.setItem(`book:${bookId} ` + variable, `${+item + +state}`);
    return +item + state;
  } else {
    localStorage.setItem(`book:${bookId} ` + variable, `${state}`);
    return state;
  }
};
