import { useState } from "react";

interface Props {
	onConfirm?: (apiKey: string) => void;
}

export default function Unauthed({ onConfirm }: Props) {
	const [apiKey, setApiKey] = useState("");

	return (
		<main
			style={{
				height: "90vh",
				paddingInline: 10,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: 10,
			}}
		>
			<h1 style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>
				Set your API Key
			</h1>
			<input
				type="text"
				placeholder="API Key"
				value={apiKey}
				onChange={(e) => setApiKey(e.target.value)}
				style={{
					width: "100%",
					boxSizing: "border-box",
				}}
			/>
			<button onClick={() => onConfirm?.(apiKey)}>Confirm</button>
		</main>
	);
}
