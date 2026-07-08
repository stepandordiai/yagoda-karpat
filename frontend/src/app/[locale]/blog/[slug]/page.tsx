import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { getTranslations } from "next-intl/server";
import getUpdatedDate from "@/utils/getUpdatedDate";
import { Link } from "@/i18n/navigation";
import { type Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import "./styles.scss";

export async function generateMetadata({
	params,
}: BlogPageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const t = await getTranslations({ locale });
	const blog = posts.find((p) => p.slug === slug);

	if (!blog) return {};

	const title = t(blog.meta.title);
	const description = t(blog.meta.description);
	const image = `${blog.img}`;

	return {
		title,
		description,
		alternates: {
			canonical: `/${locale}/blog/${slug}`,
			languages: {
				en: `/en/blog/${slug}`,
				uk: `/uk/blog/${slug}`,
				cs: `/cs/blog/${slug}`,
				"x-default": `/uk/blog/${slug}`,
			},
		},
		openGraph: {
			type: "article",
			title,
			description,
			url: `/${locale}/blog/${slug}`,
			siteName: "Yagoda Karpat",
			locale,
			publishedTime: blog.date,
			images: [{ url: image, width: 1200, height: 630, alt: t(blog.heading) }],
		},
		// twitter: {
		// 	card: "summary_large_image",
		// 	title,
		// 	description,
		// 	images: [image],
		// },
	};
}

type BlogPageProps = {
	params: Promise<{ slug: string; locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
	const { slug, locale } = await params;

	const t = await getTranslations({ locale });

	const blog = posts.find((p) => p.slug === slug);

	if (!blog) {
		return notFound();
	}

	// TODO: learn this
	// BlogPosting
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: t(blog.heading),
		description: t(blog.meta.description),
		image: `${BASE_URL}${blog.img}`,
		datePublished: blog.date,
		dateModified: blog.date,
		inLanguage: locale,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${BASE_URL}/${locale}/blog/${slug}`,
		},
		author: { "@id": `${BASE_URL}/#organization` },
		publisher: { "@id": `${BASE_URL}/#organization` },
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			></script>
			<main>
				<Container>
					<Breadcrumbs
						title={t(blog.heading)}
						previousTitle={t("nav.blog")}
						previousUrl="/blog"
						homeTitle={t("home_title")}
					/>
					<div className="blog-page">
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span className="blog-page__reading-time">
								{t(blog.readingTime)}
							</span>
							<span className="blog-page__date">
								{getUpdatedDate(blog.date)}
							</span>
						</div>
						<h1 className="blog-page__heading">{t(blog.heading)}</h1>
						<p>{t(blog.description)}</p>
						<div className="blog-page__img-wrapper">
							<img className="blog-page__img" src={blog.img} alt="" />
						</div>
						<p>{t(blog.body.intro)}</p>
						{blog.body.sections.map((s, i) => {
							return (
								<section key={i}>
									<h2 className="blog-page__section-heading">{t(s.heading)}</h2>
									<p>{t(s.text)}</p>
								</section>
							);
						})}
					</div>
					<aside className="blog-page__cta">
						<p className="blog-page__cta-text">{t(blog.body.cta.text)}</p>
						<div className="blog-page__cta-actions">
							<Link href="/#contacts" className="blog-page__cta-link">
								{t("requestPrice")}
							</Link>
							<Link
								href={blog.body.cta.productLink}
								className="blog-page__cta-link"
							>
								{t(blog.body.cta.productLinkLabel)}
							</Link>
						</div>
					</aside>
				</Container>
			</main>
		</>
	);
}
