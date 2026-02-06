import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./Breadcrumbs.scss";

type BreadcrumbsProps = {
	homeTitle: string;
	previousTitle?: string;
	title: string;
};

export default async function Breadcrumbs({
	homeTitle,
	previousTitle,
	title,
}: BreadcrumbsProps) {
	const t = await getTranslations();

	return (
		<div className="breadcrumbs">
			<Link className="breadcrumbs__link" href="/">
				{homeTitle}
			</Link>
			{previousTitle && (
				<>
					<span>/</span>
					<Link className="breadcrumbs__link" href="/products">
						{previousTitle}
					</Link>
				</>
			)}
			<span>/</span>
			<span>{title}</span>
		</div>
	);
}
