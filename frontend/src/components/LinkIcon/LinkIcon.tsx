import "./LinkIcon.scss";

type LinkIconProps = {
	url: string;
	title: string;
	icon: React.ReactNode;
};

const LinkIcon = (props: LinkIconProps) => {
	return (
		<a
			className="link-icon"
			href={props.url}
			title={props.title}
			target="_blank"
		>
			{props.icon}
		</a>
	);
};

export default LinkIcon;
