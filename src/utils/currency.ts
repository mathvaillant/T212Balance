function format(currency: string, amount: number) {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency,
	}).format(amount);
}

export const currency = { format };
