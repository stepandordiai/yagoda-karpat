// TODO: ?
declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
	}
}

export function reportConversion(sendTo: string, url?: string) {
	if (typeof window === "undefined" || !window.gtag) {
		if (url) window.location.href = url;
		return;
	}
	window.gtag("event", "conversion", {
		send_to: sendTo,
		event_callback: () => {
			if (url) window.location.href = url;
		},
	});
}
