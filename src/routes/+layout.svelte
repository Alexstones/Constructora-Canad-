<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-slate-100">

  <!-- NAVBAR -->
  <nav class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <div class="h-9 w-9 rounded-full bg-gradient-to-tr from-sky-700 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow">
          GC
        </div>
        <div class="leading-tight">
          <p class="font-extrabold text-slate-900 tracking-tight text-sm md:text-base">
            GOLD CONSTRUCTION
          </p>
          <p class="text-xs text-slate-500">
            Building & Remodeling in Canada
          </p>
        </div>
      </a>

      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <a href="/" class="hover:text-sky-700">Inicio</a>
        <a href="/services" class="hover:text-sky-700">Servicios</a>
        <a href="/request-quote" class="hover:text-sky-700">Cotización</a>
        <a href="/contact" class="hover:text-sky-700">Contacto</a>
      </div>

      <a
        href="/request-quote"
        class="hidden md:inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full bg-sky-700 text-white shadow hover:bg-sky-800"
      >
        Obtener cotización
      </a>
    </div>
  </nav>

  <!-- MAIN -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-200 mt-16">
    <div class="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Gold Construction</h3>
        <p class="text-sm text-slate-400">
          Más de 14 años construyendo y remodelando espacios residenciales y comerciales en Canadá.
        </p>
      </div>
      <div class="text-sm">
        <p class="font-semibold mb-1">Contacto</p>
        <p>Email: info@goldconstruction.ca</p>
        <p>Tel: +1 (000) 000-0000</p>
        <p>Ciudad / Provincia, Canadá</p>
      </div>
      <div class="text-sm">
        <p class="font-semibold mb-1">Horario</p>
        <p>Lunes a Viernes: 8:00am – 6:00pm</p>
        <p>Sábados: 9:00am – 1:00pm</p>
      </div>
    </div>
    <p class="text-center text-xs text-slate-500 pb-5">
      © {new Date().getFullYear()} Gold Construction. Todos los derechos reservados.
    </p>
  </footer>
</div>
