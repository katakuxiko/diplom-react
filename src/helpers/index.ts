export const pageCheck = (param: string, bookId: string): boolean => {
	const conditions = param.split("; ");
	console.log(conditions);
	const value = conditions.map((para) => {
		const paraNae = para.split(" ")[0];
		const paraValue = para.split(" ")[2];
		const paraCondition = para.split(" ")[1];
		console.log(paraNae, paraValue, paraCondition);
		const localValues = localStorage.getItem(
			`book:${bookId} ${paraNae.toLowerCase()}`
		);
		if (
			localValues !== null &&
			paraValue !== "" &&
			paraCondition !== null
		) {
			switch (paraCondition) {
				case ">":
					return +localValues >= +paraValue;
				case "<":
					return +localValues <= +paraValue;
				case "=":
					return +localValues === +paraValue;
				default:
					return +localValues >= +paraValue;
			}
		} else if (localValues !== null && paraValue !== "") {
			return +localValues >= +paraValue;
		} else if (para === "") {
			return true;
		}
		return false;
	});
	console.log(value);
	if (param === "") {
		return true;
	}
	return !value.includes(false);
	// const paramName = param.split(":")[0];
	// const paramValue = param.split(": ")[1];
	// const paramCondition = param.split(": ")[2];
	// const localValue = localStorage.getItem(
	// 	`book:${bookId} ${paramName.toLowerCase()}`
	// );
	// if (localValue !== null && paramValue !== "" && paramCondition !== null) {
	// 	switch (paramCondition) {
	// 		case ">":
	// 			return +localValue >= +paramValue;
	// 		case "<":
	// 			return +localValue <= +paramValue;
	// 		case "=":
	// 			return +localValue === +paramValue;
	// 		default:
	// 			return +localValue >= +paramValue;
	// 	}
	// } else if (localValue !== null && paramValue !== "") {
	// 	return +localValue >= +paramValue;
};
export const action = (state: string, ivariables: string, bookId: string) => {
	const variables = ivariables.split(", ");
	const states = state.toString().split(", ");
	console.log(variables);
	console.log(states);
	variables.forEach((variable,i) => {
		const item = localStorage.getItem(
			`book:${bookId} ` + variable.toLowerCase()
		);
		console.log(item);
		if (item !== null) {
			localStorage.setItem(
				`book:${bookId} ` + variable.toLowerCase(),
				`${+item + +states[i]}`
			);
		} else {
			localStorage.setItem(
				`book:${bookId} ` + variable.toLowerCase(),
				`${+states[i]}`
			);
		}
	});
};
