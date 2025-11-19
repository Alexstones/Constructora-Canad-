<svelte:head>
  <title>Servicios | Gold Construction</title>
</svelte:head>

<section class="bg-slate-900 text-slate-100">
  <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
    <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-3">
      SERVICIOS
    </p>
    <h1 class="text-3xl md:text-4xl font-extrabold mb-3">
      Soluciones completas en construcción y remodelación
    </h1>
    <p class="text-sm md:text-base text-slate-300 max-w-2xl">
      Acompañamos tu proyecto desde la planeación hasta la entrega final:
      obras nuevas, remodelaciones, mantenimiento y acabados para espacios
      residenciales y comerciales en Canadá.
    </p>
  </div>
</section>

<section class="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">

  <!-- GRID PRINCIPAL -->
  <div class="grid md:grid-cols-3 gap-6">
    <!-- Drywall -->
    <a
      href="/services/drywall"
      class="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition p-6 flex flex-col"
    >
      <p class="text-xs font-semibold text-sky-700 mb-1">Drywall & Framing</p>
      <h2 class="text-lg font-semibold mb-2 group-hover:text-sky-700">
        Muros, techos y estructura ligera
      </h2>
      <p class="text-sm text-slate-600 flex-1">
        Instalación de muros y cielos, divisiones, framing metálico o de madera, y
        reparaciones con acabados listos para pintar.
      </p>
      <p class="mt-4 text-sm font-semibold text-sky-700">
        Ver detalle →
      </p>
    </a>

    <!-- Pintura -->
    <a
      href="/services/painting"
      class="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition p-6 flex flex-col"
    >
      <p class="text-xs font-semibold text-sky-700 mb-1">Pintura profesional</p>
      <h2 class="text-lg font-semibold mb-2 group-hover:text-sky-700">
        Interior, exterior y recubrimientos
      </h2>
      <p class="text-sm text-slate-600 flex-1">
        Renovación completa de espacios, protección de superficies, esquemas de color
        y acabados finos para casas y negocios.
      </p>
      <p class="mt-4 text-sm font-semibold text-sky-700">
        Ver detalle →
      </p>
    </a>

    <!-- Insulación -->
    <a
      href="/services/insulation"
      class="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition p-6 flex flex-col"
    >
      <p class="text-xs font-semibold text-sky-700 mb-1">Insulación & eficiencia</p>
      <h2 class="text-lg font-semibold mb-2 group-hover:text-sky-700">
        Confort térmico y ahorro energético
      </h2>
      <p class="text-sm text-slate-600 flex-1">
        Soluciones de insulación térmica y acústica para mejorar el confort y reducir
        costos de energía en tu propiedad.
      </p>
      <p class="mt-4 text-sm font-semibold text-sky-700">
        Ver detalle →
      </p>
    </a>
  </div>

  <!-- OTROS SERVICIOS -->
  <div class="grid md:grid-cols-2 gap-6">
    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 class="text-lg font-semibold mb-2">Remodelaciones integrales</h3>
      <p class="text-sm text-slate-600 mb-3">
        Coordinamos proyectos donde intervienen varios oficios: demolición, drywall,
        pintura, insulación, flooring y acabados.
      </p>
      <ul class="text-sm text-slate-600 list-disc pl-5 space-y-1">
        <li>Cocinas, baños y áreas sociales.</li>
        <li>Oficinas, locales comerciales y bodegas.</li>
        <li>Reconfiguración de espacios existentes.</li>
      </ul>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 class="text-lg font-semibold mb-2">Mantenimiento y reparaciones</h3>
      <p class="text-sm text-slate-600 mb-3">
        Atendemos daños puntuales y mantenimiento preventivo para mantener tus
        espacios en óptimas condiciones.
      </p>
      <ul class="text-sm text-slate-600 list-disc pl-5 space-y-1">
        <li>Reparación de grietas, golpes y filtraciones.</li>
        <li>Reparación de pintura y recubrimientos.</li>
        <li>Actualización y mejora de acabados.</li>
      </ul>
    </div>
  </div>

  <!-- CTA -->
  <div class="bg-sky-900 text-slate-50 rounded-2xl px-6 py-8 md:px-8 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h3 class="text-xl font-semibold mb-2">¿Tienes un proyecto en mente?</h3>
      <p class="text-sm text-slate-200 max-w-xl">
        Cuéntanos qué necesitas y te preparamos una propuesta clara con alcance,
        tiempos y costos estimados.
      </p>
    </div>
    <a
      href="/request-quote"
      class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-400 text-slate-900 text-sm font-semibold shadow hover:bg-amber-300"
    >
      Solicitar cotización
    </a>
  </div>
</section>
