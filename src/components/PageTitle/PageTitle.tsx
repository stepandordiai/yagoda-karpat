import "./PageTitle.scss";

interface PageTitleProps {
	name: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ name }) => {
	return <h2 className="page-title">{name}</h2>;
};

export default PageTitle;
