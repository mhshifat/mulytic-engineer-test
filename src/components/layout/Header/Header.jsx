import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<div className={styles.header}>
			<Link className={styles.headerLink} to="/">
				Home
			</Link>
			<Link className={styles.headerLink} to="/awards">
				Awards
			</Link>
		</div>
	);
}
