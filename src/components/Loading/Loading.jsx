import styles from "./Loading.module.scss";
import { useEffect } from "react";
const Loading = () => {
	return (
		<div className={styles["loading"]}>
			<div className={styles["element-container"]}>
				<div className={styles["element1"]}></div>
				<div className={styles["element2"]}></div>
				<div className={styles["element3"]}></div>
				<div className={styles["element4"]}></div>
				<div className={styles["element5"]}></div>
				<div className={styles["element6"]}></div>
				<div className={styles["element7"]}></div>
			</div>
			<div className={styles["curtain1"]}></div>
			<div className={styles["curtain2"]}></div>
		</div>
	);
};

export default Loading;
