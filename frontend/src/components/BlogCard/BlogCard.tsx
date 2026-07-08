import Blog from "@/interfaces/Blog";
import { Link } from "@/i18n/navigation";
import getUpdatedDate from "@/utils/getUpdatedDate";
import { getTranslations } from "next-intl/server";
import "./styles.scss";

type BlogCardProps = {
	post: Blog;
};

export default async function BlogCard({ post }: BlogCardProps) {
	const t = await getTranslations();

	return (
		<div className="blog-card">
			<div className="blog-card__img-wrapper">
				<span className="blog-card__reading-time">{t(post.readingTime)}</span>
				<span className="blog-card__date">{getUpdatedDate(post.date)}</span>
				<img className="blog-card__img" src={post.img} alt="" />
			</div>
			<h3 className="blog-card__heading">{t(post.heading)}</h3>
			<p>{t(post.description)}</p>
			<Link className="blog-card__link" href={`/blog/${post.slug}`}>
				{t("learnMore")}
			</Link>
		</div>
	);
}
