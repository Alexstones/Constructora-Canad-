<script lang="ts">
  export let form;
</script>

<svelte:head>
  <title>Iniciar sesión | Gold Construction</title>
</svelte:head>

<section class="min-h-[70vh] flex items-center justify-center bg-slate-100">
  <div class="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
    <h1 class="text-xl font-bold text-slate-900">Inicia sesión en tu cuenta</h1>

    {#if form?.message}
      <p class="text-sm text-red-600">{form.message}</p>
    {/if}

    <form method="POST" class="space-y-4">
      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-700">Correo electrónico</label>
        <input
          name="email"
          type="email"
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={form?.email ?? ''}
          required
        />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-700">Contraseña</label>
        <input
          name="password"
          type="password"
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-full bg-sky-700 text-white text-sm font-semibold py-2 hover:bg-sky-800"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</section>

