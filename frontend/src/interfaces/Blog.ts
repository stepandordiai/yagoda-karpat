interface BlogCTA {
	text: string;
	productLink: string;
	productLinkLabel: string;
}

interface BlogMeta {
	title: string;
	description: string;
	category: string;
	coverImage?: string;
}

interface BlogBody {
	intro: string;
	cta: BlogCTA;
}

export default interface Blog {
	meta: BlogMeta;
	slug: string;
	img: string;
	heading: string;
	description: string;
	date: string;
	readingTime: string;
	body: BlogBody;
}
