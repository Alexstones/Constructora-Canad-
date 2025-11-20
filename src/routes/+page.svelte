<svelte:head>
  <title>Gold Construction | Construcción y remodelación en Canadá</title>
</svelte:head>

<!-- HERO -->
<section class="relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900"></div>

  <!-- “brillos” de fondo -->
  <div class="absolute -top-32 -left-20 h-80 w-80 bg-amber-400/20 rounded-full blur-3xl"></div>
  <div class="absolute -bottom-40 right-0 h-96 w-96 bg-sky-400/20 rounded-full blur-3xl"></div>

  <div class="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center text-white">
    <!-- Texto principal -->
    <div>
      <p class="text-xs uppercase tracking-[0.2em] text-amber-300 mb-3">
        CONSTRUCCIÓN • REMODELACIÓN • ACABADOS
      </p>

      <h1 class="text-3xl md:text-5xl font-extrabold leading-tight">
        Construcción profesional
        <span class="text-amber-300">en Canadá</span>
      </h1>

      <p class="mt-4 text-sm md:text-base text-slate-100/90 max-w-xl">
        Ejecutamos proyectos residenciales y comerciales con altos estándares
        de calidad, seguridad y cumplimiento. Drywall, pintura, insulación,
        framing, reparaciones y más.
      </p>

      <div class="mt-8 flex flex-wrap gap-4">
        <a
          href="/request-quote"
          class="inline-flex items-center px-6 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold text-sm shadow-lg hover:bg-amber-300"
        >
          Solicitar cotización
        </a>

        <a
          href="/services"
          class="inline-flex items-center px-6 py-3 rounded-full border border-white/40 text-sm font-semibold hover:bg-white/10"
        >
          Ver todos los servicios
        </a>
      </div>

      <div class="mt-8 flex flex-wrap gap-8 text-xs md:text-sm text-slate-100/80">
        <div>
          <p class="text-2xl font-bold text-amber-300">14+</p>
          <p>Años de experiencia</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-amber-300">120+</p>
          <p>Proyectos completados</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-amber-300">4.9★</p>
          <p>Clientes satisfechos</p>
        </div>
      </div>
    </div>

    <!-- Tarjeta lateral -->
    <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 md:p-7">
      <h2 class="text-lg font-semibold mb-3">Proyectos que inspiran confianza</h2>
      <p class="text-sm text-slate-100/90 mb-5">
        Nuestro equipo combina experiencia técnica, mano de obra calificada y una
        comunicación clara durante todo el proceso de obra.
      </p>

      <ul class="space-y-3 text-sm">
        <li class="flex gap-3">
          <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
          <span>Planificación y supervisión profesional de cada proyecto.</span>
        </li>
        <li class="flex gap-3">
          <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
          <span>Equipos especializados en drywall, pintura, insulación y acabados.</span>
        </li>
        <li class="flex gap-3">
          <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
          <span>Compromiso con tiempos, presupuesto y normas de seguridad.</span>
        </li>
      </ul>

      <div class="mt-6 border-t border-white/10 pt-4 text-xs text-slate-100/70">
        <p>“Buscamos que cada cliente se sienta acompañado y seguro durante todo su proyecto.”</p>
      </div>
    </div>
  </div>
</section>

<!-- SECCIÓN SERVICIOS -->
<section class="max-w-6xl mx-auto px-4 py-14">
  <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
    <div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2">Servicios principales</h2>
      <p class="text-sm text-slate-600 max-w-xl">
        Soluciones integrales para proyectos residenciales y comerciales: desde
        remodelaciones puntuales hasta obras completas.
      </p>
    </div>
    <a href="/services" class="text-sm font-semibold text-sky-700 hover:text-sky-800">
      Ver detalle de servicios →
    </a>
  </div>

  <div class="grid md:grid-cols-3 gap-6">
    <a href="/services/drywall" class="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition">
      <p class="text-xs font-semibold text-sky-700 mb-1">01</p>
      <h3 class="font-semibold text-lg mb-2 group-hover:text-sky-700">Drywall & Framing</h3>
      <p class="text-sm text-slate-600">
        Muros, techos, divisiones y reparaciones con acabados limpios y duraderos.
      </p>
    </a>

    <a href="/services/painting" class="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition">
      <p class="text-xs font-semibold text-sky-700 mb-1">02</p>
      <h3 class="font-semibold text-lg mb-2 group-hover:text-sky-700">Pintura profesional</h3>
      <p class="text-sm text-slate-600">
        Interior y exterior, recubrimientos, protección y renovación de espacios.
      </p>
    </a>

    <a href="/services/insulation" class="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition">
      <p class="text-xs font-semibold text-sky-700 mb-1">03</p>
      <h3 class="font-semibold text-lg mb-2 group-hover:text-sky-700">Insulación & eficiencia</h3>
      <p class="text-sm text-slate-600">
        Ahorro energético, confort térmico y soluciones acústicas para tu proyecto.
      </p>
    </a>
  </div>
</section>

<!-- BANDA DE CONFIANZA -->
<section class="bg-white border-y border-slate-200">
  <div class="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
    <div>
      <p class="font-semibold mb-1 text-slate-900">Empresa registrada</p>
      <p class="text-slate-600">Operamos bajo normativas locales y seguros de responsabilidad.</p>
    </div>
    <div>
      <p class="font-semibold mb-1 text-slate-900">Presupuestos claros</p>
      <p class="text-slate-600">Propuestas detalladas, sin costos sorpresa.</p>
    </div>
    <div>
      <p class="font-semibold mb-1 text-slate-900">Acompañamiento total</p>
      <p class="text-slate-600">Te acompañamos desde la idea hasta la entrega final del proyecto.</p>
    </div>
  </div>
</section>
<section class="max-w-6xl mx-auto px-4 pb-16 pt-4">
  <div class="bg-slate-900 text-slate-50 rounded-2xl px-6 py-7 md:px-8 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-1">
        PARA CONTRATISTAS Y TRABAJADORES
      </p>
      <h3 class="text-xl font-semibold mb-2">
        ¿Ofreces servicios de construcción en Canadá?
      </h3>
      <p class="text-sm text-slate-200 max-w-xl">
        Regístrate en nuestra plataforma para recibir solicitudes de trabajo,
        mostrar tu experiencia y construir tu reputación con clientes reales.
      </p>
    </div>
    <div class="flex gap-3">
      <a
        href="/auth/register"
        class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-amber-400 text-slate-900 text-sm font-semibold shadow hover:bg-amber-300"
      >
        Crear cuenta
      </a>
      <a
        href="/auth/login"
        class="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-slate-400 text-sm font-semibold hover:bg-slate-800/40"
      >
        Ya tengo cuenta
      </a>
    </div>
  </div>
</section>
