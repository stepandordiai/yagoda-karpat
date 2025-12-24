"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./PageNavTitle.scss";

type PageNavTitleProps = {
	homeTitle: string;
	previousTitle?: string;
	title: string;
};

export default function PageNavTitle({
	homeTitle,
	previousTitle,
	title,
}: PageNavTitleProps) {
	const t = useTranslations();

	return (
		<div className="page-nav-title">
			<Link className="page-nav-title__link" href="/">
				{homeTitle}
			</Link>
			{previousTitle && (
				<>
					<span>/</span>
					<Link className="page-nav-title__link" href="/products">
						{previousTitle}
					</Link>
				</>
			)}
			<span>/</span>
			<span>{title}</span>
		</div>
	);
}
