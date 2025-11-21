<script lang="ts">
  import { enhance } from '$app/forms';
  export let form: any;
</script>

<svelte:head>
  <title>Iniciar sesión | Gold Construction</title>
</svelte:head>

<section class="min-h-[70vh] bg-slate-50 flex items-center">
  <div class="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
    
    <!-- LEFT SIDE -->
    <div class="space-y-3">
      <p class="text-xs uppercase tracking-[0.25em] text-sky-700">
        ACCESO
      </p>
      <h1 class="text-3xl font-extrabold text-slate-950">
        Inicia sesión en tu cuenta
      </h1>
      <p class="text-sm text-slate-600">
        Accede a tus solicitudes, proyectos y perfil como cliente o contratista.
      </p>
    </div>

    <!-- LOGIN CARD -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-7">

      {#if form?.success}
        <div class="mb-4 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          ✅ Iniciando sesión...
        </div>
      {/if}

      <form method="POST" use:enhance class="space-y-4">

        <!-- EMAIL -->
        <div>
          <label for="email" class="block text-xs font-semibold text-slate-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="tu@email.com"
            value={form?.values?.email ?? ''}
          />
          {#if form?.errors?.email}
            <p class="mt-1 text-xs text-red-500">{form.errors.email}</p>
          {/if}
        </div>

        <!-- PASSWORD -->
        <div>
          <label for="password" class="block text-xs font-semibold text-slate-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Tu contraseña"
          />
          {#if form?.errors?.password}
            <p class="mt-1 text-xs text-red-500">{form.errors.password}</p>
          {/if}
        </div>

        <!-- SUBMIT -->
        <button
          type="submit"
          class="w-full inline-flex items-center justify-center px-4 py-2.5 
                 rounded-md bg-sky-700 text-white text-sm font-semibold hover:bg-sky-800"
        >
          Iniciar sesión
        </button>

        <!-- REGISTER LINK -->
        <p class="text-[11px] text-slate-500 text-center">
          ¿Aún no tienes cuenta?
          <a href="/auth/register" class="text-sky-700 font-semibold">Regístrate</a>
        </p>

      </form>
    </div>
  </div>
</section>
