import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Leads from "./pages/Leads/Leads";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Lead } from "./interfaces/Lead";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./scss/App.scss";

function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [session, setSession] = useState<Session | null>(null);
	const [authLoading, setAuthLoading] = useState(true);

	// TODO: LEARN THIS
	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setAuthLoading(false);
		});

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			},
		);

		return () => listener.subscription.unsubscribe();
	}, []);

	const loadLeads = async () => {
		const { data } = await supabase.from("leads").select("*");
		// .order("updated_at", { ascending: false });
		setLeads(data ?? []);
	};

	useEffect(() => {
		if (session) {
			loadLeads();
		}
	}, [session]);

	// TODO: learn this
	if (authLoading) return null;

	return (
		<Router>
			<Routes>
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route
					path="/login"
					element={!session ? <Login /> : <Navigate to="/" replace />}
				/>
				<Route
					path="/*"
					element={
						!session ? (
							<Navigate to="/login" replace />
						) : (
							<div className="layout">
								<Sidebar />
								<Routes>
									<Route path="/" element={<Home />} />
									<Route
										path="/leads"
										element={
											<Leads
												leads={leads}
												setLeads={setLeads}
												load={loadLeads}
											/>
										}
									/>
								</Routes>
							</div>
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
