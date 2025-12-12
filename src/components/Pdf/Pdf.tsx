import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";

type PdfProps = {
	file: string;
	page?: number;
};

const Pdf = ({ file, page = 1 }: PdfProps) => {
	const [width, setWidth] = useState<number>(300);

	useEffect(() => {
		const updateWidth = () => setWidth(Math.min(window.innerWidth - 40, 300));

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	return (
		<Document
			file={file}
			loading={<p>Loading PDF…</p>}
			onLoadError={(error) => {
				console.error("PDF load error:", error);
			}}
		>
			<Page
				pageNumber={page}
				width={width}
				renderTextLayer={false}
				renderAnnotationLayer={false}
			/>
		</Document>
	);
};

export default Pdf;
