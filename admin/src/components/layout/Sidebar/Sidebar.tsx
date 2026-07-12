import { NavLink } from "react-router-dom";
import HouseIcon from "../../icons/HouseIcon";
import PeopleIcon from "../../icons/PeopleIcon";
import { supabase } from "../../../lib/supabase";
import "./styles.scss";

const Sidebar = () => {
	// TODO: LEARN THIS
	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<aside className="sidebar">
			<NavLink className="sidebar__logo" to="/">
				<span>Yagoda Karpat (admin)</span>
			</NavLink>
			<nav className="sidebar-nav">
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to="/"
				>
					<HouseIcon />
					<span>Головна</span>
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`sidebar-nav__link ${isActive ? "sidebar-nav__link--active" : ""}`
					}
					to="/leads"
				>
					<PeopleIcon />
					<span>Ліди</span>
				</NavLink>
			</nav>

			<button className="logout-btn" onClick={handleLogout}>
				Вийти
			</button>
			<p>
				by{" "}
				<a
					href="https://www.heeeyooo.com/en"
					target="_blank"
					rel="noopener noreferrer"
				>
					heeeyooo studio
				</a>
			</p>
		</aside>
	);
};

export default Sidebar;
