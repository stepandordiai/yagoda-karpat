import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Container from "@/components/Container/Container";
import { getTranslations } from "next-intl/server";
import BusinessHours from "@/components/BusinessHours/BusinessHours";
import Map from "@/components/Map/Map";
import Faqs from "@/components/Faqs/Faqs";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import "./styles.scss";

const faqs = [
	{
		q: "Чи приймаєте малі обсяги?",
		a: "Так. Приймаємо сировину в будь-яких обсягах — і великі партії, і невеликі від збирачів.",
	},
	{
		q: "Коли я отримаю оплату?",
		a: "Одразу після здачі та перевірки сировини — готівкою або переказом на картку.",
	},
	{
		q: "Чи забираєте товар самі?",
		a: "За домовленістю та достатнього обсягу організовуємо самовивіз із вашого регіону.",
	},
	{
		q: "У якій тарі здавати?",
		a: "Бажано в пластмасових ящиках по 10 кг. Ми повертаємо вам чисту тару.",
	},
	{
		q: "З яких регіонів ви закуповуєте?",
		a: "З усієї України.",
	},
];

const PAGE = "for-suppliers";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${PAGE}`]),
	);

	const title = "Закуповуємо ягоди, гриби, фрукти по Україні | Ягода Карпат";
	const description =
		"Здаєте ягоди, гриби, фрукти чи овочі? Купуємо сировину по всій Україні — будь-які обсяги, справедлива ціна, швидка оплата, самовивіз.";

	return {
		title: title,
		description: description,
		alternates: {
			canonical: `/${locale}/${PAGE}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${PAGE}`,
			},
		},
		openGraph: {
			title: title,
			description: description,
			url: `/${locale}/${PAGE}`,
			type: "website",
			images: "/yagoda-karpat-og.png",
		},
	};
}

export default async function ForSuppliers() {
	const t = await getTranslations();

	return (
		<main>
			<Container>
				<div className="for-suppliers">
					<Breadcrumbs title="Постачальникам" />
					<section className="for-suppliers__hero">
						<div className="for-suppliers__hero-content">
							<h1 className="for-suppliers__hero-heading">
								Здаєте ягоди, гриби, фрукти чи овочі? Ми купуємо — по всій
								Україні.
							</h1>
							<p className="for-suppliers__hero-description">
								«Ягода Карпат» — прямий виробник і переробник. Закуповуємо
								сировину в фермерів, збирачів і кооперативів у будь-яких
								обсягах. Справедлива ціна, швидка оплата, за потреби забираємо
								товар самі.
							</p>
							<a
								href="tel:+380968065513"
								className="for-suppliers__primary-btn"
							>
								Зателефонувати
							</a>
						</div>
						<div className="for-suppliers__hero-img-wrapper">
							<img src="/for-suppliers.png" alt="" />
						</div>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">Що ми купуємо</h2>
						<p>Закуповуємо широкий перелік сировини протягом усього сезону:</p>
						<ul className="for-suppliers__list">
							<li>
								<h3>Дикорослі ягоди</h3>
								<ul>
									<li>Чорниця</li>
									<li>Брусниця</li>
									<li>Шипшина</li>
									<li>Бузина</li>
									<li>Чорна смородина</li>
									<li>Ожина</li>
								</ul>
							</li>
							<li>
								<h3>Культивовані ягоди та фрукти</h3>
								<ul>
									<li>Вишня</li>
									<li>Слива</li>
									<li>Абрикоси</li>
									<li>Виноград</li>
									<li>Аронія (чорноплідна горобина)</li>
								</ul>
							</li>
							<li>
								<h3>Гриби</h3>
								<ul>
									<li>Білі гриби</li>
									<li>Опеньки</li>
									<li>Лисички</li>
								</ul>
							</li>
							<li>
								<h3>Овочі</h3>
								<ul>
									<li>Болгарський перець (червоний, жовтий, зелений)</li>
									<li>Цукрова кукурудза</li>
								</ul>
							</li>
						</ul>
						<p>
							Не бачите у списку свого продукту? Зателефонуйте — розглянемо
							кожну пропозицію.
						</p>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">Умови прийому</h2>
						<ul className="for-suppliers__ul">
							<li>
								<span>Будь-які обсяги.</span> Приймаємо як великі партії від
								господарств, так і менші обсяги від збирачів.
							</li>
							<li>
								<span>Тара.</span> Бажано пластмасові ящики по 10 кг — це
								зберігає ягоду цілою, пришвидшує розвантаження, і ми повертаємо
								вам чисту тару.
							</li>
							<li>
								<span>Якість.</span> Сировина має бути свіжою, чистою, без
								псування та сторонніх домішок.
							</li>
							<li>
								<span>Сезонність.</span> Приймаємо за графіком дозрівання кожної
								культури.
							</li>
						</ul>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">Як відбувається співпраця</h2>
						<ol className="for-suppliers__ol">
							<li>
								<h3>Залиште заявку</h3>
								<p>
									Зателефонуйте або заповніть форму — вкажіть, що маєте,
									приблизний обсяг і свій регіон.
								</p>
							</li>
							<li>
								<h3>Узгоджуємо умови</h3>
								<p>
									Обговорюємо продукт, обсяг, якість і ціну. Відповідаємо
									швидко.
								</p>
							</li>
							<li>
								<h3>Доставка або самовивіз</h3>
								<p>
									Ви привозите сировину на наше виробництво, або — за
									домовленістю — ми забираємо товар самі.
								</p>
							</li>
							<li>
								<h3>Оплата</h3>
								<p>Розраховуємося одразу після здачі та перевірки сировини.</p>
							</li>
						</ol>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">Оплата</h2>
						<ul className="for-suppliers__ul">
							<li>Готівкою — одразу при здачі сировини</li>
							<li>На банківську картку — швидкий переказ</li>
						</ul>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">Географія закупівлі</h2>
						<p>
							Закуповуємо сировину по всій Україні. Наше виробництво розташоване
							в Закарпатті (с. Вільхівці, Тячівський район), але працюємо зі
							збирачами та фермерами з усіх регіонів. За потреби та достатнього
							обсягу — організовуємо самовивіз.
						</p>
					</section>
					<section className="for-suppliers__section">
						<h2 className="section__heading">
							Чому варто співпрацювати з нами
						</h2>
						<ul className="for-suppliers__ul">
							<li>
								<span>Прямий виробник, не посередник.</span> Працюєте
								безпосередньо з переробником — без ланцюжка перекупників.
							</li>
							<li>
								<span>Справедлива ціна.</span> Пропонуємо чесні закупівельні
								ціни за актуальним ринком.
							</li>
							<li>
								<span>Швидка оплата.</span> Готівка одразу або миттєвий переказ
								на картку.
							</li>
							<li>
								<span>Стабільний збут.</span> Купуємо сезон за сезоном — ви
								маєте надійного покупця щороку.
							</li>
							<li>
								<span>Забираємо самі.</span> За домовленістю організовуємо вивіз
								товару з вашого регіону.
							</li>
						</ul>
					</section>
					<div className="for-suppliers__container">
						<Map />
						<BusinessHours />
					</div>
				</div>
				<Faqs faqs={faqs} />
			</Container>
		</main>
	);
}
