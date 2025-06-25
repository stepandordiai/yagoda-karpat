import "./SectionTitle.scss";

type SectionTitleProps = {
	name: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ name }) => {
	return <h2 className="section-title">{name}</h2>;
};

export default SectionTitle;
