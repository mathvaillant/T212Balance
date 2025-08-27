import { useEffect, useRef } from "react";
import useAccount from "./hooks/useAccount";
import Authed from "./views/Authed";
import Unauthed from "./views/Unauthed";
import { TrayIcon } from "@tauri-apps/api/tray";
import { currency } from "./utils/currency";
import { useApiKey } from "./hooks/useApiKey";
import { listen } from "@tauri-apps/api/event";
import "./App.css";

export default function App() {
	const tray = useRef<TrayIcon | null>(null);

	const { apiKey, setApiKey, deleteApiKey } = useApiKey();

	const account = useAccount(apiKey);

	useEffect(() => {
		(async () => {
			if (!tray.current) tray.current = await TrayIcon.getById("main");
			const title = currency.format(account.currency, account.balance);
			await tray.current?.setTitle(title);
		})();
	}, [account.balance, account.currency]);

	useEffect(() => {
		const unlisten = listen<string>("logout", async () => {
			await deleteApiKey();
			await tray.current?.setTitle("Click To Setup");
		});

		return () => {
			unlisten.then((callback) => callback());
		};
	}, []);

	if (apiKey) return <Authed data={account} />;
	return <Unauthed onConfirm={setApiKey} />;
}
