<script lang="ts">
  import { enhance } from '$app/forms';
  import { fly, fade } from 'svelte/transition';

  export let form: any;
</script>

<svelte:head>
  <title>Solicita una cotización | Gold Construction</title>
</svelte:head>

<section class="relative overflow-hidden bg-gradient-to-b from-sky-900 via-slate-950 to-slate-900 text-slate-50">
  <!-- luces de fondo -->
  <div class="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"></div>

  <div class="relative max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">
    <!-- encabezado -->
    <div in:fade={{ duration: 250 }}>
      <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-3">
        COTIZACIÓN
      </p>
      <h1 class="text-3xl md:text-4xl font-extrabold mb-3">
        Solicita una cotización para tu proyecto
      </h1>
      <p class="text-sm md:text-base text-slate-200 max-w-2xl">
        Compártenos algunos detalles sobre tu proyecto y nuestro equipo te contactará
        con una propuesta clara de tiempos, alcances y estimado de inversión.
      </p>
    </div>

    <div class="grid lg:grid-cols-[2fr,1.05fr] gap-8 lg:gap-10 items-start">
      <!-- FORMULARIO -->
      <div in:fly={{ y: 24, duration: 260 }}>
        {#if form?.success}
          <div class="mb-4 rounded-xl border border-emerald-300/70 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-50 shadow">
            ✅ Hemos recibido tu solicitud. En breve nos pondremos en contacto contigo.
          </div>
        {/if}

        {#if form?.errors?.global}
          <div class="mb-4 rounded-xl border border-red-400/80 bg-red-500/15 px-4 py-3 text-sm text-red-100 shadow">
            {form.errors.global}
          </div>
        {/if}

        <!-- marco degradado -->
        <div class="p-[3px] rounded-3xl bg-gradient-to-r from-amber-400 via-sky-500 to-emerald-400 shadow-2xl shadow-sky-900/60">
          <form
            method="POST"
            use:enhance
            class="bg-slate-950/95 backdrop-blur rounded-[22px] px-6 py-7 md:px-7 md:py-8 space-y-7 border border-white/10"
          >
            <!-- fila 1: nombre / teléfono -->
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
                  Teléfono
                </label>
                <input
                  name="phone"
                  type="tel"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60 transition duration-200"
                  placeholder="+1 (___) ___ ____"
                  value={form?.values?.phone ?? ''}
                />
              </div>
            </div>

            <!-- fila 2: email / ciudad -->
            <div class="grid md:grid-cols-2 gap-5">
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

              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Ciudad / Provincia
                </label>
                <input
                  name="city"
                  type="text"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 transition duration-200"
                  placeholder="Ciudad, Provincia"
                  value={form?.values?.city ?? ''}
                />
              </div>
            </div>

            <!-- fila 3: servicio / presupuesto -->
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Tipo de servicio *
                </label>
                <select
                  name="service"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60 transition duration-200"
                  value={form?.values?.service ?? ''}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="drywall">Drywall / Framing</option>
                  <option value="painting">Pintura interior / exterior</option>
                  <option value="insulation">Insulación</option>
                  <option value="repairs">Reparaciones / mantenimiento</option>
                  <option value="full-project">Proyecto completo / otro</option>
                </select>
                {#if form?.errors?.service}
                  <p class="mt-1 text-xs font-semibold text-amber-300">{form.errors.service}</p>
                {/if}
              </div>

              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Rango estimado de presupuesto
                </label>
                <select
                  name="budget"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 transition duration-200"
                  value={form?.values?.budget ?? ''}
                >
                  <option value="">No estoy seguro todavía</option>
                  <option value="0-5000">$0 – $5,000</option>
                  <option value="5000-15000">$5,000 – $15,000</option>
                  <option value="15000-30000">$15,000 – $30,000</option>
                  <option value="30000+">Más de $30,000</option>
                </select>
              </div>
            </div>

            <!-- fila 4: fecha -->
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                  Fecha estimada de inicio
                </label>
                <input
                  name="startDate"
                  type="text"
                  class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60 transition duration-200"
                  placeholder="Ejemplo: Abril 2025"
                  value={form?.values?.startDate ?? ''}
                />
              </div>
            </div>

            <!-- detalles -->
            <div>
              <label class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
                Describe tu proyecto *
              </label>
              <textarea
                name="details"
                rows="5"
                class="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 transition duration-200 resize-y"
                placeholder="Ejemplo: Remodelación de sala y cocina (~40 m²), incluir reparación de drywall, pintura e iluminación..."
              >{form?.values?.details ?? ''}</textarea>
              {#if form?.errors?.details}
                <p class="mt-1 text-xs font-semibold text-amber-300">{form.errors.details}</p>
              {/if}
            </div>

            <!-- CTA -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
              <p class="text-[11px] text-slate-400 max-w-sm">
                Al enviar este formulario, un miembro de nuestro equipo revisará tu información
                y se pondrá en contacto contigo para aclarar dudas y avanzar con la cotización.
              </p>

              <button
                type="submit"
                class="inline-flex items-center justify-center px-9 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-sky-500 text-slate-950 text-sm font-semibold shadow-lg shadow-sky-900/70 hover:from-amber-300 hover:to-sky-400 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- PANEL LATERAL -->
      <aside in:fly={{ y: 26, duration: 280, delay: 80 }} class="space-y-5 lg:space-y-6">
        <div class="bg-slate-900/70 backdrop-blur rounded-2xl p-6 border border-amber-300/40 shadow-xl shadow-slate-950/70">
          <h2 class="text-base font-semibold mb-2 text-amber-200">
            💡 ¿Qué ayuda tener a la mano?
          </h2>
          <ul class="text-sm text-slate-100/90 list-disc pl-5 space-y-1.5">
            <li><span class="font-semibold">Tipo de propiedad:</span> casa, departamento, local u oficina.</li>
            <li><span class="font-semibold">Áreas aproximadas</span> a intervenir (sala, cocina, fachada, etc.).</li>
            <li>Si es <span class="font-semibold">obra nueva, remodelación</span> o reparación puntual.</li>
            <li><span class="font-semibold">Objetivo principal:</span> estética, funcionalidad, daños o eficiencia.</li>
          </ul>
        </div>

        <div class="bg-slate-100/95 rounded-2xl border border-slate-200/80 p-6 text-sm text-slate-800 shadow-md">
          <h3 class="text-base font-semibold mb-2 text-slate-900">📞 ¿Prefieres hablar por teléfono?</h3>
          <p class="mb-2">
            Si te sientes más cómodo explicando tu proyecto por llamada, también podemos ayudarte así:
          </p>
          <p class="font-extrabold text-lg text-amber-600 border-b border-amber-300 pb-1">
            Tel: +1 (000) 000-0000
          </p>
          <p class="text-xs text-slate-500 mt-2">
            Lunes a Viernes: 8:00am – 6:00pm · Sábados: 9:00am – 1:00pm
          </p>
        </div>
      </aside>
    </div>
  </div>
</section>
