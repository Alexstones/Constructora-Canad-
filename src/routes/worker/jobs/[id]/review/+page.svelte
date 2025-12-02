<script lang="ts">
  import { enhance } from '$app/forms';

  export let data: {
    job: {
      id: number;
      title: string | null;
      city: string | null;
      service: string | null;
      worker_id: string | null;
    };
  };

  export let form: any;
</script>

<svelte:head>
  <title>Calificar trabajo | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[70vh] bg-slate-950 text-slate-50">
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"></div>

  <div class="relative max-w-xl mx-auto px-4 py-10 md:py-12 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-[0.25em] text-emerald-300 mb-2">
        Reseña de trabajo
      </p>
      <h1 class="text-2xl font-extrabold mb-1">
        Cuéntanos cómo te fue
      </h1>
      <p class="text-sm text-slate-200">
        Tu opinión ayuda a otros clientes a elegir buenos contratistas y a los trabajadores a
        construir su reputación.
      </p>
    </div>

    <div class="rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-xs text-slate-200 space-y-1.5">
      <p class="font-semibold text-slate-50">
        {data.job.title || 'Trabajo sin título'}
      </p>
      <p class="text-slate-300">
        {#if data.job.city}
          {data.job.city}
        {/if}
        {#if data.job.service}
          {' · '}
          {data.job.service}
        {/if}
      </p>
    </div>

    {#if form?.error}
      <div class="rounded-xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-xs text-red-100">
        {form.error}
      </div>
    {/if}

    {#if form?.success}
      <div class="rounded-xl border border-emerald-400/70 bg-emerald-500/15 px-4 py-3 text-xs text-emerald-50">
        ✅ ¡Gracias por tu reseña! Tu calificación se ha registrado.
      </div>
    {/if}

    <form method="POST" use:enhance class="space-y-5 text-sm">
      <div>
        <label
          for="client_email"
          class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
        >
          Tu correo (opcional)
        </label>
        <input
          id="client_email"
          name="client_email"
          type="email"
          class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300/60"
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <p class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5">
          Calificación general *
        </p>
        <div class="flex items-center gap-3 text-[13px] text-slate-200">
          {#each [1, 2, 3, 4, 5] as star}
            <label class="inline-flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                class="accent-amber-400"
              />
              {star} ⭐
            </label>
          {/each}
        </div>
      </div>

      <div>
        <label
          for="comment"
          class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
        >
          Comentario
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300/60 resize-y"
          placeholder="¿Qué fue lo que más te gustó? ¿Hay algo que se pueda mejorar?"
        ></textarea>
      </div>

      <button
        type="submit"
        class="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 text-sm font-semibold shadow-lg shadow-sky-900/70 hover:from-emerald-300 hover:to-sky-300 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        Enviar reseña
      </button>
    </form>
  </div>
</section>
