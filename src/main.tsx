// import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import App from "./App";
import { pdfjs } from "react-pdf";

// TODO: LEARN THIS
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

createRoot(document.getElementById("root") as HTMLDivElement).render(
	// <StrictMode>
	<HelmetProvider>
		<App />
	</HelmetProvider>
	// </StrictMode>
);
