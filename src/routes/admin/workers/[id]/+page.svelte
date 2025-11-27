<script lang="ts">
  export let data: {
    profile: {
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
      updated_at: string | null;
    } | null;
  };

  const p = data.profile;

  const workerTypeLabel: Record<string, string> = {
    independent: 'Independiente / freelancer',
    crew_lead: 'Líder de cuadrilla',
    subcontractor: 'Subcontratista',
    company: 'Empresa registrada'
  };
</script>

<svelte:head>
  <title>
    {p?.full_name
      ? `${p.full_name} | Perfil de trabajador`
      : 'Perfil de trabajador'}
  </title>
</svelte:head>

{#if !p}
  <section class="min-h-[60vh] bg-slate-950 text-slate-50 flex items-center justify-center">
    <p class="text-sm text-slate-300">Perfil no encontrado.</p>
  </section>
{:else}
  <section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
    <!-- luces -->
    <div
      class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-emerald-400/25 blur-3xl"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
    ></div>

    <div class="relative max-w-5xl mx-auto px-4 py-10 md:py-12 space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-emerald-300 mb-2">
            ADMIN · WORKER DETAIL
          </p>
          <h1 class="text-2xl md:text-3xl font-extrabold mb-1">
            {p.full_name || 'Perfil de trabajador'}
          </h1>
          <p class="text-sm text-slate-200 max-w-2xl">
            Vista detallada del perfil de trabajador. Aquí más adelante podrás aprobar,
            destacar o pausar el perfil en el marketplace.
          </p>
        </div>

        <div class="flex flex-col items-end gap-2 text-xs">
          <a
            href="/admin/workers"
            class="rounded-full border border-slate-600 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200"
          >
            ← Volver a la lista
          </a>
          <a
            href={`/workers/${p.id}`}
            target="_blank"
            class="rounded-full border border-sky-500 px-3 py-1.5 text-sky-200 hover:bg-sky-500/10"
          >
            Ver perfil público
          </a>
        </div>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 md:p-7 shadow-2xl shadow-slate-950/60 text-sm space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-lg font-semibold text-slate-50">
            {p.full_name || 'Nombre no especificado'}
          </h2>
          {#if p.city}
            <span
              class="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-200"
            >
              📍 {p.city}
            </span>
          {/if}
          {#if p.worker_type}
            <span
              class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-200"
            >
              {workerTypeLabel[p.worker_type] ?? p.worker_type}
            </span>
          {/if}
        </div>

        <div class="flex flex-wrap gap-3 text-[12px] text-slate-300">
          {#if p.years_experience !== null}
            <span class="inline-flex items-center rounded-full bg-slate-800 px-3 py-1">
              🛠 {p.years_experience} año{p.years_experience === 1 ? '' : 's'} de experiencia
            </span>
          {/if}
          {#if p.phone}
            <span class="inline-flex items-center rounded-full bg-slate-800 px-3 py-1">
              📞 {p.phone}
            </span>
          {/if}
        </div>

        {#if p.services && p.services.length > 0}
          <div class="space-y-1">
            <p class="text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Servicios principales
            </p>
            <p class="text-[13px] text-slate-200">
              {p.services.join(', ')}
            </p>
          </div>
        {/if}

        {#if p.certs && p.certs.length > 0}
          <div class="space-y-1">
            <p class="text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Certificaciones
            </p>
            <p class="text-[13px] text-slate-200">
              {p.certs.join(', ')}
            </p>
          </div>
        {/if}

        {#if p.bio}
          <div class="space-y-1">
            <p class="text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Descripción
            </p>
            <p class="text-[13px] text-slate-200 whitespace-pre-line">
              {p.bio}
            </p>
          </div>
        {/if}

        <div class="pt-2 border-t border-slate-800 mt-2 text-[11px] text-slate-500 flex flex-wrap gap-3">
          {#if p.created_at}
            <span>Creado: {new Date(p.created_at).toLocaleString()}</span>
          {/if}
          {#if p.updated_at}
            <span>Última actualización: {new Date(p.updated_at).toLocaleString()}</span>
          {/if}
          <span>user_id: {p.user_id}</span>
        </div>
      </div>
    </div>
  </section>
{/if}

