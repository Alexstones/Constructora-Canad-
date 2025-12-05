<script lang="ts">
  export let data: {
    availableJobs: {
      id: string;
      title: string | null;
      city: string | null;
      service_type: string | null;
      budget_min: number | null;
      budget_max: number | null;
      description: string | null;
      created_at: string | null;
    }[];
    unlockedJobs: any[];
    stats: {
      openJobsCount: number;
      unlockedJobsCount: number;
      completedJobsCount: number;
    };
  };
</script>

<svelte:head>
  <title>Dashboard trabajador | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- Luces de fondo (NO self-closing) -->
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl"></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
          WORKFORCE DASHBOARD
        </p>
        <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
          Tu panel como trabajador
        </h1>
        <p class="text-sm md:text-base text-slate-200 max-w-2xl">
          Desde aquí podrás revisar oportunidades disponibles, ver los trabajos que has
          desbloqueado y hacer seguimiento a tu actividad dentro de la plataforma.
        </p>
      </div>

      <div class="flex flex-col items-start md:items-end gap-2 text-sm">
        <a
          href="/worker/profile"
          class="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-200"
        >
          Editar perfil
        </a>
        <p class="text-[11px] text-slate-400 max-w-xs md:text-right">
          Te recomendamos mantener tu perfil completo y actualizado para aumentar tus
          posibilidades de ser elegido por clientes.
        </p>
      </div>
    </div>

    <!-- Tarjetas de stats -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="rounded-2xl border border-sky-500/40 bg-slate-900/70 p-4 shadow-lg shadow-sky-900/60">
        <p class="text-[11px] uppercase tracking-[0.2em] text-sky-300 mb-1.5">
          TRABAJOS DISPONIBLES
        </p>
        <p class="text-3xl font-extrabold text-sky-100">
          {data.stats.openJobsCount}
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Coinciden con el estado "Open" en la plataforma.
        </p>
      </div>

      <div class="rounded-2xl border border-amber-500/40 bg-slate-900/70 p-4 shadow-lg shadow-amber-900/60">
        <p class="text-[11px] uppercase tracking-[0.2em] text-amber-300 mb-1.5">
          TRABAJOS DESBLOQUEADOS
        </p>
        <p class="text-3xl font-extrabold text-amber-100">
          {data.stats.unlockedJobsCount}
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Próximamente podrás ver aquí los trabajos que ya desbloqueaste.
        </p>
      </div>

      <div class="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-4 shadow-lg shadow-emerald-900/60">
        <p class="text-[11px] uppercase tracking-[0.2em] text-emerald-300 mb-1.5">
          TRABAJOS COMPLETADOS
        </p>
        <p class="text-3xl font-extrabold text-emerald-100">
          {data.stats.completedJobsCount}
        </p>
        <p class="text-xs text-slate-400 mt-1">
          En una siguiente fase conectaremos esta métrica con contratos cerrados.
        </p>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="grid lg:grid-cols-[1.7fr,1.1fr] gap-6 lg:gap-8 items-start">
      <!-- Columna izquierda: trabajos -->
      <div class="space-y-5">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-lg font-semibold text-slate-50">
            Trabajos disponibles
          </h2>
          <span class="rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 text-[11px] text-slate-300">
            Estado: Open
          </span>
        </div>

        {#if data.availableJobs.length === 0}
          <div class="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-6 text-sm text-slate-300">
            <p class="font-semibold mb-1 text-slate-100">
              Aún no hay trabajos disponibles.
            </p>
            <p class="text-xs text-slate-400">
              Cuando los clientes creen nuevas solicitudes, aparecerán aquí. Mientras tanto,
              asegúrate de que tu perfil esté completo y listo para ser mostrado.
            </p>
          </div>
        {:else}
          <div class="space-y-4">
            {#each data.availableJobs as job}
              <article
                class="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-900/40 transition"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-sm md:text-base font-semibold text-slate-50 mb-1">
                      {job.title}
                    </h3>
                    <p class="text-xs text-slate-400 mb-1">
                      {job.city || 'Ciudad no especificada'} · {job.service_type || 'Servicio general'}
                    </p>
                  </div>
                  <div class="text-right text-xs text-slate-300">
                    {#if job.budget_min || job.budget_max}
                      <p class="font-semibold text-amber-200">
                        {job.budget_min ? `$${job.budget_min}` : '—'}
                        {job.budget_max ? ` - $${job.budget_max}` : ''}
                      </p>
                      <p class="text-[11px] text-slate-500">
                        Estimado de cliente
                      </p>
                    {/if}
                  </div>
                </div>

                <p class="mt-3 text-xs text-slate-200 line-clamp-3">
                  {job.description}
                </p>

                <div
                  class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px]"
                >
                  <p class="text-slate-400">
                    Creado:{' '}
                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : 'Sin fecha'}
                  </p>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full border border-sky-400 px-4 py-1.5 font-semibold text-[11px] text-sky-100 hover:bg-sky-500/20"
                    >
                      Ver detalles
                    </button>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-1.5 font-semibold text-[11px] text-slate-950 hover:bg-amber-300"
                    >
                      Desbloquear trabajo
                    </button>
                  </div>
                </div>
              </article>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Columna derecha: resumen / reviews / tips -->
      <aside class="space-y-4 lg:space-y-5">
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 text-sm">
          <h3 class="text-sm font-semibold text-slate-50 mb-2">
            Tu reputación en la plataforma
          </h3>
          <p class="text-xs text-slate-300 mb-2">
            Más adelante mostraremos aquí tu calificación promedio, número de reviews
            y resumen de desempeño según proyectos completados.
          </p>
          <div
            class="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-xs text-slate-300"
          >
            ⭐ En una siguiente fase conectaremos este módulo con contratos cerrados y reviews de
            clientes.
          </div>
        </div>

        <div class="rounded-2xl border border-sky-500/40 bg-slate-900/70 p-5 text-xs text-slate-100">
          <h3 class="text-sm font-semibold mb-2 text-sky-100">
            Tips para conseguir más trabajos
          </h3>
          <ul class="space-y-1.5 text-slate-300">
            <li>• Completa tu perfil con experiencia, servicios y certificados.</li>
            <li>• Explica claramente en tu bio qué tipos de proyectos dominas.</li>
            <li>• Cuando esté disponible, sube fotos de proyectos anteriores.</li>
            <li>• Responde rápido cuando un cliente te contacte.</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>
