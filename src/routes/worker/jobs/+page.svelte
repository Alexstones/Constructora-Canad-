<script lang="ts">
  import { enhance } from '$app/forms';

  export let data: {
    profile: {
      city: string | null;
      services: string[] | null;
    } | null;
    jobs: {
      id: number;
      quote_id: number | null;
      client_email: string;
      city: string | null;
      service: string | null;
      budget: string | null;
      title: string | null;
      description: string | null;
      status: string;
      is_unlocked_for_worker: boolean;
      created_at: string;
    }[];
    error?: string;
  };

  export let form: any;
</script>

<svelte:head>
  <title>Trabajos disponibles | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl"></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-sky-300 mb-2">
          WORKER · JOBS
        </p>
        <h1 class="text-2xl md:text-3xl font-extrabold mb-1">
          Trabajos disponibles para ti
        </h1>
        <p class="text-sm text-slate-200 max-w-2xl">
          Estos trabajos se filtran usando tu ciudad y servicios del perfil de trabajador.
          Más adelante este módulo será la base del "matching" tipo Uber.
        </p>
      </div>

      <a
        href="/worker"
        class="text-xs rounded-full border border-slate-600 px-3 py-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
      >
        ← Volver a mi perfil
      </a>
    </div>

    {#if data.profile}
      <div class="text-[11px] text-slate-400 border border-slate-700 bg-slate-900/80 rounded-xl px-4 py-3">
        <p>
          <span class="font-semibold text-slate-200">Filtros activos:</span>
          {' '}
          {data.profile.city ? `Ciudad: ${data.profile.city}` : 'Ciudad: (no especificada)'}
          {' · '}
          {data.profile.services && data.profile.services.length > 0
            ? `Servicio principal: ${data.profile.services[0]}`
            : 'Servicio principal: (no especificado)'}
        </p>
      </div>
    {/if}

    {#if data.error}
      <div class="rounded-xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-xs text-red-100">
        {data.error}
      </div>
    {/if}

    {#if data.jobs.length === 0}
      <div class="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-5 py-6 text-sm text-slate-300">
        <p class="font-semibold text-slate-100 mb-1">
          No hay trabajos disponibles que coincidan con tu perfil por ahora.
        </p>
        <p class="text-xs text-slate-400">
          Revisa más tarde o actualiza tu ciudad y servicios en tu perfil para recibir más oportunidades.
        </p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each data.jobs as job}
          <article class="rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-xs shadow-lg shadow-slate-950/60">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div class="space-y-1.5">
                <h2 class="text-sm font-semibold text-slate-50">
                  {job.title || 'Trabajo sin título'}
                </h2>
                <p class="text-[11px] text-slate-300">
                  {#if job.city}
                    <span class="font-semibold text-slate-100">Ubicación:</span> {job.city}
                  {/if}
                  {#if job.service}
                    {' · '}
                    <span class="font-semibold text-slate-100">Servicio:</span> {job.service}
                  {/if}
                  {#if job.budget}
                    {' · '}
                    <span class="font-semibold text-slate-100">Presupuesto:</span> {job.budget}
                  {/if}
                </p>

                {#if job.is_unlocked_for_worker}
                  <!-- info completa -->
                  {#if job.description}
                    <p class="mt-1 text-[11px] text-slate-200">
                      {job.description}
                    </p>
                  {/if}
                  <p class="mt-1 text-[10px] text-slate-500">
                    Cliente: {job.client_email}
                  </p>
                {:else}
                  <!-- info limitada -->
                  <p class="mt-1 text-[11px] text-slate-300">
                    Información detallada del cliente y del proyecto está bloqueada.
                    Puedes desbloquearla para ver todos los detalles.
                  </p>
                {/if}
              </div>

              <div class="flex flex-col items-start md:items-end gap-2 min-w-[180px]">
                <p class="text-[10px] text-slate-500">
                  Creado el {new Date(job.created_at).toLocaleDateString()}
                </p>

                {#if job.is_unlocked_for_worker}
                  <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-200 border border-emerald-400/60">
                    ✔ Información desbloqueada
                  </span>
                {:else}
                  <form method="POST" use:enhance class="inline-flex">
                    <input type="hidden" name="job_id" value={job.id} />
                    <button
                      type="submit"
                      class="inline-flex items-center rounded-full border border-amber-400 px-3 py-1 text-[11px] font-semibold text-amber-200 hover:bg-amber-500/15"
                    >
                      Desbloquear detalles (demo)
                    </button>
                  </form>
                {/if}
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>
