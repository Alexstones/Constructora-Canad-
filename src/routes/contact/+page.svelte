<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';

  export let form: any;
</script>

<svelte:head>
  <title>Contacto | Gold Construction</title>
</svelte:head>

<section class="relative overflow-hidden bg-slate-50 text-slate-900">

  <!-- luces de fondo -->
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />

  <div class="relative max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">
    <!-- encabezado -->
    <div in:fade={{ duration: 250 }}>
      <p class="text-xs uppercase tracking-[0.25em] text-amber-600 mb-3">
    CONTACTO
</p>

<h1 class="text-3xl md:text-4xl font-extrabold mb-3 text-slate-950">
    Hablemos de tu proyecto
</h1>

<p class="text-sm md:text-base text-slate-700 max-w-2xl">
    Déjanos un mensaje y con gusto te contactaremos para resolver dudas,
    coordinar una visita o ayudarte a planear tu próxima obra o remodelación.
</p>


    <div class="grid lg:grid-cols-[2fr,1.1fr] gap-8 lg:gap-10 items-start">
      <!-- FORMULARIO -->
      <div in:fly={{ y: 24, duration: 260 }}>
        {#if form?.success}
          <div class="mb-4 rounded-xl border border-emerald-300/70 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-50 shadow">
            ✅ Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos lo antes posible.
          </div>
        {/if}

        <div class="p-[3px] rounded-3xl bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 shadow-2xl shadow-sky-900/60">
          <form
            method="POST"
            use:enhance
            class="bg-slate-950/95 backdrop-blur rounded-[22px] px-6 py-7 md:px-7 md:py-8 space-y-6 border border-white/10"
          >
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  name="name"
                  type="text"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 transition duration-200"
                  placeholder="Tu nombre"
                  value={form?.values?.name ?? ''}
                />
                {#if form?.errors?.name}
                  <p class="mt-1 text-xs font-semibold text-amber-300">{form.errors.name}</p>
                {/if}
              </div>

              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Correo electrónico *
                </label>
                <input
                  name="email"
                  type="email"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60 transition duration-200"
                  placeholder="tu@email.com"
                  value={form?.values?.email ?? ''}
                />
                {#if form?.errors?.email}
                  <p class="mt-1 text-xs font-semibold text-amber-300">{form.errors.email}</p>
                {/if}
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                Asunto
              </label>
              <input
                name="subject"
                type="text"
                class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60 transition duration-200"
                placeholder="Cotización, visita a sitio, duda general..."
                value={form?.values?.subject ?? ''}
              />
            </div>

            <div>
              <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                Mensaje *
              </label>
              <textarea
                name="message"
                rows="5"
                class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 transition duration-200 resize-y"
                placeholder="Cuéntanos brevemente qué necesitas, en qué ciudad estás y cómo prefieres que te contactemos."
              >{form?.values?.message ?? ''}</textarea>
              {#if form?.errors?.message}
                <p class="mt-1 text-xs font-semibold text-amber-300">{form.errors.message}</p>
              {/if}
            </div>

            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
              <p class="text-[11px] text-slate-400 max-w-sm">
                Usaremos esta información únicamente para ponernos en contacto contigo
                respecto a tu consulta o proyecto.
              </p>

              <button
                type="submit"
                class="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-amber-300 text-slate-950 text-sm font-semibold shadow-lg shadow-sky-900/70 hover:from-sky-300 hover:to-amber-200 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- INFO LATERAL -->
      <aside in:fly={{ y: 26, duration: 280, delay: 80 }} class="space-y-5 lg:space-y-6">
        <div class="bg-slate-900/70 backdrop-blur rounded-2xl p-6 border border-sky-500/40 shadow-xl shadow-slate-950/70">
          <h2 class="text-base font-semibold mb-2 text-sky-100">
            Datos de contacto
          </h2>
          <ul class="text-sm text-slate-100/90 space-y-2">
            <li>
              <span class="font-semibold">Email:</span> info@goldconstruction.ca
            </li>
            <li>
              <span class="font-semibold">Teléfono:</span> +1 (000) 000-0000
            </li>
            <li>
              <span class="font-semibold">Ubicación:</span> Ciudad / Provincia, Canadá
            </li>
          </ul>

          <div class="mt-5 text-xs text-slate-400 space-y-1">
            <p class="font-semibold text-slate-200">Horario de atención</p>
            <p>Lunes a Viernes: 8:00am – 6:00pm</p>
            <p>Sábados: 9:00am – 1:00pm</p>
          </div>
        </div>

        <div class="bg-slate-100/95 rounded-2xl border border-slate-200/80 p-6 text-sm text-slate-800 shadow-md">
          <h3 class="text-base font-semibold mb-2 text-slate-900">
            ¿Necesitas una visita a sitio?
          </h3>
          <p class="mb-3">
            Podemos coordinar una visita para evaluar el estado actual del inmueble,
            tomar medidas y ayudarte a definir el alcance del proyecto.
          </p>
          <p class="text-xs text-slate-500">
            Menciona en tu mensaje la ciudad, tipo de propiedad y horarios sugeridos,
            y te responderemos con opciones de agenda.
          </p>
        </div>
      </aside>
    </div>
  </div>
</section>
