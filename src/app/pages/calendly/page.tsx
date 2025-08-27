'use client';
import { useEffect, useMemo, useState } from "react";

export default function CalendlyFast() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [frameLoaded, setFrameLoaded] = useState(false);

	// Cargar prefill desde localStorage
	useEffect(() => {
		setName(localStorage.getItem('name') || '');
		setEmail(localStorage.getItem('email') || '');
		setPhone(localStorage.getItem('phone') || '');
	}, []);

	// Listener de eventos de Calendly (funciona igual con iframe)
	useEffect(() => {
		const handleCalendlyEvent = (e: MessageEvent) => {
			if (e.origin !== "https://calendly.com") return;

			if (e.data?.event === "calendly.event_scheduled") {

				// https://hook.us2.make.com/2a7gkby3xtgo4annvy16nbu74laekhem

				fetch('https://hook.us2.make.com/jxwzmi4n62c3nfmie24ti5aoe4o8ukuk', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email
					}),
				}).catch(err => console.error('Tracking error:', err));

				const isQualified = localStorage.getItem("isQualified");
				const fbp = localStorage.getItem("_fbp");
				const fbc = localStorage.getItem("_fbc");

				// Envío del evento a tu API sólo si calificado
				if (isQualified === "true") {
					fetch("/api/track/qualified-shedule", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							eventName: "Schedule",
							email,
							phone,
							fbp,
							fbc,
							eventId: `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
						}),
					});
				}

				// Redirección a Thank You
				setTimeout(() => {
					window.location.href = "/pages/thankyou";
				}, 600);
			}
		};

		window.addEventListener("message", handleCalendlyEvent);
		return () => window.removeEventListener("message", handleCalendlyEvent);
	}, [email, phone]);

	// Construir la URL de Calendly sin widget.js
	const calendlyUrl = useMemo(() => {
		const base = "https://calendly.com/marianoponce2002/45min";
		const params = new URLSearchParams({
			hide_gdpr_banner: "1",
			embed_type: "InlineWidget",
			embed_domain: typeof window !== "undefined" ? window.location.hostname : "",
			name,
			email,
			// Opcionales (pueden ahorrar recursos visuales):
			// hide_landing_page_details: "1",
			// hide_event_type_details: "1",
			// text_color: "000000",
			// primary_color: "fbff00",
		});
		return `${base}?${params.toString()}`;
	}, [name, email]);

	return (
		<main>
			{/* HERO + contenido tuyo igual que antes… */}
			<section className="pt-8 pb-[80px]">
				<div className="max-w-[1200px] mx-auto px-4">
					<h1 className="text-[24px] md:text-[32px] font-bold leading-[120%] max-w-[800px] mb-8 mx-auto text-center">
						<span className="text-[#fbff00]">¡Último paso!</span> Elegí una fecha y hora que te queden cómodas y empezá hoy mismo!
					</h1>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Columna de textos (igual que la tuya) */}
						<div className="md:-order-1 order-2">
							<h2 className="text-[20px] sm:text-[28px] font-bold leading-[120%] mb-6 sm:mb-8 text-white">
								Nuestros clientes bajan entre 6 y 15 kg de grasa corporal en 3 meses. <span className="underline">Vos también podés</span>. Agenda una llamada y vamos a hablar de:
							</h2>
							<ul className="mb-8 text-[18px]">
								<li>✅ Cómo bajar de peso sin dietas extremas ni rutinas imposibles</li>
								<li>✅ El método para hombres ocupados que garantiza resultados visibles y duraderos</li>
								<li>✅ Cómo mantener los resultados a largo plazo sin morir en el intento</li>
							</ul>
							<p className="text-[15px] sm:text-[18px] text-white">
								Te <strong>garantizamos</strong> que te vas con ideas claras de cómo bajar de peso de un experto certificado.
							</p>
							<div className="mt-8 hidden md:block">
								<img className="h-[40px]" src="/images/reviews-nano.png" alt="Nano Ponce Fitness" />
							</div>
						</div>

						{/* Calendly ultra rápido con iframe directo */}
						<div className="bg-white w-full min-h-[600px] rounded-lg overflow-clip relative">
							{/* Skeleton para percepción instantánea */}
							{!frameLoaded && (
								<div className="absolute inset-0 animate-pulse bg-gray-100">
									<div className="h-10 w-3/4 mx-auto mt-6 rounded bg-gray-200" />
									<div className="h-6 w-1/2 mx-auto mt-4 rounded bg-gray-200" />
									<div className="h-[560px] mt-6 mx-4 rounded-lg bg-gray-200" />
								</div>
							)}

							<iframe
								key={calendlyUrl} // fuerza refresh si cambian name/email
								title="Calendly Inline"
								src={calendlyUrl}
								loading="eager"                  // carga inmediata
								width="100%"
								height="800"
								className="w-full h-[800px] border-0"
								onLoad={() => setFrameLoaded(true)}
								// Nota: no uses sandbox aquí; Calendly requiere ejecutar scripts dentro del iframe
								referrerPolicy="no-referrer-when-downgrade"
								allow="clipboard-write; geolocation; microphone; camera"
							/>
						</div>

						<div className="mt-8 md:hidden block mx-auto">
							<img className="h-[40px]" src="/images/reviews-nano.png" alt="Nano Ponce Fitness" />
						</div>
					</div>
				</div>
			</section>
		</main>
	)

}