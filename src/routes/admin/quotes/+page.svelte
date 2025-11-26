<script lang="ts">
  import { enhance } from '$app/forms';

  export let data: {
    quotes: any[];
    statusFilter: string;
  };

  const statusOptions = [
    { value: 'new', label: 'Nuevas' },
    { value: 'in_review', label: 'En revisión' },
    { value: 'completed', label: 'Completadas' },
    { value: 'all', label: 'Todas' }
  ];

  const statusLabels: Record<string, string> = {
    new: 'Nueva',
    in_review: 'En revisión',
    completed: 'Completada'
  };

  function statusClasses(status: string) {
    if (status === 'new') return 'bg-sky-500/10 text-sky-300 border-sky-400/60';
    if (status === 'in_review') return 'bg-amber-500/10 text-amber-200 border-amber-400/60';
    if (status === 'completed') return 'bg-emerald-500/10 text-emerald-200 border-emerald-400/60';
    return 'bg-slate-700/40 text-slate-200 border-slate-500/60';
  }

  // Para el filtro GET usamos una variable local y le damos valor inicial desde data
  let statusFilter = data.statusFilter;
</script>

<svelte:head>
  <title>Solicitudes de cotización | Admin</title>
</svelte:head>

<section class="min-h-[80vh] bg-slate-950 text-slate-50">
  <div class="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-6">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
          ADMIN · COTIZACIONES
        </p>
        <h1 class="text-2xl md:text-3xl font-extrabold mb-1">
          Solicitudes de cotización
        </h1>
        <p class="text-sm text-slate-300 max-w-2xl">
          Aquí puedes revisar y dar seguimiento a las solicitudes que llegan desde el formulario
          público de cotización.
        </p>
      </div>

      <!-- Filtro por estado -->
      <form method="GET" class="flex items-center gap-2 text-sm">
        <label
          class="text-xs font-semibold tracking-wide text-slate-300"
          for="status-filter"
        >
          Estado:
        </label>
        <select
          id="status-filter"
          name="status"
          class="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
          bind:value={statusFilter}
        >
          {#each statusOptions as opt}
            <option value={opt.value}>
              {opt.label}
            </option>
          {/each}
        </select>
        <button
          type="submit"
          class="text-xs font-semibold px-3 py-1.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white"
        >
          Filtrar
        </button>
      </form>
    </div>

    <!-- Contenido -->
    {#if data.quotes.length === 0}
      <div
        class="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-4 py-6 text-sm text-slate-300"
      >
        <p class="font-semibold text-slate-100 mb-1">
          No hay solicitudes en este estado.
        </p>
        <p class="text-xs text-slate-400">
          Cuando un cliente envíe una nueva solicitud desde el formulario de cotización,
          aparecerá en este listado.
        </p>
      </div>
    {:else}
      <div
        class="mt-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/60"
      >
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs text-slate-400">
            Mostrando <span class="font-semibold text-slate-100">{data.quotes.length}</span> solicitudes
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-xs md:text-sm text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-700 text-[11px] uppercase tracking-wide text-slate-400">
                <th class="py-2 pr-3">Fecha</th>
                <th class="py-2 pr-3">Cliente</th>
                <th class="py-2 pr-3">Contacto</th>
                <th class="py-2 pr-3">Servicio</th>
                <th class="py-2 pr-3">Ciudad</th>
                <th class="py-2 pr-3">Presupuesto</th>
                <th class="py-2 pr-3">Estado</th>
                <th class="py-2 pr-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              {#each data.quotes as q}
                <tr class="hover:bg-slate-800/60">
                  <!-- Fecha -->
                  <td class="py-3 pr-3 align-top text-slate-300 whitespace-nowrap">
                    {#if q.created_at}
                      {new Date(q.created_at).toLocaleDateString()}
                    {:else}
                      —
                    {/if}
                  </td>

                  <!-- Cliente -->
                  <td class="py-3 pr-3 align-top text-slate-50">
                    <div class="font-semibold text-xs md:text-sm">
                      {q.name}
                    </div>
                    <div class="text-[11px] text-slate-400">
                      ID: {q.id}
                    </div>
                  </td>

                  <!-- Contacto -->
                  <td class="py-3 pr-3 align-top text-slate-300">
                    <div class="text-[11px]">{q.email}</div>
                    {#if q.phone}
                      <div class="text-[11px] text-slate-400">{q.phone}</div>
                    {/if}
                  </td>

                  <!-- Servicio -->
                  <td class="py-3 pr-3 align-top text-slate-200">
                    <div class="text-xs">
                      {q.service || 'No especificado'}
                    </div>
                    {#if q.start_date}
                      <div class="text-[11px] text-slate-400">
                        Inicio estimado: {q.start_date}
                      </div>
                    {/if}
                  </td>

                  <!-- Ciudad -->
                  <td class="py-3 pr-3 align-top text-slate-200 whitespace-nowrap">
                    {q.city || '—'}
                  </td>

                  <!-- Presupuesto -->
                  <td class="py-3 pr-3 align-top text-amber-200 whitespace-nowrap">
                    {#if q.budget_range}
                      {q.budget_range}
                    {:else if q.budget}
                      {q.budget}
                    {:else}
                      No definido
                    {/if}
                  </td>

                  <!-- Estado -->
                  <td class="py-3 pr-3 align-top">
                    <span
                      class={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${statusClasses(
                        q.status
                      )}`}
                    >
                      {statusLabels[q.status] ?? q.status}
                    </span>
                  </td>

                  <!-- Acciones -->
                  <td class="py-3 pl-3 align-top">
                    <div class="flex flex-col items-end gap-1">
                      <!-- Cambiar estado -->
                      <form
                        method="POST"
                        action="?/changeStatus"
                        use:enhance
                        class="flex items-center gap-1"
                      >
                        <input type="hidden" name="id" value={q.id} />

                        <label
                          class="sr-only"
                          for={`status-${q.id}`}
                        >
                          Estado
                        </label>
                        <select
                          id={`status-${q.id}`}
                          name="status"
                          class="rounded-full border border-slate-600 bg-slate-950/90 px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/60"
                        >
                          <option value="new" selected={q.status === 'new'}>Nueva</option>
                          <option value="in_review" selected={q.status === 'in_review'}>
                            En revisión
                          </option>
                          <option value="completed" selected={q.status === 'completed'}>
                            Completada
                          </option>
                        </select>

                        <button
                          type="submit"
                          class="rounded-full bg-sky-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-sky-500"
                        >
                          Guardar
                        </button>
                      </form>

                      <!-- Eliminar -->
                      <form
                        method="POST"
                        action="?/deleteQuote"
                        use:enhance
                      >
                        <input type="hidden" name="id" value={q.id} />
                        <button
                          type="submit"
                          class="text-[11px] text-red-400 hover:text-red-300"
                          on:click={(event) => {
                            if (!confirm('¿Eliminar esta solicitud?')) {
                              event.preventDefault();
                            }
                          }}
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</section>
