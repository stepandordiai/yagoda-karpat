import { Link } from "@/i18n/navigation";
import "./Breadcrumbs.scss";

type BreadcrumbsProps = {
	homeTitle: string;
	previousTitle?: string;
	previousUrl?: string;
	title: string;
};

export default function Breadcrumbs({
	homeTitle,
	previousTitle,
	previousUrl,
	title,
}: BreadcrumbsProps) {
	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ol className="breadcrumbs-list">
				<li>
					<Link className="breadcrumbs__link" href="/">
						{homeTitle}
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
