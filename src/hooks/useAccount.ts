import { useQuery } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";

export default function useAccount(apiKey?: string) {
	const infoQuery = useQuery({
		enabled: Boolean(apiKey),
		queryKey: ["accountInfo", apiKey],
		queryFn: async () => {
			const response = await fetch(
				`https://demo.trading212.com/api/v0/equity/account/info`,
				{
					method: "GET",
					headers: { Authorization: apiKey! },
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch account info");
			}

			const json = await response.json();

			return { currency: json.currency };
		},
	});

	const cashQuery = useQuery({
		enabled: Boolean(apiKey),
		queryKey: ["accountCash", apiKey],
		refetchInterval: 2000, // Refetch every 2 seconds
		refetchIntervalInBackground: true,
		queryFn: async () => {
			const response = await fetch(
				`https://demo.trading212.com/api/v0/equity/account/cash`,
				{
					method: "GET",
					headers: { Authorization: apiKey! },
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch account cash");
			}

			const json = await response.json();

			return {
				balance: json.total as number,
				totalReturn: json.ppl as number,
				rateOfReturn: ((json.ppl / json.total) * 100) as number,
			};
		},
	});

	return {
		balance: cashQuery.data?.balance || 0,
		totalReturn: cashQuery.data?.totalReturn || 0,
		rateOfReturn: cashQuery.data?.rateOfReturn || 0,
		currency: infoQuery.data?.currency || "EUR",
	};
}
