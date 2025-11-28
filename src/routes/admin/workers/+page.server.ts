<!-- src/routes/admin/workers/+page.svelte -->
<script lang="ts">
  export let data: {
    // userEmail viene del layout /admin (si lo usas allí)
    userEmail?: string;
    profiles: {
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
      is_approved: boolean;
    }[];
    error?: string;
  };

  const workerTypeLabel: Record<string, string> = {
    independent: 'Independiente / freelancer',
    crew_lead: 'Líder de cuadrilla',
    subcontractor: 'Subcontratista',
    company: 'Empresa registrada'
  };
</script>

<svelte:head>
  <title>Perfiles de trabajador | Panel admin</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- luces -->
  <div
    class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-emerald-400/25 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
  ></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-emerald-300 mb-2">
          ADMIN · WORKERS
        </p>
        <h1 class="text-2xl md:text-3xl font-extrabold mb-1">
          Perfiles de trabajador
        </h1>
        <p class="text-sm text-slate-200 max-w-2xl">
          Aquí puedes revisar los perfiles creados por los trabajadores en la plataforma
          y decidir cuáles se muestran en la página pública de contratistas.
        </p>
      </div>

      <a
        href="/admin"
        class="text-xs rounded-full border border-slate-600 px-3 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200"
      >
        ← Volver al panel
      </a>
    </div>

    {#if data.error}
      <div class="rounded-xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-xs text-red-100">
        {data.error}
      </div>
    {/if}

    <!-- Contenido -->
    {#if data.profiles.length === 0}
      <div
        class="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-5 py-6 text-sm text-slate-300"
      >
        <p class="font-semibold text-slate-100 mb-1">
          Aún no hay perfiles de trabajador.
        </p>
        <p class="text-xs text-slate-400">
          Cuando los usuarios completen su perfil como trabajador, aparecerán aquí
          para que puedas revisarlos.
        </p>
      </div>
    {:else}
      <div
        class="mt-4 rounded-2xl border border-slate-700 bg-slate-900/80 shadow-lg shadow-slate-950/60 overflow-hidden"
      >
        <div class="border-b border-slate-800 px-5 py-3 flex items-center justify-between">
          <p class="text-xs font-semibold tracking-wide text-slate-200">
            {data.profiles.length} perfil{data.profiles.length === 1 ? '' : 'es'} encontrados
          </p>
          <p class="text-[11px] text-slate-500">
            Solo los perfiles <span class="font-semibold text-emerald-300">aprobados</span> aparecerán
            en la página pública “Find Contractor”.
          </p>
        </div>

        <div class="divide-y divide-slate-800">
          {#each data.profiles as p}
            <article class="px-5 py-4 grid md:grid-cols-[2.2fr,1.4fr] gap-4 md:gap-6 text-xs">
              <!-- Columna principal -->
              <div class="space-y-1.5">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-sm font-semibold text-slate-50">
                    {p.full_name || 'Nombre no especificado'}
                  </h2>
                  {#if p.city}
                    <span
                      class="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-200"
                    >
                      {p.city}
                    </span>
                  {/if}
                </div>

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

                {#if p.services && p.services.length > 0}
                  <p class="text-[11px] text-slate-300">
                    <span class="font-semibold text-slate-100">Servicios:</span>
                    {' '}{p.services.join(', ')}
                  </p>
                {/if}

                {#if p.certs && p.certs.length > 0}
                  <p class="text-[11px] text-slate-300">
                    <span class="font-semibold text-slate-100">Certificaciones:</span>
                    {' '}{p.certs.join(', ')}
                  </p>
                {/if}

                {#if p.bio}
                  <p class="mt-1 text-[11px] text-slate-300 line-clamp-3">
                    {p.bio}
                  </p>
                {/if}
              </div>

              <!-- Columna lateral -->
              <div class="flex flex-col justify-between gap-2 text-[11px] text-slate-400">
                <div class="space-y-1">
                  {#if p.created_at}
                    <p>
                      <span class="font-semibold text-slate-200">Creado:</span>
                      {' '}
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  {/if}
                  {#if p.updated_at}
                    <p>
                      <span class="font-semibold text-slate-200">Actualizado:</span>
                      {' '}
                      {new Date(p.updated_at).toLocaleDateString()}
                    </p>
                  {/if}
                  <p class="text-[10px] text-slate-500">
                    user_id: {p.user_id}
                  </p>

                  <!-- Estado de aprobación -->
                  <p class="mt-2">
                    {#if p.is_approved}
                      <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] text-emerald-200 border border-emerald-400/50">
                        ✔ Aprobado para aparecer en público
                      </span>
                    {:else}
                      <span class="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] text-amber-200 border border-amber-400/60">
                        ⏳ Pendiente de aprobación
                      </span>
                    {/if}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 pt-1">
                  <!-- Botón para ver cómo se ve en la página pública (futuro: detalle) -->
                  <a
                    href="/find-contractor"
                    class="inline-flex items-center rounded-full border border-slate-600 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-400 hover:text-sky-200"
                    target="_blank"
                  >
                    Ver en listado público
                  </a>

                  <!-- Form para aprobar / despublicar -->
                  <form method="POST" class="inline-flex">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="approve"
                      value={p.is_approved ? 'false' : 'true'}
                    />
                    <button
                      type="submit"
                      class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold
                        {p.is_approved
                          ? 'border-slate-500 text-slate-200 hover:bg-slate-800/60'
                          : 'border-emerald-400 text-emerald-200 hover:bg-emerald-500/15'}"
                    >
                      {p.is_approved ? 'Ocultar del público' : 'Aprobar y mostrar'}
                    </button>
                  </form>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
