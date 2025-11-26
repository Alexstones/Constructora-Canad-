<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';

  export let data: PageData;

  const formatDate = (value: string | null | undefined) => {
    if (!value) return 'Sin fecha';
    const d = new Date(value);
    return d.toLocaleDateString();
  };
</script>

<svelte:head>
  <title>Trabajos publicados | Admin | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- luces -->
  <div
    class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
  ></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
          ADMIN · TRABAJOS
        </p>
        <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
          Trabajos publicados
        </h1>
        <p class="text-sm md:text-base text-slate-200 max-w-2xl">
          Desde aquí puedes crear nuevos trabajos para el marketplace y actualizar su estado.
        </p>
      </div>

      <a
        href="/admin"
        class="inline-flex items-center text-xs rounded-full border border-slate-600 px-4 py-1.5 text-slate-200 hover:border-sky-400 hover:text-sky-200"
      >
        ← Volver al panel
      </a>
    </div>

    <!-- Formulario crear trabajo -->
    <div class="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 space-y-4">
      <h2 class="text-sm font-semibold text-slate-50">
        Crear nuevo trabajo
      </h2>

      {#if data?.form?.action === 'create' && data?.form?.errors?.general}
        <p class="text-xs text-red-400">{data.form.errors.general}</p>
      {/if}

      <form method="POST" action="?/create" use:enhance class="grid md:grid-cols-2 gap-4 text-sm">
        <div class="md:col-span-2">
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Título del trabajo *
          </label>
          <input
            name="title"
            type="text"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Ej: Instalación de drywall en sótano"
            value={data?.form?.values?.title ?? ''}
          />
          {#if data?.form?.errors?.title}
            <p class="mt-1 text-xs text-red-400">{data.form.errors.title}</p>
          {/if}
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Ciudad
          </label>
          <input
            name="city"
            type="text"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50"
            placeholder="Toronto, ON"
            value={data?.form?.values?.city ?? ''}
          />
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Tipo de servicio
          </label>
          <select
            name="service_type"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50"
            value={data?.form?.values?.service_type ?? ''}
          >
            <option value="">Seleccionar…</option>
            <option value="drywall">Drywall / Framing</option>
            <option value="painting">Pintura</option>
            <option value="insulation">Insulación</option>
            <option value="repairs">Reparaciones</option>
            <option value="other">Otro / general</option>
          </select>
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Presupuesto mínimo (CAD)
          </label>
          <input
            name="budget_min"
            type="number"
            step="1"
            min="0"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50"
            value={data?.form?.values?.budget_min ?? ''}
          />
          {#if data?.form?.errors?.budget_min}
            <p class="mt-1 text-xs text-red-400">{data.form.errors.budget_min}</p>
          {/if}
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Presupuesto máximo (CAD)
          </label>
          <input
            name="budget_max"
            type="number"
            step="1"
            min="0"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50"
            value={data?.form?.values?.budget_max ?? ''}
          />
          {#if data?.form?.errors?.budget_max}
            <p class="mt-1 text-xs text-red-400">{data.form.errors.budget_max}</p>
          {/if}
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Estado
          </label>
          <select
            name="status"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50"
            value={data?.form?.values?.status ?? 'open'}
          >
            <option value="open">Open (visible para trabajadores)</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[11px] font-semibold text-slate-300 mb-1">
            Descripción *
          </label>
          <textarea
            name="description"
            rows="3"
            class="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-50 resize-y"
            placeholder="Breve descripción del trabajo, alcances, tipo de propiedad, etc."
          >{data?.form?.values?.description ?? ''}</textarea>
          {#if data?.form?.errors?.description}
            <p class="mt-1 text-xs text-red-400">{data.form.errors.description}</p>
          {/if}
        </div>

        <div class="md:col-span-2 flex justify-end pt-1">
          <button
            type="submit"
            class="inline-flex items-center rounded-full bg-sky-600 px-6 py-2 text-xs font-semibold text-white hover:bg-sky-500"
          >
            Publicar trabajo
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de trabajos -->
    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-slate-50">
        Trabajos creados
      </h2>

      {#if data.loadError}
        <p class="text-xs text-red-400">{data.loadError}</p>
      {/if}

      {#if !data.jobs || data.jobs.length === 0}
        <p class="text-xs text-slate-400">
          Aún no hay trabajos creados.
        </p>
      {:else}
        <div class="space-y-3">
          {#each data.jobs as job}
            <article class="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-sm">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 class="text-sm font-semibold text-slate-50 mb-0.5">
                    {job.title}
                  </h3>
                  <p class="text-[11px] text-slate-400 mb-1.5">
                    {job.city || 'Ciudad no especificada'}
                    {job.service_type ? ` · ${job.service_type}` : ''}
                    {' · '}Creado: {formatDate(job.created_at)}
                  </p>
                  <p class="text-xs text-slate-200 mb-1">
                    {job.description}
                  </p>
                  {#if job.budget_min || job.budget_max}
                    <p class="text-[11px] text-amber-300">
                      Presupuesto estimado:
                      {job.budget_min ? ` $${job.budget_min}` : ''}
                      {job.budget_max ? ` - $${job.budget_max}` : ''}
                    </p>
                  {/if}
                </div>

                <div class="flex flex-col items-end gap-2 text-[11px]">
                  <!-- Estado -->
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 border text-[11px]
                    {job.status === 'open'
                      ? 'border-emerald-400 text-emerald-200 bg-emerald-500/10'
                      : job.status === 'in_progress'
                      ? 'border-amber-400 text-amber-200 bg-amber-500/10'
                      : job.status === 'completed'
                      ? 'border-sky-400 text-sky-200 bg-sky-500/10'
                      : 'border-slate-500 text-slate-200 bg-slate-700/40'}"
                  >
                    {job.status}
                  </span>

                  <!-- Cambiar estado -->
                  <form method="POST" action="?/update_status" class="flex items-center gap-2">
                    <input type="hidden" name="id" value={job.id} />
                    <select
                      name="status"
                      class="rounded-full border border-slate-600 bg-slate-950 px-3 py-1 text-[11px] text-slate-100"
                    >
                      <option value="open" selected={job.status === 'open'}>Open</option>
                      <option value="in_progress" selected={job.status === 'in_progress'}>En progreso</option>
                      <option value="completed" selected={job.status === 'completed'}>Completado</option>
                      <option value="archived" selected={job.status === 'archived'}>Archivado</option>
                    </select>
                    <button
                      type="submit"
                      class="rounded-full bg-slate-700 px-3 py-1 font-semibold hover:bg-slate-600"
                    >
                      Actualizar
                    </button>
                  </form>

                  <!-- Eliminar -->
                  <form
                    method="POST"
                    action="?/delete"
                    on:submit|preventDefault={(e) => {
                      if (confirm('¿Eliminar este trabajo?')) e.currentTarget.submit();
                    }}
                  >
                    <input type="hidden" name="id" value={job.id} />
                    <button
                      type="submit"
                      class="text-[11px] text-red-400 hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
