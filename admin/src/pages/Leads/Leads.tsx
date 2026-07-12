import { supabase } from "../../lib/supabase";
import { useEffect, useRef, useState } from "react";
import EditIcon from "../../components/icons/EditIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import type { Lead } from "../../interfaces/Lead";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import DotsIcon from "../../components/icons/DotsIcon";
import XLgIcon from "../../components/icons/XLgIcon";
import "./styles.scss";

const EMPTY_FORM: Lead = {
	id: "",
	name: "",
	company: "",
	country: "",
	email: "",
	requested_product: "",
	quantity: "",
	message: "",
	created_at: new Date(),
	updated_at: new Date(),
};

type LeadsProps = {
	leads: Lead[];
	load: () => Promise<void>;
	setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
};

const Leads = ({ leads, load }: LeadsProps) => {
	const [isNew, setIsNew] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState<null | string>(null);
	const [filter, setFilter] = useState("");
	const [deleteModal, setDeleteModal] = useState(false);
	const [idToDelete, setIdToDelete] = useState("");
	const [formLoading, setFormLoading] = useState(false);
	const [editable, setEditable] = useState(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	// TODO: learn this
	const filteredLeads = leads.filter((lead) =>
		Object.values(lead).some((value) =>
			String(value).toLowerCase().includes(filter.toLowerCase()),
		),
	);

	const [currentPage, setCurrentPage] = useState(1);

	// Supabase
	// TODO: LEARN THIS
	const insertLead = async (data: Lead) => {
		setError(null);
		setFormLoading(true);

		try {
			const { id, created_at, updated_at, ...rest } = data;

			const { error } = await supabase.from("leads").insert([rest]);

			// exists in both — show error
			if (error?.code === "23505") {
				setError("Лід з таким номером вже існує");
				return false;
			}

			// handle unexpected errors
			if (error && error.code !== "23505") {
				console.error("DB1:", error.message);
				return false;
			}

			// notify telegram
			fetch(`${import.meta.env.VITE_NOTIFY_URL}/api/notify-lead`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(rest),
			}).catch(() => {});

			return true;
		} finally {
			setFormLoading(false);
		}
	};

	const updateLead = async (id: string, data: Lead) => {
		setError(null);
		setFormLoading(true);

		try {
			const { id: _, created_at, updated_at, ...rest } = data;
			const { error } = await supabase.from("leads").update(rest).eq("id", id);

			if (error) {
				if (error.code === "23505") setError("Лід з таким номером вже існує");
				else console.error("Insert error:", error.message);
				return false;
			}

			return true;
		} finally {
			setFormLoading(false);
		}
	};

	const deleteLead = async (id: string) => {
		const { error } = await supabase.from("leads").delete().eq("id", id);
		if (error) console.error("Delete error:", error.message);
		else load();
	};

	// FIXME:
	const handleSave = async (form: any) => {
		if (isNew) {
			const ok = await insertLead(form);
			if (!ok) return;
		} else {
			await updateLead(form.id, form);
		}
		setIsNew(false);
		setEditable(false);
		await load();
	};

	const handleDelete = () => {
		deleteLead(idToDelete);
		setIdToDelete("");
		setDeleteModal(false);
		setModalVisible(false);
		setForm(EMPTY_FORM);
	};

	const totalPages = Math.ceil(leads.length / 50);

	useEffect(() => {
		if (!containerRef.current) return;
		containerRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [currentPage]);

	return (
		<>
			<div className={`modal ${modalVisible ? "modal--visible" : ""}`}>
				<button
					style={{ alignSelf: "flex-end", position: "sticky", top: "0px" }}
					className="close-btn"
					onClick={() => {
						setModalVisible(false);
						setForm(EMPTY_FORM);
						setEditable(false);
						setIsNew(false);
					}}
				>
					<XLgIcon />
				</button>
				<p className="form__title">{isNew ? "Створити лід" : "Змінити лід"}</p>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!isNew && (
					<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
						<div>
							<p className="form__label">Створено</p>
							<p>
								{new Date(form.created_at).toLocaleDateString()}{" "}
								{new Date(form.created_at).toLocaleTimeString()}
							</p>
						</div>
						<div>
							<p className="form__label">Оновлено</p>
							<p>
								{new Date(form.updated_at).toLocaleDateString()}{" "}
								{new Date(form.updated_at).toLocaleTimeString()}
							</p>
						</div>
					</div>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSave(form);
					}}
				>
					<div className="input-container">
						<label className="form__label" htmlFor="name">
							Імя
						</label>
						<input
							id="name"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, name: e.target.value }))
							}
							value={form.name}
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="company">
							Компанія
						</label>
						<input
							id="company"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, company: e.target.value }))
							}
							value={form.company}
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="country">
							Країна
						</label>
						<input
							id="country"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, country: e.target.value }))
							}
							value={form.country}
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, email: e.target.value }))
							}
							value={form.email}
							type="email"
							disabled={!editable}
						/>
					</div>
					<div className="input-container">
						<label className="form__label" htmlFor="product">
							Продукт
						</label>
						<input
							id="product"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									requested_product: e.target.value,
								}))
							}
							value={form.requested_product}
							type="text"
							disabled={!editable}
						/>
					</div>

					<div className="input-container">
						<label className="form__label" htmlFor="quantity">
							Кількість
						</label>
						<input
							id="quantity"
							className={`input ${!editable ? "input--disabled" : ""}`}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, quantity: e.target.value }))
							}
							value={form.quantity}
							type="text"
							disabled={!editable}
						/>
					</div>
					<div className={"input-container"}>
						<label className="form__label" htmlFor="message">
							Повідомлення
						</label>
						<textarea
							id="message"
							className={`textarea ${!editable ? "textarea--disabled" : ""}`}
							rows={9}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, message: e.target.value }))
							}
							value={form.message}
							maxLength={600}
							disabled={!editable}
						/>
						<span className="input-indicator">{form.message.length} / 600</span>
					</div>
					{!editable && !isNew && (
						<div
							style={{
								display: "flex",
								gap: "5px",
								alignSelf: "flex-end",
								position: "sticky",
								bottom: "0px",
							}}
						>
							<button
								type="button"
								className="update-btn"
								onClick={() => setEditable(true)}
							>
								<EditIcon />
							</button>
							<button
								type="button"
								className="delete-btn"
								onClick={() => {
									(setDeleteModal(true), setIdToDelete(form.id));
								}}
							>
								<TrashIcon />
							</button>
						</div>
					)}

					{(editable || isNew) && (
						<div
							style={{
								alignSelf: "flex-end",
								display: "flex",
								gap: "5px",
								position: "sticky",
								bottom: "0px",
							}}
						>
							{!isNew && (
								<button
									type="button"
									className="form__cancel-btn"
									onClick={() => setEditable(false)}
								>
									Скасувати
								</button>
							)}
							<button className="form__submit-btn" type="submit">
								{formLoading
									? isNew
										? "Створення..."
										: "Збереження..."
									: isNew
										? "Створити"
										: "Змінити"}
							</button>
						</div>
					)}
				</form>
			</div>
			<div
				onClick={() => {
					setModalVisible(false);
					setDeleteModal(false);
					setIsNew(false);
					setIdToDelete("");
					setForm(EMPTY_FORM);
					setEditable(false);
				}}
				className={`main-curtain ${modalVisible || deleteModal ? "main-curtain--visible" : ""}`}
			></div>
			<div
				className={`delete-modal ${deleteModal ? "delete-modal--visible" : ""}`}
			>
				<strong>Ви точно хочете видалити цей запис?</strong>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: "10px",
					}}
				>
					<button
						onClick={() => {
							setIdToDelete("");
							setDeleteModal(false);
						}}
						style={{
							height: "40px",
							padding: "0 10px",
							borderRadius: "20px",
							background: "#000",
							color: "#fff",
							fontWeight: 600,
						}}
					>
						Скасувати
					</button>
					<button
						style={{
							height: "40px",
							padding: "0 10px",
							borderRadius: "20px",
							background: "rgb(222, 92, 77)",
							color: "#fff",
							fontWeight: 600,
						}}
						onClick={() => handleDelete()}
					>
						Підтвердити
					</button>
				</div>
			</div>
			<main className="main">
				<Menu />
				<h1 className="main__title">Ліди</h1>
				<div ref={containerRef} className="container">
					<div
						style={{
							position: "sticky",
							top: "0px",
							padding: "10px 0",
							background: "#fff",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<input
							className="search-input"
							onChange={(e) => setFilter(e.target.value)}
							value={filter}
							type="text"
							placeholder="Пошук"
						/>
						<button
							className="create-btn"
							onClick={() => {
								setIsNew(true);
								setModalVisible(true);
								setEditable(true);
							}}
						>
							Новий лід
						</button>
					</div>
					<table>
						<thead>
							<tr>
								<th style={{ width: "1%" }}>№</th>
								<th>Ім'я</th>
								<th>Компанія</th>
								<th>Країна</th>
								<th>Email</th>
								<th>Продукт</th>
								<th>К-сть</th>
								<th style={{ width: "1%" }}>Опції</th>
							</tr>
						</thead>
						<tbody>
							{filteredLeads
								.slice((currentPage - 1) * 50, currentPage * 50)
								.map((l, i) => {
									const number = (currentPage - 1) * 50 + i + 1;

									const now = new Date();

									const diffMs =
										now.getTime() - new Date(l.created_at).getTime();

									const diffDays = diffMs / (1000 * 60 * 60 * 24);

									return (
										<tr
											key={l.id}
											className={diffDays <= 3 ? "leads-tr--new" : ""}
										>
											<td style={{ width: "1%" }}>{number}</td>
											<td style={{ width: "1%", whiteSpace: "nowrap" }}>
												{l.name}
											</td>
											<td>{l.company}</td>
											<td>{l.country}</td>
											<td>{l.email}</td>
											<td>{l.requested_product}</td>
											<td>{l.quantity}</td>
											<td style={{ width: "1%" }}>
												<button
													className="update-btn"
													onClick={() => {
														setForm(l);
														setModalVisible(true);
													}}
												>
													<DotsIcon />
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							background: "white",
							padding: "10px 0",
							marginTop: "auto",
						}}
					>
						<div style={{ display: "flex", gap: "5px" }}>
							<p
								style={{
									background: "var(--bg-clr)",
									padding: "10px",
									borderRadius: "10px",
									fontWeight: "500",
								}}
							>
								{(currentPage - 1) * 50 + 1} -{" "}
								{Math.min(currentPage * 50, filteredLeads.length)}
							</p>
							<p
								style={{
									background: "var(--bg-clr)",
									padding: "10px",
									borderRadius: "10px",
									fontWeight: "500",
								}}
							>
								Всього: {filteredLeads.length}
							</p>
						</div>
						<Pagination
							totalPages={totalPages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Leads;
