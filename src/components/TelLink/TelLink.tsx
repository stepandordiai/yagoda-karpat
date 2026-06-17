import { reportConversion } from "@/lib/gtagReportConversion";
import { CONVERSIONS } from "@/lib/conversions";

type PhoneLinkProps = {
	tel: string;
	className?: string;
	title?: string;
	children: React.ReactNode;
};

export default function TelLink({
	tel,
	className,
	title,
	children,
}: PhoneLinkProps) {
	return (
		<a
			href={`tel:${tel}`}
			className={className}
			onClick={() => reportConversion(CONVERSIONS.call)}
			title={title}
		>
			{children}
		</a>
	);
}
