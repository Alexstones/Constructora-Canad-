<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">

  <!-- NAVBAR -->
  <nav class="bg-white shadow-sm border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-sky-700 tracking-tight">
        GOLD CONSTRUCTION
      </a>

      <div class="flex items-center gap-6 text-sm font-medium">
        <a href="/" class="hover:text-sky-600">Inicio</a>
        <a href="/services" class="hover:text-sky-600">Servicios</a>
        <a href="/request-quote" class="hover:text-sky-600">Cotización</a>
        <a href="/contact" class="hover:text-sky-600">Contacto</a>
      </div>
    </div>
  </nav>

  <!-- MAIN CONTENT -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-200 py-8 mt-10">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h3 class="text-lg font-semibold">Gold Construction</h3>
        <p class="text-slate-400 text-sm">
          Más de 14 años construyendo y remodelando en Canadá.
        </p>
      </div>

      <div class="text-sm">
        <p>Email: info@goldconstruction.ca</p>
        <p>Tel: +1 (000) 000-0000</p>
      </div>
    </div>
    <p class="text-center text-xs text-slate-500 mt-6">
      © {new Date().getFullYear()} Gold Construction. Todos los derechos reservados.
    </p>
  </footer>

</div>
