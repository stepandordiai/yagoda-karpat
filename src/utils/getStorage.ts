const getStorage = () => {
	return localStorage.getItem("i18nextLng") || "uk";
};

export default getStorage;
