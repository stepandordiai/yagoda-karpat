import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import "./Breadcrumbs.scss";

type BreadcrumbsProps = {
	previousTitle?: string;
	previousUrl?: string;
	title: string;
};

export default async function Breadcrumbs({
	previousTitle,
	previousUrl,
	title,
}: BreadcrumbsProps) {
	const t = await getTranslations();

	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ol className="breadcrumbs-list">
				<li>
					<Link className="breadcrumbs__link" href="/">
						{t("nav.home")}
					</Link>
				</li>
				{previousTitle && previousUrl && (
					<li>
						<span>/</span>
						<Link className="breadcrumbs__link" href={previousUrl}>
							{previousTitle}
						</Link>
					</li>
				)}
				<li>
					<span>/</span>
					<span>{title}</span>
				</li>
			</ol>
		</nav>
	);
}
