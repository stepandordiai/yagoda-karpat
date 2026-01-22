"use client";

import { useEffect } from "react";

// FIXME:
const Error = ({ error }: { error: Error }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return <p>Error cant show product</p>;
};

export default Error;
