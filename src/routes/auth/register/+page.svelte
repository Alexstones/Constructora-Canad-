<script lang="ts">
  import { enhance } from '$app/forms';
  export let form: any;
</script>

<svelte:head>
  <title>Registrarse | Gold Construction</title>
</svelte:head>

<section class="min-h-[70vh] bg-slate-50 flex items-center">
  <div class="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-center">
    <div class="space-y-3">
      <p class="text-xs uppercase tracking-[0.25em] text-amber-600">
        REGISTRO
      </p>
      <h1 class="text-3xl font-extrabold text-slate-950">
        Crea tu cuenta en Gold Construction
      </h1>
      <p class="text-sm text-slate-600">
        Regístrate como <span class="font-semibold">cliente</span> para solicitar
        proyectos o como <span class="font-semibold">contratista / worker</span> para
        ofrecer tus servicios.
      </p>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-7">
      {#if form?.success}
        <div
          class="mb-4 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800"
        >
          ✅ Cuenta creada correctamente. Ahora puedes
          <a href="/auth/login" class="font-semibold underline">iniciar sesión</a>
          con tu correo y contraseña.
        </div>
      {/if}

      <form method="POST" use:enhance class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">
            Nombre completo
          </label>
          <input
            name="name"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Tu nombre"
            value={form?.values?.name ?? ''}
          />
          {#if form?.errors?.name}
            <p class="mt-1 text-xs text-red-500">{form.errors.name}</p>
          {/if}
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="tu@email.com"
            value={form?.values?.email ?? ''}
          />
          {#if form?.errors?.email}
            <p class="mt-1 text-xs text-red-500">{form.errors.email}</p>
          {/if}
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Mínimo 6 caracteres"
          />
          {#if form?.errors?.password}
            <p class="mt-1 text-xs text-red-500">{form.errors.password}</p>
          {/if}
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">
            Tipo de cuenta
          </label>
          <select
            name="role"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="worker">Contratista / Worker</option>
            <option value="client">Cliente</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-sky-700 text-white text-sm font-semibold hover:bg-sky-800"
        >
          Crear cuenta
        </button>

        <p class="text-[11px] text-slate-500 text-center">
          ¿Ya tienes cuenta?
          <a href="/auth/login" class="text-sky-700 font-semibold">Inicia sesión</a>
        </p>
      </form>
    </div>
  </div>
</section>
