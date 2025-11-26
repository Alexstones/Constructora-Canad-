<script lang="ts">
  // Lo que llega desde +page.server.ts
  export let data: {
    userEmail: string;
  };
</script>

<svelte:head>
  <title>Panel de administración | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[80vh] bg-slate-950 text-slate-50">
  <!-- luces fondo -->
  <div
    class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
  ></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
          ADMIN PANEL
        </p>
        <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
          Panel de administración
        </h1>
        <p class="text-sm md:text-base text-slate-200 max-w-2xl">
          Desde aquí podrás revisar la actividad general de la plataforma,
          solicitudes de clientes y perfiles de trabajadores.
        </p>
      </div>

      <div class="text-xs text-slate-300 flex flex-col items-start md:items-end gap-1">
        <p class="font-semibold text-slate-100">
          Sesión de administrador
        </p>
        <p>{data.userEmail}</p>
      </div>
    </div>

    <!-- Tarjetas principales -->
    <div class="grid md:grid-cols-3 gap-4">
      <!-- COTIZACIONES -->
      <a
        href="/admin/quotes"
        class="rounded-2xl border border-sky-500/50 bg-slate-900/80 p-4 shadow-lg shadow-sky-900/60 hover:border-sky-300 hover:bg-slate-900 transition"
      >
        <p class="text-[11px] uppercase tracking-[0.2em] text-sky-300 mb-1.5">
          SOLICITUDES DE COTIZACIÓN
        </p>
        <p class="text-3xl font-extrabold text-sky-50">
          →
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Revisar las solicitudes enviadas desde la web y cambiar su estado.
        </p>
      </a>

      <!-- TRABAJOS PUBLICADOS -->
      <a
        href="/admin/jobs"
        class="rounded-2xl border border-amber-500/50 bg-slate-900/80 p-4 shadow-lg shadow-amber-900/60 hover:border-amber-300 hover:bg-slate-900 transition"
      >
        <p class="text-[11px] uppercase tracking-[0.2em] text-amber-300 mb-1.5">
          TRABAJOS PUBLICADOS
        </p>
        <p class="text-3xl font-extrabold text-amber-50">
          →
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Crear y administrar los trabajos visibles para los trabajadores.
        </p>
      </a>

      <!-- PERFILES DE TRABAJADOR -->
      <a
        href="/admin/workers"
        class="rounded-2xl border border-emerald-500/50 bg-slate-900/80 p-4 shadow-lg shadow-emerald-900/60 hover:border-emerald-300 hover:bg-slate-900 transition"
      >
        <p class="text-[11px] uppercase tracking-[0.2em] text-emerald-300 mb-1.5">
          PERFILES DE TRABAJADOR
        </p>
        <p class="text-3xl font-extrabold text-emerald-50">
          →
        </p>
        <p class="text-xs text-slate-400 mt-1">
          Ver y moderar los perfiles creados por los trabajadores en la plataforma.
        </p>
      </a>
    </div>

    <!-- Secciones de navegación -->
    <div class="grid lg:grid-cols-2 gap-6 mt-4">
      <div class="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-sm space-y-3">
        <h2 class="text-base font-semibold text-slate-50 mb-1">
          Gestión de la plataforma
        </h2>
        <ul class="space-y-2 text-slate-200 text-sm">
          <li>• Revisar solicitudes de cotización de clientes.</li>
          <li>• Administrar trabajos publicados en el marketplace.</li>
          <li>• Ver y moderar perfiles de trabajadores.</li>
          <li>• En futuras fases: manejar pagos, facturas y reportes.</li>
        </ul>
      </div>

      <div class="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-sm space-y-3">
        <h2 class="text-base font-semibold text-slate-50 mb-1">
          Atajos rápidos
        </h2>
        <div class="grid sm:grid-cols-2 gap-3 text-xs">
          <a
            href="/admin/quotes"
            class="rounded-xl border border-sky-400/60 bg-slate-950/70 px-4 py-3 text-left hover:border-sky-300 hover:bg-slate-900 transition"
          >
            Ver solicitudes de cotización
          </a>

          <a
            href="/admin/jobs"
            class="rounded-xl border border-amber-400/60 bg-slate-950/70 px-4 py-3 text-left hover:border-amber-300 hover:bg-slate-900 transition"
          >
            Administrar trabajos
          </a>

          <a
            href="/admin/workers"
            class="rounded-xl border border-emerald-400/60 bg-slate-950/70 px-4 py-3 text-left hover:border-emerald-300 hover:bg-slate-900 transition"
          >
            Ver trabajadores
          </a>

          <button
            type="button"
            class="rounded-xl border border-pink-400/60 bg-slate-950/70 px-4 py-3 text-left hover:border-pink-300 hover:bg-slate-900 transition"
          >
            Configuración avanzada (próximamente)
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
