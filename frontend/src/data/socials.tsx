import type { ComponentType } from "react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

interface Social {
	title: string;
	url: string;
	// TODO: LEARN THIS
	Icon: ComponentType<{ size?: number }>;
}

export const socials: Social[] = [
	{
		title: "Facebook",
		url: "https://www.facebook.com/profile.php?id=61584019674019",
		Icon: FacebookIcon,
	},
	{
		title: "LinkedIn",
		url: "https://www.linkedin.com/company/yagoda-karpat",
		Icon: LinkedinIcon,
	},

	{
		title: "YouTube",
		url: "https://www.youtube.com/@YagodaKarpat",
		Icon: YoutubeIcon,
	},
];
