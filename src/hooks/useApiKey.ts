import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { load } from "@tauri-apps/plugin-store";

export function useApiKey() {
	const queryClient = useQueryClient();

	const storedApiKeyQuery = useQuery({
		queryKey: ["storedApiKey"],
		staleTime: Infinity, // Never refetch
		queryFn: async () => {
			const store = await load("settings.json");
			return store.get<string>("apiKey");
		},
	});

	const setApiKeyMutation = useMutation({
		mutationFn: async (newApiKey: string) => {
			const store = await load("settings.json");
			await store.set("apiKey", newApiKey);
			await store.save();
			return newApiKey;
		},
		onSuccess: (apiKey) => {
			storedApiKeyQuery.refetch();
			queryClient.setQueryData(["storedApiKey"], apiKey);
		},
	});

	const deleteApiKeyMutation = useMutation({
		mutationFn: async () => {
			const store = await load("settings.json");
			await store.delete("apiKey");
			await store.save();
			return null;
		},
		onSuccess: () => {
			storedApiKeyQuery.refetch();
			queryClient.setQueryData(["storedApiKey"], null);
		},
	});

	return {
		apiKey: storedApiKeyQuery.data,
		setApiKey: setApiKeyMutation.mutateAsync,
		deleteApiKey: deleteApiKeyMutation.mutateAsync,
	};
}
