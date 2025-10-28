'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  variant: string;
};

type Opcion = { value: string; label: string };

const PAISES = [
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+34', name: 'España', flag: '🇪🇸' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+51', name: 'Perú', flag: '🇵🇪' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', name: 'Panamá', flag: '🇵🇦' },
  { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
  { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
  { code: '+504', name: 'Honduras', flag: '🇭🇳' },
  { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
  { code: '+1-809', name: 'República Dominicana', flag: '🇩🇴' },
  { code: '+1', name: 'Estados Unidos / Canadá', flag: '🇺🇸' },
];

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function CalificationFormDirect({ variant }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      codigoPais: '',
      telefono: '',
      edad: '',
      presupuesto: '',
      cuerpo: '',
      urgencia: '',
      ocupacion: '',
      compromiso90: '',
      ad: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --------- PREGUNTAS (tipo Typeform) ----------
  // Paso 0: datos de contacto (Nombre / Email / Teléfono)
  // Paso 1..N: preguntas de opción única como en las capturas
  const steps = useMemo<
    Array<
      | {
          type: 'contact';
          id: 'contact';
          title: string;
          subtitle?: string;
        }
      | {
          type: 'single';
          id:
            | 'edad'
            | 'presupuesto'
            | 'cuerpo'
            | 'urgencia'
            | 'ocupacion'
            | 'compromiso90';
          title: string;
          subtitle?: string;
          options: Opcion[];
          required?: boolean;
        }
    >
  >(
    () => [
      {
        type: 'contact',
        id: 'contact',
        title:
          'Completá tus datos para agendar tu consulta gratuita y ver si somos un buen fit',
        subtitle:
          'Tus datos son 100% confidenciales. Te tomará menos de 1 minuto.',
      },
      {
        type: 'single',
        id: 'cuerpo',
        title: '¿Cómo describirías tu cuerpo hoy?*',
        subtitle:
          'No te preocupes, nadie va a juzgarte. Solo queremos entender por dónde empezar.',
        options: [
          {
            value: 'sobrepeso-15kg',
            label: 'Tengo sobrepeso (quiero perder más de 15 kg por salud)',
          },
          {
            value: 'fuera-de-forma',
            label:
              'Estoy fuera de forma (quiero perder entre 7 y 15 kg y quiero verme mejor)',
          },
          {
            value: 'delgado-grasa',
            label:
              'Soy delgado(a), pero tengo grasa rebelde que quiero eliminar y ganar músculo',
          },
          { value: 'otro', label: 'Otro' },
        ],
        required: true,
      },
      {
        type: 'single',
        id: 'urgencia',
        title: '¿Qué tan urgente es para ti cambiar tu cuerpo ahora mismo?*',
        subtitle:
          'Responde con total sinceridad. Esto nos ayuda a ver cómo ayudarte.',
        options: [
          {
            value: '3',
            label: '(3 de 10) Estoy buscando info. No es prioridad ahora.',
          },
          {
            value: '5',
            label: '(5 de 10) Quiero empezar pronto. Me estoy motivando.',
          },
          {
            value: '7',
            label:
              '(7 de 10) Quiero empezar ya. Me frustra cómo me siento y quiero recuperar mi salud y autoestima.',
          },
          {
            value: '10',
            label:
              '(10 de 10) No puedo esperar más. Esto me afecta física y mentalmente. Haré lo que haga falta.',
          },
        ],
        required: true,
      },
      {
        type: 'single',
        id: 'ocupacion',
        title: '¿A qué te dedicas?*',
        subtitle:
          'Esto nos ayuda a adaptar tu alimentación y entrenamiento a tu estilo de vida.',
        options: [
          { value: 'negocio-propio', label: 'Tengo mi propio negocio' },
          { value: 'profesional', label: 'Soy profesional (Abogado, Médico, etc.)' },
          { value: 'trabajador', label: 'Trabajador' },
          { value: 'estudiante', label: 'Estudiante' },
          { value: 'trabajador-estudiante', label: 'Trabajador y Estudiante' },
        ],
        required: true,
      },
      {
        type: 'single',
        id: 'compromiso90',
        title: '¿Estás listo/a para comprometerte 90 días con tu cambio?*',
        options: [
          {
            value: 'si',
            label: 'Sí, sé que los cambios duraderos no se logran en 2 semanas.',
          },
          { value: 'no', label: 'No, ahora no puedo comprometerme a 90 días.' },
        ],
        required: true,
      },
      {
        type: 'single',
        id: 'edad',
        title: '¿En qué rango de edad te encontrás?*',
        options: [
          { value: 'menor', label: 'Soy menor de edad' },
          { value: 'joven', label: '18 - 24 años' },
          { value: 'adulto', label: '24 - 44 años' },
          { value: 'mayor', label: '+44 años' },
        ],
        required: true,
      },
      {
        type: 'single',
        id: 'presupuesto',
        title:
          '¿Qué tipo de solución estás buscando para transformar tu físico?*',
        options: [
          {
            value: 'presupuesto-bajo',
            label:
              'Quiero una solución económica para empezar por mi cuenta. (En este caso NO agendes, para cambiar tu vida necesitás invertir)',
          },
          {
            value: 'presupuesto-intermedio',
            label:
              'Quiero un plan serio, con un equipo de profesionales ayudándome 1 a 1 y que justifique la inversión.',
          },
          {
            value: 'presupuesto-alto',
            label:
              'Quiero la mejor opción disponible, independientemente del precio.',
          },
        ],
        required: true,
      },
    ],
    []
  );

  // paso actual
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = steps.length;
  const isLast = stepIndex === totalSteps - 1;

  // Para UX tipo Typeform: foco y scroll suave al cambiar paso
  useEffect(() => {
    containerRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex]);

  // Leer ?ad= de la URL y precargar
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const adParam = searchParams.get('ad');
    if (adParam) setValue('ad', adParam);
  }, [setValue]);

  // Evitar scroll de fondo (modal fullscreen)
  useEffect(() => {
    const b = document.querySelector('body');
    b?.classList.add('overflow-hidden');
    return () => b?.classList.remove('overflow-hidden');
  }, []);

  // Atajos de teclado: A-E / 1-5 para seleccionar opción y avanzar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const step = steps[stepIndex];
      if (!step || step.type !== 'single') return;

      const selectByIndex = (idx: number) => {
        const opt = step.options[idx];
        if (!opt) return;
        setValue(step.id, opt.value, { shouldValidate: true });
        next();
      };

      const key = e.key.toLowerCase();
      if (['1', '2', '3', '4', '5', '6'].includes(key)) {
        selectByIndex(Number(key) - 1);
      }
      if (['a', 'b', 'c', 'd', 'e', 'f'].includes(key)) {
        selectByIndex(key.charCodeAt(0) - 'a'.charCodeAt(0));
      }
      if (key === 'enter') {
        if (stepIndex === 0) {
          // en contacto, avanzar si válidos
          if (isContactValid()) next();
        } else if (!isLast) {
          next();
        }
      }
      if (key === 'Escape') back();
      if (e.key === 'ArrowLeft') back();
      if (e.key === 'ArrowRight') {
        if (stepIndex === 0 ? isContactValid() : true) next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, steps]);

  // Watchers para validar contacto (como en tu versión original)
  const name = watch('name');
  const email = watch('email');
  const telefono = watch('telefono');
  const codigoPais = watch('codigoPais');

  const isContactValid = () => {
    const isNameValid = (name ?? '').trim().length > 1;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');
    const isPhoneValid = (telefono ?? '').trim().length > 5 && !!codigoPais;
    return isNameValid && isEmailValid && isPhoneValid;
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));
  const next = () => setStepIndex((i) => Math.min(totalSteps - 1, i + 1));

  // --------- SUBMIT ----------
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const payload = { ...data, variant };
      await fetch('https://hook.us2.make.com/4440nxy5471reiw1q18qotjc15rveijb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([payload]),
      });

      const isQualified =
        (data.presupuesto === 'presupuesto-intermedio' ||
          data.presupuesto === 'presupuesto-alto') &&
        (data.edad === 'adulto' || data.edad === 'mayor');

      // guardar flags y datos
      if (typeof window !== 'undefined') {
        localStorage.setItem('isQualified', isQualified ? 'true' : 'false');
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phone', `${data.codigoPais}${data.telefono}`);
      }

      const fbp =
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('_fbp='))
          ?.split('=')[1] || null;

      function getCookieValue(cookieName: string) {
        const name = cookieName + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i].trim();
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }
      const fbc = getCookieValue('_fbc');

      if (isQualified) {
        await fetch('/api/track/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            phone: `${data.codigoPais}${data.telefono}`,
            fbp,
            fbc,
            eventId: `lead-${Date.now()}`,
          }),
        });
      }

      window.location.href = '/pages/calendly';
    } catch (e) {
      console.error('Error:', e);
      setLoading(false);
    }
  };

  // UI helpers
  const Progress = () => {
    const percent = Math.round(((stepIndex + 1) / totalSteps) * 100);
    return (
      <div className="w-full mb-6">
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-2 bg-[#fbff00] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-white/70 text-xs mt-2">{percent}% completado</p>
      </div>
    );
  };

  const CardOption = ({
    index,
    text,
    onClick,
    selected,
  }: {
    index: number;
    text: string;
    onClick: () => void;
    selected: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left rounded-xl border border-white/15 px-5 py-4 mb-3 bg-[#1a1a1a] hover:bg-[#232323] transition
        ${selected ? 'ring-2 ring-[#fbff00] border-[#fbff00]/60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#fbff00] text-black font-bold">
          {LETTERS[index]}
        </span>
        <span className="text-white/90 leading-snug">{text}</span>
      </div>
    </button>
  );

  // valores actuales para marcar selección
  const values = watch();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full md:max-w-[720px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-[20px] border border-white/10 bg-[#111] p-6 md:p-10 shadow-2xl"
      >
        {/* <Progress /> */}

        {/* TITULOS */}
        <h2 className="text-[22px] md:text-[26px] font-semibold text-white leading-tight">
          {steps[stepIndex].title}
        </h2>
        {('subtitle' in steps[stepIndex] && steps[stepIndex].subtitle) ? (
          <p className="text-white/70 mt-2">
            {(steps[stepIndex] as any).subtitle}
          </p>
        ) : null}

        {/* CONTENIDO */}
        <form
          className="mt-6"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="on"
        >
          {/* Paso 0: Contacto */}
          {steps[stepIndex].type === 'contact' && (
            <div className="space-y-5">
              <label className="block">
                <span className="text-white text-sm">Nombre</span>
                <input
                  data-autofocus
                  type="text"
                  placeholder="Tu Nombre Completo"
                  {...register('name', { required: 'Campo requerido' })}
                  className="mt-2 w-full rounded-lg bg-white text-[#111] px-4 py-3 outline-none"
                />
                {errors.name && (
                  <span className="text-red-400 text-xs">
                    {(errors as any).name.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-white text-sm">Correo electrónico</span>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email', { required: 'Campo requerido' })}
                  className="mt-2 w-full rounded-lg bg-white text-[#111] px-4 py-3 outline-none"
                />
                {errors.email && (
                  <span className="text-red-400 text-xs">
                    {(errors as any).email.message}
                  </span>
                )}
              </label>

              <div>
                <span className="text-white text-sm">Número de teléfono</span>
                <div className="mt-2 flex gap-2">
                  <select
                    {...register('codigoPais', { required: 'Campo requerido' })}
                    className="rounded-lg bg-white text-[#111] px-3 py-3 outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      País
                    </option>
                    {PAISES.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.flag} {p.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Número"
                    {...register('telefono', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /^[0-9\s\-]+$/,
                        message: 'Formato de teléfono inválido',
                      },
                    })}
                    className="flex-1 rounded-lg bg-white text-[#111] px-4 py-3 outline-none"
                  />
                </div>
                {(errors as any).codigoPais && (
                  <span className="text-red-400 text-xs">
                    {(errors as any).codigoPais.message}
                  </span>
                )}
                {(errors as any).telefono && (
                  <span className="text-red-400 text-xs">
                    {(errors as any).telefono.message}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Pasos de opción única */}
          {steps[stepIndex].type === 'single' && (
            <div className="mt-2">
              {(steps[stepIndex] as any).options.map(
                (op: Opcion, idx: number) => (
                  <CardOption
                    key={op.value}
                    index={idx}
                    text={op.label}
                    selected={values[(steps[stepIndex] as any).id] === op.value}
                    onClick={() => {
                      const id = (steps[stepIndex] as any).id;
                      setValue(id, op.value, { shouldValidate: true });
                      // avanzar automáticamente al elegir opción
                      setTimeout(() => next(), 120);
                    }}
                  />
                )
              )}
            </div>
          )}

          {/* Campo oculto ad */}
          <input type="hidden" {...register('ad')} />

          {/* FOOTER: navegación */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              className="px-4 py-3 rounded-lg border border-white/15 text-white/90 hover:bg-white/10 transition"
              disabled={stepIndex === 0 || loading}
            >
              Atrás
            </button>

            {isLast ? (
              <button
                type="submit"
                className="cf-btn"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Aceptar y Agendar'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (steps[stepIndex].type === 'contact') {
                    if (isContactValid()) next();
                  } else {
                    next();
                  }
                }}
                className="cf-btn"
                disabled={
                  loading ||
                  (steps[stepIndex].type === 'contact' && !isContactValid())
                }
              >
                Continuar
                {!loading && (
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 inline-block"
                  >
                    <path
                      d="M6.41318 11.6364L5.09499 10.3296L8.55522 6.86932H0.447266V4.94887H8.55522L5.09499 1.49432L6.41318 0.181824L12.1404 5.9091L6.41318 11.6364Z"
                      fill="#000"
                    ></path>
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Nota tipo disclaimer */}
          <p className="text-white/70 text-xs mt-4">
            PD: El método FIT90 está diseñado para hombres ocupados; no es la
            típica rutina de influencer que solo puede cumplir un adolescente
            que vive con los padres.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ---- Estilos utilitarios (Tailwind) ----
   Si ya tenés .cf-btn en tu proyecto, se usa la misma clase.
   Si no, podés agregar algo así en tu CSS global con @apply:

   .cf-btn {
     @apply inline-flex items-center justify-center gap-2 rounded-lg bg-[#fbff00] text-black font-semibold px-5 py-3 hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed;
   }
*/
