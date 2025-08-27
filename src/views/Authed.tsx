import { currency } from "../utils/currency";

interface Props {
	data: {
		balance: number;
		totalReturn: number;
		rateOfReturn: number;
		currency: string;
	};
}

export default function Authed({ data }: Props) {
	function getStatusColor() {
		if (data.rateOfReturn > 0) return "#57D54C";
		if (data.rateOfReturn < 0) return "#FC4949";
		return "#a2a2a2";
	}

	return (
		<main style={{ paddingInline: 10 }}>
			<h1 style={{ fontWeight: 300, fontSize: 24 }}>Value</h1>
			<h1 style={{ fontWeight: 400, fontSize: 30 }}>
				{currency.format(data.currency, data.balance)}
			</h1>

			<div style={{ display: "flex", gap: 20 }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span
						style={{
							color: "#a2a2a2ff",
							fontSize: 11,
							fontWeight: 600,
						}}
					>
						TOTAL RETURN
					</span>
					<span style={{ fontWeight: 600, color: getStatusColor() }}>
						{currency.format(data.currency, data.totalReturn)}
					</span>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span
						style={{
							color: "#a2a2a2ff",
							fontSize: 11,
							fontWeight: 600,
						}}
					>
						RATE OF RETURN
					</span>
					<span style={{ fontWeight: 600, color: getStatusColor() }}>
						{data.rateOfReturn.toFixed(2)}%
					</span>
				</div>
			</div>
		</main>
	);
}
