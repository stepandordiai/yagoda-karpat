// TODO: LEARN THIS
const ALLOWED_ORIGIN = "https://yagodakarpat-admin.netlify.app";

export async function OPTIONS() {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": ALLOWED_ORIGIN,
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

export async function POST(req: Request) {
	const lead = await req.json();

	const text =
		`🆕 Новий лід (yagodakarpat.com)\n\n` +
		`Імʼя: ${lead.name ?? "—"}\n` +
		`Компанія: ${lead.company ?? "—"}\n` +
		`Країна: ${lead.country ?? "—"}\n` +
		`Email: ${lead.email ?? "—"}\n` +
		`Продукт: ${lead.product ?? "—"}\n` +
		`Кількість: ${lead.quantity ?? "—"}\n` +
		`Повідомлення: ${lead.message ?? "—"}`;

	await fetch(
		`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
		},
	);

	return Response.json(
		{ ok: true },
		{
			headers: {
				"Access-Control-Allow-Origin": ALLOWED_ORIGIN,
			},
		},
	);
}
