<script lang="ts">
  // No necesitamos props aquí por ahora
</script>

<svelte:head>
  <title>¿Eres trabajador? | Gold Construction</title>
</svelte:head>

<section class="relative min-h-[70vh] bg-slate-950 text-slate-50">
  <!-- Luces de fondo -->
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl"></div>

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-10 items-center">
    <!-- Texto principal -->
    <div class="space-y-4">
      <p class="text-xs uppercase tracking-[0.25em] text-amber-300">
        WORKFORCE
      </p>
      <h1 class="text-3xl md:text-4xl font-extrabold">
        ¿Eres trabajador de la construcción?
      </h1>
      <p class="text-sm md:text-base text-slate-200">
        Regístrate en la plataforma para recibir oportunidades de trabajo en
        drywall, framing, pintura, insulación, reparaciones y más. Crea tu perfil
        profesional y conecta con clientes que buscan mano de obra calificada.
      </p>

      <ul class="text-xs text-slate-300 space-y-1.5">
        <li>• Crea tu perfil profesional con experiencia y servicios.</li>
        <li>• Recibe solicitudes de proyectos cerca de tu ciudad.</li>
        <li>• Lleva control de trabajos desbloqueados y completados.</li>
        <li>• Más adelante podrás subir fotos y ver tus reviews.</li>
      </ul>
    </div>

    <!-- Tarjeta de acción -->
    <div class="p-[3px] rounded-3xl bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 shadow-2xl shadow-sky-900/60">
      <div class="bg-slate-950/95 backdrop-blur rounded-[22px] px-6 py-7 md:px-7 md:py-8 space-y-5 border border-white/10">
        <h2 class="text-lg font-semibold text-slate-50">
          Únete a la red de trabajadores de Gold Construction
        </h2>
        <p class="text-sm text-slate-300">
          Crea una cuenta gratuita, completa tu perfil y empieza a recibir
          oportunidades cuando haya proyectos que coincidan con tus servicios.
        </p>

        <div class="space-y-3">
          <a
            href="/auth/register"
            class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-amber-400 text-slate-950 text-sm font-semibold shadow-lg hover:bg-amber-300"
          >
            Crear cuenta de trabajador
          </a>

          <a
            href="/auth/login"
            class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-slate-600 bg-slate-900/70 text-slate-100 text-sm font-semibold hover:border-sky-400 hover:text-sky-200"
          >
            Ya tengo cuenta, iniciar sesión
          </a>
        </div>

        <p class="text-[11px] text-slate-400">
          Una vez dentro podrás configurar tu perfil, ver tu dashboard y revisar
          trabajos disponibles en la plataforma.
        </p>
      </div>
    </div>
  </div>
</section>
