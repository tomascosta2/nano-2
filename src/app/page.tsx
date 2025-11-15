'use client'
import Script from "next/script";
import { useRef, useState } from "react";
import CalificationForm from "./components/CalificationForm";
import CalificationFormDirect from "./components/CalificationFormDirect";

export default function Home() {

  const [isFormOpened, setIsFormOpened] = useState(false);

  const variantRef = useRef<'A' | 'B'>(Math.random() < 0.5 ? 'A' : 'B');
  const variant = variantRef.current;
  console.log(variant)

  const VIDEO_TESTIMONIALS = [
    {
      video: "https://fast.wistia.net/embed/iframe/eowyh45vlt?web_component=true&seo=true",
      titulo: "Mateo bajo 17 KG en SOLO 3 meses",
      story: "Antes me miraba de reojo y me veía espantoso... Son 90 días que me cambiaron la vida. Es un cambio gigante no solo para mi cuerpo, sino también para mi mentalidad.",
      nombre: "Mateo Falco",
      dato: "Buenos Aires, Argentina",
    },
  ];

  return (
    <div>
      {
        isFormOpened && (
          <CalificationFormDirect variant={variant} />
        )
      }
      <header className="bg-[#fbff00] max-w-[85%] w-[400px] rounded-full mt-8 md:mt-12 mx-auto">
        <div className="cf-container">
          <h3
            className="text-center text-black text-[14px] py-3 font-bold leading-[115%]"
          >
            Te exigis, te castigas, lo das todo… y aún así ¿no te reconoces frente al espejo?
          </h3>
        </div>
      </header>
      <section className="mt-6 md:mt-8 pb-[60px] md:pb-[80px]">
        <div className="cf-container">
          <h1 className="text-center text-[20px] md:text-[32px] font-bold leading-[120%]">
            {variant === 'A' && (
              <span>
                IMAGINATE BAJAR ENTRE <span className="text-[#fbff00]">6 Y 15 KG DE GRASA CORPORAL Y TONIFICAR EN 90 DÍAS</span> CON EL MÉTODO FIT90 - <span className="text-[#fbff00]">SIN DIETAS EXTREMAS NI RUTINAS IMPOSIBLES</span>
              </span>
            )}
            {variant === 'B' && (
              <span>
                BAJÁ ENTRE <span className="text-[#fbff00]">6 Y 15 KG DE GRASA CORPORAL Y TONIFICÁ EN 90 DÍAS</span> CON MI <span className="text-[#fbff00]">MÉTODO FIT90</span> - SIN DIETAS EXTREMAS NI RUTINAS IMPOSIBLES
              </span>
            )}
          </h1>
          <section className="relative">
            <div
              className="bg-[#fbff00] border-4 overflow-clip rounded-[12px] md:rounded-[16px] border-[#fbff00] mt-6 max-w-[750px] mx-auto"
            >
              <div className="p-1 md:p-2 text-center text-[14px] text-black font-bold bg-[#fbff00]">
                CLIC PARA ACTIVAR EL SONIDO
              </div>
              <div
                className="bg-[#fbff00] aspect-video rounded-[8px] md:rounded-[12px] overflow-clip"
              >
                <iframe className="w-full aspect-video" id="panda-f3e4e036-787b-4690-b86e-4fbac6bdd47f" src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com/embed/?v=f3e4e036-787b-4690-b86e-4fbac6bdd47f" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"></iframe>
              </div>
            </div>
          </section>
          <p className="mt-4 text-center text-[14px] md:text-[16px] max-w-[700px] mx-auto">
            Mirá el video completo, y aplicalo por tu cuenta o agenda una llamada para asegurar tu transformación.
          </p>
          <div className="mt-6">
            <button
              className="cf-btn"
              onClick={() => { setIsFormOpened(true) }}
            >
              QUIERO MI ASESORIA 1 A 1
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M6.41318 11.6364L5.09499 10.3296L8.55522 6.86932H0.447266V4.94887H8.55522L5.09499 1.49432L6.41318 0.181824L12.1404 5.9091L6.41318 11.6364Z"
                  fill="#111111"></path>
              </svg>
            </button>
            <p className="text-center mt-4 text-white/60 italic mx-auto max-w-[350px] text-[14px]">
              Cupos limitados - No te lo pierdas!
            </p>
          </div>
        </div>
      </section>

      <section className="py-[40px] relative z-20">
        <div className="cf-container">
          <h2
            className="text-[28px] font-bold text-white text-center uppercase max-w-[500px] leading-[120%] mx-auto"
          >
            MATEO LO LOGRO ¿QUE ESTAS ESPERANDO?
          </h2>
          <div className="mt-8 max-w-[900px] mx-auto space-y-6">
            {
              VIDEO_TESTIMONIALS.map((testimonial) => {
                return (
                  <div className="p-2 rounded-[24px] relative overflow-clip">
                    <div className="bg-[#fbff00] size-[600px] md:size-[700px] top-0 md:-top-[100px] blur-[100px] opacity-[70%] rounded-full absolute left-[calc(50%-300px)] md:left-[calc(50%-350px)] -z-50"></div>
                    <div className="relative bg-[#1a1a00] z-50 p-8 md:p-[50px] rounded-[20px] flex md:flex-row flex-col gap-4 md:gap-8">
                      <div className="w-full md:min-w-[360px] aspect-video rounded-[10px] overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={testimonial.video}
                          title={testimonial.titulo}
                          allow="autoplay; fullscreen"
                        ></iframe>
                      </div>
                      <div className="py-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[24px] leading-[120%] font-bold">{testimonial.titulo}</h3>
                          <p className="text-white/80 mt-4">{testimonial.story}</p>
                        </div>
                        <div className="mt-4">
                          <p>{testimonial.nombre}</p>
                          <p className="text-white/80 mt-2 text-[14px]">{testimonial.dato}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <button
            className="cf-btn mt-8"
            onClick={() => { setIsFormOpened(true) }}
          >
            QUIERO MI ASESORIA 1 A 1
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M6.41318 11.6364L5.09499 10.3296L8.55522 6.86932H0.447266V4.94887H8.55522L5.09499 1.49432L6.41318 0.181824L12.1404 5.9091L6.41318 11.6364Z"
                fill="#111111"></path>
            </svg>
          </button>
          <p className="text-center mt-4 text-white/60 italic mx-auto max-w-[350px] text-[14px]">
            Cupos limitados - No te lo pierdas!
          </p>
        </div>
      </section>

      <section className="py-[80px] relative overflow-clip">
        <div className="cf-container">
          <h2
            className="text-[28px] font-bold text-white text-center uppercase max-w-[600px] leading-[120%] mx-auto"
          >
            ESTOS RESULTADOS PODES OBTENER SI AGENDAS HOY
          </h2>
          <p className="text-white/80 text-center mt-4 max-w-[400px] mx-auto">Si ellos pudieron, vos también podés. Solo necesitás un método pensado específicamente para vos.</p>

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
          <button
            className="cf-btn mt-8"
            onClick={() => { setIsFormOpened(true) }}
          >
            QUIERO MI ASESORIA 1 A 1
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M6.41318 11.6364L5.09499 10.3296L8.55522 6.86932H0.447266V4.94887H8.55522L5.09499 1.49432L6.41318 0.181824L12.1404 5.9091L6.41318 11.6364Z"
                fill="#111111"></path>
            </svg>
          </button>
            <p className="text-center mt-4 text-white/60 italic mx-auto max-w-[350px] text-[14px]">
              Cupos limitados - No te lo pierdas!
            </p>
        </div>
        <div className="bg-[#fbff00] size-[600px] md:size-[700px] blur-[100px] md:blur-[200px] opacity-[50%] rounded-full absolute left-[calc(50%-300px)] md:-left-[300px] -bottom-[300px] -z-50"></div>
        <div className="bg-[#fbff00] size-[600px] md:size-[700px] blur-[100px] md:blur-[200px] opacity-[50%] rounded-full absolute right-[calc(50%-300px)] md:-right-[300px] -bottom-[300px] -z-50"></div>
      </section>
      <p className="pb-6 pt-8 text-[14px] text-center px-4 text-white/60">© Nano Fitness 2025. Todos los derechos reservados.</p>
    </div>
  );
}
