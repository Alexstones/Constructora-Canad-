<script lang="ts">
  export type WorkerProfile = {
    id: number;
    user_id: string;
    full_name: string | null;
    city: string | null;
    phone: string | null;
    services: string[] | null;
    years_experience: number | null;
    worker_type: string | null;
    certs: string[] | null;
    bio: string | null;
    created_at: string | null;
    is_approved: boolean;
  };

  export let data: {
    profiles: WorkerProfile[];
    search: string;
    cityFilter: string;
    error?: string;
  };

  const workerTypeLabel: Record<string, string> = {
    independent: 'Independiente / freelancer',
    crew_lead: 'Líder de cuadrilla',
    subcontractor: 'Subcontratista',
    company: 'Empresa registrada'
  };

  const serviceLabel: Record<string, string> = {
    drywall: 'Drywall / Framing',
    painting: 'Pintura interior / exterior',
    insulation: 'Insulación',
    repairs: 'Reparaciones / mantenimiento',
    full_renovations: 'Remodelaciones completas'
  };
</script>

<svelte:head>
  <title>Encuentra contratistas | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- Luces fondo -->
  <div
    class="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
  ></div>

  <div class="relative max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-8">
    <!-- Encabezado -->
    <div class="space-y-3">
      <p class="text-xs uppercase tracking-[0.25em] text-amber-300">
        FIND CONTRACTORS
      </p>
      <h1 class="text-3xl md:text-4xl font-extrabold">
        Encuentra contratistas verificados
      </h1>
      <p class="text-sm md:text-base text-slate-200 max-w-2xl">
        Explora el marketplace de trabajadores independientes, cuadrillas y empresas
        con experiencia en drywall, pintura, remodelaciones y más. Solo mostramos
        perfiles <span class="font-semibold text-emerald-300">aprobados</span>
        por el equipo de Gold Construction.
      </p>
    </div>

    <!-- Barra de filtros -->
    <div class="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-lg shadow-slate-950/60">
      <form method="GET" class="flex flex-col md:flex-row gap-3 md:items-end">
        <div class="flex-1">
          <label
            for="search"
            class="block text-[11px] font-semibold tracking-wide text-slate-300 mb-1"
          >
            Buscar por nombre, servicio o descripción
          </label>
          <input
            id="search"
            name="q"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60"
            placeholder="Ej. drywall, pintura, kitchen, basement..."
            value={data.search}
          />
        </div>

        <div class="md:w-56">
          <label
            for="city"
            class="block text-[11px] font-semibold tracking-wide text-slate-300 mb-1"
          >
            Ciudad / zona (opcional)
          </label>
          <input
            id="city"
            name="city"
            type="text"
            class="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60"
            placeholder="Ej. Toronto, Scarborough..."
            value={data.cityFilter}
          />
        </div>

        <div class="md:w-auto">
          <button
            type="submit"
            class="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/70 hover:from-amber-300 hover:to-sky-400 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Buscar contratistas
          </button>
        </div>
      </form>

      <p class="mt-2 text-[11px] text-slate-500">
        Tip: puedes escribir el tipo de servicio (ej. <span class="italic">drywall</span>),
        un área (ej. <span class="italic">basement</span>) o una ciudad.
      </p>
    </div>

    {#if data.error}
      <div class="rounded-xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-xs text-red-100">
        {data.error}
      </div>
    {/if}

    <!-- Resultados -->
    {#if data.profiles.length === 0}
      <div class="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/80 px-6 py-8 text-sm text-slate-300">
        <p class="font-semibold text-slate-100 mb-1">
          No encontramos contratistas con esos filtros.
        </p>
        <p class="text-xs text-slate-400">
          Intenta quitar la ciudad, usar palabras más generales o
          envía una solicitud directa desde la sección de
          <a href="/request-quote" class="text-amber-300 underline hover:text-amber-200">
            Cotización
          </a>.
        </p>
      </div>
    {:else}
      <div class="space-y-3">
        <p class="text-xs text-slate-400">
          Mostrando {data.profiles.length} contratista{data.profiles.length === 1 ? '' : 's'} aprobado{data.profiles.length === 1 ? '' : 's'}.
        </p>

        <div class="grid md:grid-cols-2 gap-5 lg:gap-6">
          {#each data.profiles as p}
            <article class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/50 flex flex-col justify-between">
              <div class="space-y-2">
                <!-- Header card -->
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h2 class="text-sm md:text-base font-semibold text-slate-50">
                      {p.full_name || 'Contratista sin nombre'}
                    </h2>
                    <p class="text-[11px] text-slate-400">
                      {#if p.city}{p.city}{:else}Ciudad no especificada{/if}
                      {#if p.worker_type}
                        · {workerTypeLabel[p.worker_type] ?? p.worker_type}
                      {/if}
                    </p>
                  </div>

                  <div class="text-right text-[10px]">
                    <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200 border border-emerald-400/60">
                      ✔ Aprobado
                    </span>
                    {#if p.years_experience !== null}
                      <p class="mt-1 text-slate-300">
                        {p.years_experience} año{p.years_experience === 1 ? '' : 's'}
                      </p>
                    {/if}
                  </div>
                </div>

                <!-- Servicios -->
                {#if p.services && p.services.length > 0}
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    {#each p.services as s}
                      <span class="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200">
                        {serviceLabel[s] ?? s}
                      </span>
                    {/each}
                  </div>
                {/if}

                <!-- Bio -->
                {#if p.bio}
                  <p class="mt-2 text-[11px] text-slate-200 line-clamp-3">
                    {p.bio}
                  </p>
                {/if}

                <!-- Certificaciones -->
                {#if p.certs && p.certs.length > 0}
                  <p class="mt-2 text-[11px] text-slate-300">
                    <span class="font-semibold text-slate-100">Certificaciones:</span>
                    {' '}{p.certs.join(', ')}
                  </p>
                {/if}
              </div>

              <!-- Footer card -->
              <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px]">
                <div class="text-slate-400">
                  {#if p.phone}
                    <p>
                      📞 <span class="font-semibold text-slate-100">{p.phone}</span>
                    </p>
                  {/if}
                  {#if p.created_at}
                    <p class="text-[10px] text-slate-500 mt-1">
                      En la plataforma desde {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  {/if}
                </div>

                <div class="flex flex-wrap gap-2">
                  <a
                    href="/request-quote"
                    class="inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-1.5 font-semibold text-slate-950 hover:bg-amber-300"
                  >
                    Solicitar cotización
                  </a>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-200"
                  >
                    Ver más (futuro)
                  </button>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
