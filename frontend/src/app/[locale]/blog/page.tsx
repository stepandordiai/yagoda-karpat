import Container from "@/components/Container/Container";
import posts from "@/data/posts.json";
import BlogCard from "@/components/BlogCard/BlogCard";
import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import "./styles.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	const url = `/${locale}/blog`;

	return {
		title: t("blog.meta.title"),
		description: t("blog.meta.description"),
		alternates: {
			canonical: url,
			languages: {
				en: "/en/blog",
				uk: "/uk/blog",
				cs: "/cs/blog",
				"x-default": "/uk/blog",
			},
		},
		openGraph: {
			type: "website",
			title: t("blog.meta.title"),
			description: t("blog.meta.description"),
			url,
			siteName: "Yagoda Karpat",
			locale,
			images: [
				{
					url: "/yagoda-karpat-og.png",
					width: 1200,
					height: 630,
				},
			],
		},
	};
}

export default async function Blog({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	const t = await getTranslations({ locale });

	// TODO: learn this
	// Blog
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		"@id": `${BASE_URL}/${locale}/blog`,
		name: t("blog.meta.title"),
		description: t("blog.meta.description"),
		inLanguage: locale,
		publisher: { "@id": `${BASE_URL}/#organization` },
		blogPost: posts.map((p) => ({
			"@type": "BlogPosting",
			headline: t(p.heading),
			url: `${BASE_URL}/${locale}/blog/${p.slug}`,
			datePublished: p.date,
			image: `${BASE_URL}${p.img}`,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			></script>
			<main>
				<Container>
					<Breadcrumbs title={t("nav.blog")} homeTitle={t("home_title")} />
					<h1 className="main__heading">{t("blog.heading")}</h1>
					<p style={{ marginBottom: "10px" }}>{t("blog.subheading")}</p>
					<div className="blog-grid">
						{posts.map((p) => {
							return <BlogCard key={p.slug} post={p} />;
						})}
					</div>
				</Container>
			</main>
		</>
	);
}
