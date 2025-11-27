<script lang="ts">
  export let data: {
    profiles: {
      id: string;
      full_name: string | null;
      city: string | null;
      phone: string | null;
      services: string[] | null;
      years_experience: number | null;
      worker_type: string | null;
      certs: string[] | null;
      bio: string | null;
      created_at: string | null;
    }[];
    loadError?: boolean;
  };

  const workerTypeLabel: Record<string, string> = {
    independent: 'Independiente / freelancer',
    crew_lead: 'Líder de cuadrilla',
    subcontractor: 'Subcontratista',
    company: 'Empresa registrada'
  };

  // Filtros simples en el cliente (por ahora solo texto general)
  let search = '';
  let cityFilter = '';

  $: filteredProfiles = data.profiles.filter((p) => {
    const text = `
      ${p.full_name ?? ''}
      ${p.city ?? ''}
      ${(p.services ?? []).join(' ')}
      ${p.bio ?? ''}
    `
      .toLowerCase()
      .trim();

    const matchesSearch = search
      ? text.includes(search.toLowerCase().trim())
      : true;

    const matchesCity = cityFilter
      ? (p.city ?? '').toLowerCase().includes(cityFilter.toLowerCase().trim())
      : true;

    return matchesSearch && matchesCity;
  });
</script>

<svelte:head>
  <title>Encuentra contratistas | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- luces fondo -->
  <div
    class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
  ></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
    <!-- Encabezado -->
    <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
          FIND CONTRACTOR
        </p>
        <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
          Encuentra contratistas de confianza
        </h1>
        <p class="text-sm md:text-base text-slate-200 max-w-2xl">
          Explora perfiles de trabajadores especializados en drywall, pintura,
          insulación y más. Todos trabajan en Canadá y entienden los estándares
          locales de construcción.
        </p>
      </div>

      <div class="text-xs text-slate-300 bg-slate-900/70 border border-slate-700 rounded-2xl px-4 py-3">
        <p class="font-semibold text-slate-100 mb-1">¿Eres trabajador?</p>
        <p class="mb-2">
          Crea tu perfil profesional para aparecer en este listado y recibir
          solicitudes de clientes.
        </p>
        <a
          href="/auth/register"
          class="inline-flex items-center justify-center rounded-full bg-amber-400 text-slate-950 px-3 py-1.5 text-[11px] font-semibold hover:bg-amber-300 transition"
        >
          Crear perfil de trabajador
        </a>
      </div>
    </header>

    <!-- Barra de filtros -->
    <div
      class="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 md:px-5 md:py-4 flex flex-col md:flex-row md:items-center gap-3 text-xs md:text-sm"
    >
      <div class="flex-1 flex flex-col md:flex-row gap-3">
        <div class="flex-1">
          <label class="block text-[11px] font-semibold mb-1 text-slate-300">
            Buscar por nombre, servicio o descripción
          </label>
          <input
            type="text"
            bind:value={search}
            placeholder="Ej. drywall, pintura, Juan..."
            class="w-full rounded-lg border border-slate-600/70 bg-slate-950/80 px-3 py-1.5 text-xs md:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300/60"
          />
        </div>

        <div class="w-full md:w-64">
          <label class="block text-[11px] font-semibold mb-1 text-slate-300">
            Ciudad (filtro rápido)
          </label>
          <input
            type="text"
            bind:value={cityFilter}
            placeholder="Toronto, Vancouver..."
            class="w-full rounded-lg border border-slate-600/70 bg-slate-950/80 px-3 py-1.5 text-xs md:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300/60"
          />
        </div>
      </div>

      <div class="text-[11px] text-slate-400 md:self-end">
        {#if filteredProfiles.length === 0}
          0 resultados
        {:else}
          {filteredProfiles.length} contratista{filteredProfiles.length === 1 ? '' : 's'} encontrados
        {/if}
      </div>
    </div>

    <!-- Mensaje de error si el load falló -->
    {#if data.loadError}
      <div
        class="rounded-2xl border border-red-500/60 bg-red-500/10 px-5 py-3 text-sm text-red-100"
      >
        Hubo un problema al cargar los perfiles de trabajador. Intenta de nuevo más tarde.
      </div>
    {/if}

    <!-- Listado -->
    {#if data.profiles.length === 0}
      <div
        class="mt-2 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-5 py-6 text-sm text-slate-300"
      >
        <p class="font-semibold text-slate-100 mb-1">
          Aún no hay perfiles publicados.
        </p>
        <p class="text-xs text-slate-400">
          En cuanto los trabajadores completen su perfil, podrás verlos aquí y
          contactarlos directamente.
        </p>
      </div>
    {:else}
      {#if filteredProfiles.length === 0}
        <div
          class="mt-2 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-5 py-6 text-sm text-slate-300"
        >
          <p class="font-semibold text-slate-100 mb-1">
            No encontramos resultados con esos filtros.
          </p>
          <p class="text-xs text-slate-400">
            Prueba ajustando la búsqueda o limpiando los campos de filtro.
          </p>
        </div>
      {:else}
        <div class="grid md:grid-cols-2 gap-4 md:gap-5">
          {#each filteredProfiles as p}
            <article
              class="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-4 md:px-5 md:py-5 shadow-lg shadow-slate-950/60 flex flex-col justify-between"
            >
              <div class="space-y-2">
                <!-- Nombre y ciudad -->
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-base font-semibold text-slate-50">
                    {p.full_name || 'Nombre no disponible'}
                  </h2>
                  {#if p.city}
                    <span
                      class="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-200"
                    >
                      {p.city}
                    </span>
                  {/if}
                </div>

                <!-- Tags principales -->
                <div class="flex flex-wrap gap-2 text-[11px] text-slate-300">
                  {#if p.worker_type}
                    <span class="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5">
                      {workerTypeLabel[p.worker_type] ?? p.worker_type}
                    </span>
                  {/if}
                  {#if p.years_experience !== null}
                    <span class="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5">
                      {p.years_experience} año{p.years_experience === 1 ? '' : 's'} de experiencia
                    </span>
                  {/if}
                  {#if p.phone}
                    <span class="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5">
                      📞 {p.phone}
                    </span>
                  {/if}
                </div>

                <!-- Servicios -->
                {#if p.services && p.services.length > 0}
                  <p class="text-[11px] text-slate-300">
                    <span class="font-semibold text-slate-100">Servicios:</span>
                    {' '}{p.services.join(', ')}
                  </p>
                {/if}

                <!-- Certificaciones -->
                {#if p.certs && p.certs.length > 0}
                  <p class="text-[11px] text-slate-300">
                    <span class="font-semibold text-slate-100">Certificaciones:</span>
                    {' '}{p.certs.join(', ')}
                  </p>
                {/if}

                <!-- Bio -->
                {#if p.bio}
                  <p class="mt-1 text-[11px] text-slate-300 line-clamp-3">
                    {p.bio}
                  </p>
                {/if}
              </div>

              <!-- Footer de la card -->
              <div class="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  {#if p.created_at}
                    <p>
                      En la plataforma desde{' '}
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  {/if}
                </div>

                <div class="flex gap-2">
                  <!-- En el futuro esto puede ir a /workers/[id] o abrir contacto -->
                  <a
                    href={`tel:${p.phone ?? ''}`}
                    class="inline-flex items-center rounded-full border border-amber-400 px-3 py-1 font-semibold text-[11px] text-amber-200 hover:bg-amber-500/10 disabled:opacity-40"
                    aria-disabled={!p.phone}
                  >
                    {p.phone ? 'Llamar' : 'Sin teléfono'}
                  </a>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</section>
