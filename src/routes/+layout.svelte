<script lang="ts">
  import '../app.css';
  // esto viene del +layout.server.ts
  export let data;
</script>

<div class="min-h-screen flex flex-col bg-slate-100">

  <!-- NAVBAR -->
  <nav class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

      <!-- LOGO NUEVO -->
      <a href="/" class="flex items-center gap-3">
        <img 
          src="/img/construccion.jpeg"
          alt="The Gold Construction"
          class="h-10 w-auto object-contain"
        />

        <div class="leading-tight">
          <p class="font-extrabold text-slate-900 tracking-tight text-sm md:text-base">
            GOLD CONSTRUCTION
          </p>
          <p class="text-xs text-slate-500">
            Building & Remodeling in Canada
          </p>
        </div>
      </a>
      <!-- FIN LOGO NUEVO -->

      <!-- MENU PRINCIPAL -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <a href="/" class="hover:text-sky-700">Inicio</a>
        <a href="/services" class="hover:text-sky-700">Servicios</a>
        <a href="/request-quote" class="hover:text-sky-700">Cotización</a>
        <a href="/contact" class="hover:text-sky-700">Contacto</a>
      </div>

      <!-- ACCIONES DERECHA -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Botón para trabajadores (visible siempre) -->
        <a
          href="/worker"
          class="text-xs font-semibold px-4 py-2 rounded-full bg-amber-500 text-slate-900 shadow hover:bg-amber-400"
        >
          ¿Eres trabajador?
        </a>

        {#if data?.user}
          <!-- Si está logueado -->

          {#if data?.userRole?.is_admin}
            <!-- Botón ADMIN solo para admins -->
            <a
              href="/admin"
              class="text-xs font-semibold px-4 py-2 rounded-full bg-slate-900 text-amber-300 border border-amber-400/70 shadow hover:bg-slate-800"
            >
              Admin
            </a>
          {/if}

          <a
            href="/worker/dashboard"
            class="text-xs font-semibold text-slate-700 hover:text-sky-700"
          >
            Mi cuenta
          </a>

          <form method="POST" action="/auth/logout">
            <button
              type="submit"
              class="text-xs font-semibold text-red-500 hover:text-red-600"
            >
              Cerrar sesión
            </button>
          </form>
        {:else}
          <!-- Cuando NO está logueado -->
          <a 
            href="/auth/login"
            class="text-xs font-semibold text-slate-700 hover:text-sky-700"
          >
            Iniciar sesión
          </a>

          <a
            href="/auth/register"
            class="text-xs font-semibold px-4 py-2 rounded-full bg-sky-700 text-white shadow hover:bg-sky-800"
          >
            Registrarse
          </a>
        {/if}
      </div>
      <!-- FIN ACCIONES DERECHA -->

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
        <p>Tel: +1 (437) 214-7837</p>
        <p>Toronto, Ontario, Canadá</p>

        <!-- REDES NUEVAS -->
        <div class="mt-3 space-y-1">
          <a href="https://www.facebook.com/share/1BrUoocEKz/" target="_blank" class="block hover:text-amber-300">Facebook</a>
          <a href="https://www.instagram.com/thegoldconstructionca?igsh=MXBpZHN5cWU2NzJxaw==" target="_blank" class="block hover:text-amber-300">Instagram</a>
          <a href="https://www.tiktok.com/@the.gold.construc?_r=1&_t=ZM-91Xg82e6KVf" target="_blank" class="block hover:text-amber-300">TikTok</a>
        </div>
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
