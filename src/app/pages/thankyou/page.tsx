"use client";

import { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ThankYou() {
  // Opcional: recuperar datos del paso anterior
  const [name, setName] = useState<string>("");
  const [startAt, setStartAt] = useState<string>(""); // ISO e.g. "2025-11-02T14:00:00-03:00"
  const [agreeQuietPlace, setAgreeQuietPlace] = useState(false);
  const [agreeOnTime, setAgreeOnTime] = useState(false);
  const [agreeNoReschedule, setAgreeNoReschedule] = useState(false);

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const n = q.get("name") || localStorage.getItem("name") || "";
      const s =
        q.get("startAt") ||
        localStorage.getItem("meeting_startAt") ||
        ""; // ISO date string
      setName(n ?? "");
      setStartAt(s ?? "");
    } catch {}
  }, []);

  // Countdown
  const countdown = useMemo(() => {
    if (!startAt) return null;
    const target = new Date(startAt).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) return "¡Es ahora!";
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${d}d ${h}h ${m}m`;
  }, [startAt]);

  // Calendario: helpers
  const title = "Reunión con el equipo de Nano – Plan para recomponer hormonas y músculo";
  const description = `Reunión 1:1 para alinear objetivos y plan.\nEnlace: MEETING_URL\nTraer dudas y objetivos claros.`;
  const location = "Online (se compartirá enlace)";
  const gcalHref = useMemo(() => {
    if (!startAt) return "#";
    const start = new Date(startAt);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30min
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
    const qs = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location,
      dates: `${fmt(start)}/${fmt(end)}`
    });
    return `https://www.google.com/calendar/render?${qs.toString()}`;
  }, [startAt]);

  const outlookHref = useMemo(() => {
    if (!startAt) return "#";
    const start = new Date(startAt);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const qs = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      startdt: start.toISOString(),
      enddt: end.toISOString(),
      subject: title,
      body: description,
      location
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${qs.toString()}`;
  }, [startAt]);

  const appleIcsData = useMemo(() => {
    if (!startAt) return "#";
    const start = new Date(startAt);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nano//Attendance//ES",
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, "")}`,
      `DTSTART:${start.toISOString().replace(/[-:]|\.\d{3}/g, "")}`,
      `DTEND:${end.toISOString().replace(/[-:]|\.\d{3}/g, "")}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [startAt]);

  // WhatsApp confirm
  const waNumber = "5491136857548"; // <-- REEMPLAZAR
  const confirmMsg = encodeURIComponent(
    `Hola Nano${name ? `, soy ${name}` : ""}. Confirmo mi asistencia a la reunión ${startAt ? `del ${new Date(startAt).toLocaleString()}` : ""}.`
  );
  const waConfirmHref = `https://wa.me/${waNumber}?text=${confirmMsg}`;

  // Pixel (opcional): enviar evento custom al hacer click en Confirmar
  const trackConfirm = () => {
    try {
      // @ts-ignore
      window.fbq?.("trackCustom", "ConfirmedAttendance", {
        startAt,
        name
      });
    } catch {}
  };

  const confirmEnabled = agreeQuietPlace && agreeOnTime && agreeNoReschedule;

  // vCard (agregar contacto de Nano)
  const vcardData = useMemo(() => {
    const v = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Ponce;Nano;;;",
      "FN:Nano Ponce",
      "ORG:Nano Ponce Fit",
      "TITLE:Coach",
      `TEL;TYPE=CELL:+${waNumber}`,
      "END:VCARD"
    ].join("\n");
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(v)}`;
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-[760px] mx-auto px-4 py-[36px]">
        {/* Aviso destacado */}
        <p className="mb-3 bg-amber-200 flex items-center gap-2 justify-center p-2 rounded-md text-[16px] text-black">
          <svg className="fill-amber-500 size-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
          <span><strong>¡Último paso!</strong> Confirmá y agendá para no perder tu cupo.</span>
        </p>

        {/* Video corto arriba (30–60s) */}
        {/* Wistia / Loom */}
        {/* <div className="mb-6">
          <div className="wistia_responsive_padding">
            <div className="wistia_responsive_wrapper">
              <iframe
                src="https://fast.wistia.net/embed/iframe/fozjbg7l5u?web_component=true&seo=true"
                title="Mensaje de Nano"
                allow="autoplay; fullscreen"
                scrolling="no"
                className="wistia_embed aspect-video"
                name="wistia_embed"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <script src="https://fast.wistia.net/player.js" async></script>
        </div> */}

        {/* Título + countdown */}
        <h1 className="text-[26px] text-black font-bold leading-[115%] mb-2">
          {name ? `¡${name},` : "¡Genial,"} ya casi estamos! Solo falta confirmar.
        </h1>
        {startAt && (
          <p className="text-[16px] text-black/80 mb-4">
            Tu reunión está programada para:{" "}
            <strong>{new Date(startAt).toLocaleString()}</strong>{" "}
            {countdown && <span className="ml-2 px-2 py-1 bg-black text-white rounded">Comienza en {countdown}</span>}
          </p>
        )}

        {/* Checklist de compromiso */}
        <div className="rounded-xl border p-4 bg-white mb-4">
          <p className="font-semibold text-[18px] mb-2 text-black">
            Checklist (2 minutos) — marcá para habilitar la confirmación:
          </p>
          <label className="flex items-start gap-3 text-[16px] text-black mb-2">
            <input type="checkbox" className="mt-1" checked={agreeQuietPlace} onChange={e => setAgreeQuietPlace(e.target.checked)} />
            <span>Voy a estar en un lugar tranquilo, sin interrupciones.</span>
          </label>
          <label className="flex items-start gap-3 text-[16px] text-black mb-2">
            <input type="checkbox" className="mt-1" checked={agreeOnTime} onChange={e => setAgreeOnTime(e.target.checked)} />
            <span>Me comprometo a llegar a tiempo (respeto el cupo y la agenda).</span>
          </label>
          <label className="flex items-start gap-3 text-[16px] text-black">
            <input type="checkbox" className="mt-1" checked={agreeNoReschedule} onChange={e => setAgreeNoReschedule(e.target.checked)} />
            <span>Si no puedo asistir, reprogramo con anticipación para liberar el lugar.</span>
          </label>
        </div>

        {/* CTA principal */}
        <a
          className={`py-3 block text-center mx-auto md:w-fit px-8 font-bold rounded-lg transition ${
            confirmEnabled ? "bg-green-600 text-white hover:opacity-90" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          target="_blank"
          onClick={confirmEnabled ? trackConfirm : undefined}
          href={confirmEnabled ? waConfirmHref : undefined}
          aria-disabled={!confirmEnabled}
        >
          Confirmar mi asistencia por WhatsApp
        </a>

        {/* Add to Calendar + vCard + Reprogramar */}
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {/* <div className="rounded-xl border p-4">
            <p className="font-semibold text-[16px] text-black mb-2">Agendalo ahora</p>
            <div className="flex flex-wrap gap-2">
              <a className="underline text-blue-600" target="_blank" href={gcalHref}>Google Calendar</a>
              <a className="underline text-blue-600" target="_blank" href={outlookHref}>Outlook</a>
              <a className="underline text-blue-600" download="nano-reunion.ics" href={appleIcsData}>Apple/ICS</a>
            </div>
            <p className="text-[13px] text-black/70 mt-2">Sugerencia: dejá un recordatorio 10–15 min antes.</p>
          </div> */}
          <div className="rounded-xl border p-4">
            <p className="font-semibold text-[16px] text-black mb-2">Evitar no-show</p>
            <div className="flex flex-wrap gap-2">
              <a className="underline text-blue-600" download="nano.vcf" href={vcardData}>Guardar contacto de Nano</a>
              <a className="underline text-blue-600" target="_blank" href="CALENDLY_LINK">Reprogramar</a>
            </div>
            <p className="text-[13px] text-black/70 mt-2">Si te surge algo, reprogramá con tiempo.</p>
          </div>
        </div>

        {/* Social proof compacto arriba del fold */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { txt: "-17 KG en 3 Meses", img: "/images/testimonios/testimonio-1.webp" },
            { txt: "-6 KG en 1 Mes", img: "/images/testimonios/testimonio-2.webp" },
            { txt: "-8 KG en 2 Meses", img: "/images/testimonios/testimonio-6.webp" },
          ].map((t, i) => (
            <div key={i}>
              <p className="text-center py-2 bg-[#fbff00] text-black font-semibold">{t.txt}</p>
              <img className="w-full h-[260px] object-cover" src={t.img} alt={`Cambio ${i+1}`} />
            </div>
          ))}
        </div>

        {/* FAQ (desplazada hacia abajo) */}
        <h3 className="text-center text-black text-[24px] leading-[115%] font-bold mb-6 mt-10">
          Preguntas frecuentes
        </h3>
        <Accordion type="single" collapsible className="w-full text-black">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-[18px] font-bold leading-[120%]">
              ¿Cuánto tiempo necesito para ver cambios?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              Muchos ven cambios en 3–4 semanas; depende del punto de partida. Medimos con fotos, medidas y fuerza.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-[18px] font-bold leading-[120%]">
              ¿Tengo que dejar de comer lo que me gusta?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              No. Te enseñamos a incluir tus comidas favoritas sin sabotear tu progreso.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-[18px] font-bold leading-[120%]">
              No tengo tiempo todos los días, ¿igual puedo?
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              Sí. Planes efectivos desde 2–3 sesiones/semana, adaptados a tu agenda.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA repetido al final */}
        <a
          className={`py-3 block text-center mx-auto md:w-fit mt-8 px-8 font-bold rounded-lg transition ${
            confirmEnabled ? "bg-green-600 text-white hover:opacity-90" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          target="_blank"
          onClick={confirmEnabled ? trackConfirm : undefined}
          href={confirmEnabled ? waConfirmHref : undefined}
          aria-disabled={!confirmEnabled}
        >
          Confirmar mi asistencia por WhatsApp
        </a>

        {/* Nota de escasez real */}
        <p className="text-center text-[13px] text-black/60 mt-4">
          Cupos limitados: si no confirmás, el sistema libera tu lugar automáticamente.
        </p>
      </div>
    </div>
  );
}
