export const pageCheck = (param: string, bookId: string): boolean => {
  const paramName = param.split(":")[0];
  const paramValue = param.split(": ")[1];
  const paramCondition = param.split(": ")[2];
  const localValue = localStorage.getItem(`book:${bookId} ${paramName.toLowerCase()}`);
   if (localValue !== null&&paramValue!== "" && paramCondition!== null) {
		switch (paramCondition) {
			case ">":
				return +localValue >= +paramValue;
			case "<":
				return +localValue <= +paramValue;
			case "=": 
				return +localValue === +paramValue;
			default:
				return +localValue >= +paramValue;
		}
  } 
  else if (localValue !== null && paramValue !== "" ) {
    return +localValue >= +paramValue;
  } 
  
  else if (param === "") {
		return true;
  }
  return false;
};
export const action = (state: number, variable: string, bookId:string): number => {
  const item = localStorage.getItem(`book:${bookId} ` + variable.toLowerCase());
  console.log(item);
  if (item !== null) {
    localStorage.setItem(`book:${bookId} ` + variable.toLowerCase(), `${+item + +state}`);
    return +item + state;
  } else {
    localStorage.setItem(`book:${bookId} ` + variable.toLowerCase(), `${state}`);
    return state;
  }
};
