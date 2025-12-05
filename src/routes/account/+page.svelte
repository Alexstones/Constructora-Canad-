<script lang="ts">
  export let data: {
    email: string;
    role: string | null;
  };

  $: panelHref =
    data.role === 'admin'
      ? '/admin'
      : data.role === 'worker'
      ? '/worker'
      : '/';
</script>

<svelte:head>
  <title>Mi cuenta | Gold Construction</title>
</svelte:head>

<section class="min-h-[70vh] bg-slate-50 flex items-center">
  <div class="max-w-md mx-auto px-4 py-10">
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <h1 class="text-xl font-bold text-slate-900 mb-2">Mi cuenta</h1>

      <div class="space-y-1 text-sm">
        <p>
          <span class="font-semibold text-slate-700">Correo:</span>
          {' '}{data.email}
        </p>
        <p>
          <span class="font-semibold text-slate-700">Rol:</span>
          {' '}
          {#if data.role === 'admin'}
            Administrador
          {:else if data.role === 'worker'}
            Contratista / Worker
          {:else}
            Cliente
          {/if}
        </p>
      </div>

      <div class="pt-3 flex flex-col gap-2">
        <a
          href={panelHref}
          class="inline-flex items-center justify-center rounded-full bg-sky-700 text-white text-sm font-semibold px-4 py-2 hover:bg-sky-800"
        >
          Ir a mi panel
        </a>
        <form method="POST" action="/auth/logout">
          <button
            type="submit"
            class="w-full inline-flex items-center justify-center rounded-full border border-red-400 text-red-500 text-xs font-semibold px-4 py-2 hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
