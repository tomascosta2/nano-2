'use client';

import { useEffect } from "react";

export default function Calendly() {

	const TESTIMONIALS = [
		{
			img: '',
			nombre: 'Nombre y Apellido',
			dato: 'PUESTO || UBICACIÓN || EDAD',
			texto: 'Testimonio acá. Lorem ipsum dolor latem '
		},
		{
			img: '',
			nombre: 'Nombre y Apellido',
			dato: 'PUESTO || UBICACIÓN || EDAD',
			texto: 'Testimonio acá. Lorem ipsum dolor latem '
		},
		{
			img: '',
			nombre: 'Nombre y Apellido',
			dato: 'PUESTO || UBICACIÓN || EDAD',
			texto: 'Testimonio acá. Lorem ipsum dolor latem '
		},
	]

	const name = localStorage.getItem("name")
	const email = localStorage.getItem("email")
	const phone = localStorage.getItem("phone")

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		const handleCalendlyEvent = (e: MessageEvent) => {

			if (e.origin !== "https://calendly.com") return;

			if (e.data.event === "calendly.event_scheduled") {
				const isQualified = localStorage.getItem("isQualified");

				console.log("CALIFICADO: ", e)

				const fbp = localStorage.getItem("_fbp");
				const fbc = localStorage.getItem("_fbc");

				if (isQualified === "true") {
					// if (true) {
					fetch("/api/track/qualified-shedule", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							eventName: "Schedule",
							email,
							phone,
							fbp,
							fbc,
							eventId: `schedule-${Date.now()}`, // único
						}),
					});
				}

				setTimeout(() => {
					window.location.href = '/pages/thankyou'; // Cambia la ruta a la de tu página de agradecimiento
				}, 800);
			}
		};

		window.addEventListener("message", handleCalendlyEvent);

		return () => window.removeEventListener("message", handleCalendlyEvent);
	}, []);

	return (
		<main>
			<section className="pt-8 pb-[80px]">
				<div className="max-w-[1200px] mx-auto px-4">
					<h1
						className="text-[24px] md:text-[32px] font-bold leading-[120%] max-w-[800px] mb-8 mx-auto text-center"
					>
						<span className="text-[#fbff00]">Último paso!</span> Elegí una fecha y hora que te queden cómodas y empezá hoy mismo!
					</h1>
					{/* Ej de [DESEO]: "cambios tan increibles en poco tiempo" */}
					<div className="grid md:grid-cols-2 gap-8">
						<div className="md:-order-1 order-2">
							<h2 className="text-[20px] sm:text-[28px] font-bold leading-[120%] mb-6 sm:mb-8 text-white">
								Nuestros clientes bajan entre 6 y 15 kg de grasa corporal en 3
								meses. <span className="underline">Vos también podés</span>.
								Agenda una llamada y vamos a hablar de:
							</h2>
							<ul className="mb-8 text-[18px]">
								<li>✅ Cómo bajar de peso sin dietas extremas ni rutinas imposibles</li>
								<li>✅ El método para hombres ocupados que garantiza resultados visibles y duraderos</li>
								<li>✅ Cómo mantener los resultados a largo plazo sin morir en el intento</li>
							</ul>
							<p className="text-[15px] sm:text-[18px] text-white">
								Te <strong>garantizamos</strong> que te vas con ideas claras
								de cómo bajar de peso de un experto certificado.
							</p>
							<div className="mt-8 hidden md:block">
								<img className="h-[40px]" src="/images/reviews-nano.png" alt="Nano Ponce Fitness" />
							</div>
						</div>
						{/* CALENDLY 1 (USE A PERSON PHOTO AND NAME - NO LOGO) */}
						<div className="bg-white w-full min-h-[600px] rounded-lg overflow-clip">
							<div
								className="calendly-inline-widget"
								data-url={`https://calendly.com/marianoponce2002/45min?hide_gdpr_banner=1&name=${name}&email=${email}`}
								style={{ minWidth: "320px", height: "800px" }}
							></div>
						</div>
						<div className="mt-8 md:hidden block mx-auto">
							<img className="h-[40px]" src="/images/reviews-nano.png" alt="Nano Ponce Fitness" />
						</div>
					</div>
				</div>
			</section>
			{/* <section className="pb-[60px]">
				<div className="max-w-[1200px] mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-4">
						{
							TESTIMONIALS.map((item) => {
								return (
									<div className="border border-white/20 rounded-lg p-8">
										<div className="flex gap-4 items-center">
											<img src={item.img} className="size-[70px] bg-gray-300 rounded-full" />
											<div>
												<h3 className="text-white text-[20px] font-semibold">{item.nombre}</h3>
												<p className="text-[14px] text-white/80 mt-2">{item.dato}</p>
											</div>
										</div>
										<p className="mt-4">
											"{item.texto}"
										</p>
									</div>
								)
							})
						}
					</div>
				</div>
			</section> */}

			<section className="px-4">
				<div className="max-w-[1200px] mx-auto px-4 border-t border-b border-[#fbff00] py-[40px]">
					<h2 className="text-center italic mb-8 text-[24px] font-bold">Nuestros clientes ven:</h2>
					<div className="text-[16px] sm:text-[24px] font-semibold text-white text-center flex flex-col sm:flex-row justify-between w-full sm:w-fit mx-auto gap-6 sm:gap-20">
						<h3 className="text-center max-w-[290px] mx-auto">
							Reduccion de entre 5 y 15 kg de grasa corporal
						</h3>
						<h3 className="text-center max-w-[290px] mx-auto">
							Aumento de confianza en si mismos
						</h3>
						<h3 className="text-center max-w-[290px] mx-auto">
							Aumento drastico de energia en el dia a dia
						</h3>
					</div>
				</div>
			</section>

			{/* VERY CREDIBLE SOCIAL PROOF */}
			{/* 
				* Mateo Falco -17 kg en 3 meses 
				* ⁠Agustín Santoro -6 en 1 mes
				* ⁠Cristian Ponce -4 kg en 1 mes
				* ⁠Mauricio Cano -5 kg en 1 mes
				* ⁠Siro González -5,5 kg en - mes
				* Mateo Tombesi -8 kg en 2 meses
			*/}
			<section className="py-[40px] px-4">
				<div className="max-w-[1200px] mx-auto">
					<div className="grid md:grid-cols-3 gap-4 mt-8">
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* Mateo Falco */}
								-17 KG en 3 Meses
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-1.webp" alt="Nano Ponce Fit - Cambio 1" />
						</div>
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* ⁠Agustín Santoro */}
								-6 KG en 1 Mes
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-2.webp" alt="Nano Ponce Fit - Cambio 2" />
						</div>
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* Cristian Ponce */}
								-4 KG en 1 Mes
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-3.webp" alt="Nano Ponce Fit - Cambio 3" />
						</div>
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* ⁠Mauricio Cano */}
								-5 KG en 1 Mes
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-4.webp" alt="Nano Ponce Fit - Cambio 3" />
						</div>
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* Siro González */}
								-5.5 KG en menos de 1 Mes
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-5.webp" alt="Nano Ponce Fit - Cambio 3" />
						</div>
						<div>
							<p className="text-center py-2 bg-[#fbff00] text-black font-semibold">
								{/* Mateo Tombesi */}
								-8 KG en 2 Meses
							</p>
							<img className="w-full h-[290px] max-h-full object-cover" src="/images/testimonios/testimonio-6.webp" alt="Nano Ponce Fit - Cambio 3" />
						</div>
					</div>
				</div>
			</section>

			<section className="px-4">
				<div className="max-w-[1200px] mx-auto py-[40px]">
					{/* CALENDLY 2 (USE A PERSON PHOTO AND NAME - NO LOGO) */}
					<div
						className="calendly-inline-widget"
						data-url="https://calendly.com/marianoponce2002/45min?hide_gdpr_banner=1"
						style={{ minWidth: "100%", height: "800px" }}
					></div>
				</div>
			</section>
		</main>
	)

}