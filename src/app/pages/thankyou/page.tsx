import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// npx shadcn@latest init
// npx shadcn@latest add accordion

export default function ThankYou() {
  return (
    <div className="bg-white">
      <div className="max-w-[700px] mx-auto px-4 py-[60px] bg-white">
        <p className="mb-8 bg-amber-200 flex justify-center p-1 rounded-md text-[18px] text-center text-black">
          <svg className="fill-amber-500 size-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
          <span><strong>¡Importante!</strong> Leer completo</span>
        </p>
        <h1 className="text-[24px] text-black font-bold mb-8 leading-[115%]">
          ¡Felicidades!
          <br /><br />
          Acabas de dar un paso clave para transformar tu físico y salud en los próximos meses…
        </h1>
        <p className="text-[20px] text-black">
          Y lo mejor: sin dietas extremas, sin matarte haciendo cardio todos los días y sin dejar de comer lo que te gusta.
          <br /><br />
          Hace un tiempo yo estaba igual que vos:
          <br /><br />
          Siguiendo rutinas genéricas de YouTube, probando mil dietas, y matándome en el gimnasio…
          <br /><br />
          Para terminar frustrado y sin ver cambios reales.
          <br /><br />
          Hoy, aplico un método mucho más simple que me permite (y a mis clientes también) perder grasa, ganar músculo y sentirse increíble sin sacrificar su vida social ni pasar hambre.
          <br /><br />
          Es el mismo del que vamos a hablar en nuestra llamada.
          <br /><br />
          <strong>📅 Próximo paso:</strong>
          <br />
          En breve te voy a mandar un mensaje para confirmar la reunión y conocerte un poco más.
          Así llegamos a la reunión listos para enfocarnos en tu objetivo, tu situación actual y cómo aplicar el sistema a tu caso.
          <br /><br />
          (Ya te debería haber llegado, si no es el caso, escribime acá <a className="text-blue-400 underline" target="_blank" href="https://wa.me/+5491136857548">+5491136857548</a>)
          <br /><br />
          <strong>💡 Tip:</strong>
          <br />
          Anotá todas las dudas o ideas que te surjan antes de la llamada. Cuanto más claro sea lo que querés lograr, más rápido vamos a poder trazar el plan. Más abajo están las dudas más frecuentes.
          <br /><br />
          Nos vemos pronto. 🚀
          <br /><br />
          PD: Al ser un servicio personalizado y con cupos limitados, no podemos tomar el 100% de los interesados.
          <br /><br />
          Si de verdad querés transformar tu cuerpo y tu salud, asegurate de asistir a la reunión y aprovecharla al máximo.
          <br /><br />
          No se trata solo de conocer el sistema, sino de definir si encajamos para trabajar juntos y que puedas implementarlo cuanto antes.
          <br /><br />
          Si por algún motivo no podés asistir, avísame con antelación para liberar el lugar a otra persona que lo necesite.
          <br /><br />
          Este es mi WhatsApp:
          <br />
          <a className="text-blue-400 underline" target="_blank" href="https://wa.me/+5491136857548">+5491136857548</a>
        </p>
        <h3 className="text-center text-black text-[28px] leading-[115%] font-bold capitalize mb-8 mt-12">Preguntas reales de alumnos reales</h3>
        <Accordion type="single" collapsible className="w-full text-black">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">1.</span> ¿Cuánto tiempo necesito para ver cambios?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              Algunos alumnos empiezan a notar cambios visibles en las primeras 3-4 semanas. Otros tardan un poco más según su punto de partida.<br /><br />
              Lo importante es que vamos a medir tu progreso con fotos, medidas y fuerza, para que tengas claridad y motivación constante.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">2.</span> ¿Voy a tener que dejar de comer lo que me gusta?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              No.<br /><br />
              Vamos a enseñarte a incluir tus comidas favoritas dentro de tu plan sin sabotear tu progreso.<br /><br />
              La clave está en el equilibrio, no en prohibiciones extremas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">3.</span> No tengo tiempo para entrenar todos los días. ¿Igual puedo lograr resultados?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              Sí.<br /><br />
              Diseñamos planes adaptados a tu disponibilidad, incluso si solo podés entrenar 3 veces por semana.<br /><br />
              Lo importante es que sean entrenamientos efectivos y con el plan nutricional correcto.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">4.</span> ¿Y si nunca entrené en mi vida?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              No hay problema.<br /><br />
              Adaptamos todo a tu nivel y te enseñamos la técnica correcta para que entrenes seguro y sin lesiones.<br /><br />
              Vas a progresar de forma constante y sin abrumarte.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">5.</span> ¿Es otro plan genérico como los que descargué gratis?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              No.<br /><br />
              Este es un programa 100% personalizado para vos, con seguimiento semanal y ajustes constantes.<br /><br />
              No te vas a sentir solo ni perdido.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q6">
            <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
              <span className="text-blue-500">6.</span> ¿Voy a tener soporte si me surgen dudas?
            </AccordionTrigger>
            <AccordionContent className="text-[18px]">
              Sí, vas a tener contacto directo conmigo y mi equipo para resolver cualquier duda en el momento.<br /><br />
              No vas a quedarte bloqueado sin saber qué hacer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
    </div>
  );
}
