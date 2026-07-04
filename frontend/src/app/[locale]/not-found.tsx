import { Link } from "@/i18n/navigation";

export default function NotFound() {
	return (
		<main className="not-found">
			<div>
				<h1 className="not-found__title">404</h1>
				<p className="not-found__description">Page not found</p>
			</div>
			<Link className="not-found__link" href="/">
				Return to Home page
			</Link>
		</main>
	);
}
