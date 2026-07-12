import Menu from "../../components/Menu/Menu";
import "./Home.scss";

const Home = () => {
	return (
		<main className="main">
			<Menu />
			<h1 className="main__title">Головна</h1>
			<div className="home-inner">
				<h2 style={{ fontSize: "1.5rem" }}>Ліди</h2>
				<div style={{ background: "#fff", borderRadius: "25px" }}>
					{/* <Chart
						items={leads}
						stats={[
							{
								label: "Чоловік",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.gender === "Чоловік",
							},
							{
								label: "Жінка",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.gender === "Жінка",
							},
							{
								label: "Інше",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.gender !== "Чоловік" && l.gender !== "Жінка",
							},
						]}
						label="Кількість"
					/> */}
				</div>
				<div style={{ background: "#fff", borderRadius: "25px" }}>
					{/* <Chart
						items={leads}
						stats={[
							{
								label: "Новий",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.status === "Новий",
							},
							{
								label: "Знайшов роботу",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.status === "Знайшов роботу",
							},
							{
								label: "Працює",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.status === "Працює",
							},
							{
								label: "Неактивний",
								color: "var(--sec-accent-clr)",
								filter: (l) => l.status === "Неактивний",
							},
						]}
						label="Кількість"
					/> */}
				</div>
				<div style={{ background: "#fff", borderRadius: "25px" }}>
					{/* <Chart
						items={leads}
						stats={[
							{
								label: "Telegram",
								color: "var(--sec-accent-clr)",
								filter: (l) =>
									l.messengers.some(
										(m) => m.name === "telegram" && m.isAvailable,
									),
							},
							{
								label: "Whatsapp",
								color: "var(--sec-accent-clr)",
								filter: (l) =>
									l.messengers.some(
										(m) => m.name === "whatsapp" && m.isAvailable,
									),
							},
							{
								label: "Viber",
								color: "var(--sec-accent-clr)",
								filter: (l) =>
									l.messengers.some((m) => m.name === "viber" && m.isAvailable),
							},
						]}
						label="Кількість"
					/> */}
				</div>
			</div>
		</main>
	);
};

export default Home;
