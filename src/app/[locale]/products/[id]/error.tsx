"use client";

import { useEffect } from "react";

const Error = ({ error }: { error: Error }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return <p>Error cant show product</p>;
};

export default Error;
