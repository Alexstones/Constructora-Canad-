<script lang="ts">
  import { enhance } from '$app/forms';

  export let form: any;
  export let data: {
    profile: {
      id: number;
      user_id: string;
      full_name: string | null;
      city: string | null;
      phone: string | null;
      services: string[] | null;
      years_experience: number | null;
      worker_type: string | null;
      certs: string[] | null;
      bio: string | null;
      created_at: string | null;
      updated_at: string | null;
    } | null;
  };

  const profileServices: string[] = data?.profile?.services ?? [];
  const profileCerts: string[] = data?.profile?.certs ?? [];

  let workerTypeValue =
    form?.values?.worker_type ?? data?.profile?.worker_type ?? 'independent';
</script>

<svelte:head>
  <title>Perfil de trabajador | Gold Construction</title>
</svelte:head>

<section class="relative overflow-hidden bg-slate-950 text-slate-50">
  <div class="pointer-events-none absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
  <div class="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />

  <div class="relative max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-8">
    <div>
      <p class="text-xs uppercase tracking-[0.25em] text-amber-300 mb-2">
        WORKFORCE PROFILE
      </p>
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
        Configura tu perfil profesional
      </h1>
      <p class="text-sm md:text-base text-slate-200 max-w-2xl">
        Este perfil se mostrará a los clientes cuando estén buscando contratistas
        para sus proyectos de construcción, remodelación o mantenimiento.
      </p>
    </div>

    {#if form?.success}
      <div class="mb-4 rounded-xl border border-emerald-300/70 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-50 shadow">
        ✅ Perfil guardado correctamente. Ya apareces en el listado de contratistas.
      </div>
    {/if}

    {#if form?.errors?.general}
      <div class="mb-4 rounded-xl border border-red-400/70 bg-red-500/15 px-4 py-3 text-sm text-red-100 shadow">
        {form.errors.general}
      </div>
    {/if}

    <div
      class="p-[3px] rounded-3xl bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 shadow-2xl shadow-sky-900/60"
    >
      <form
        method="POST"
        use:enhance
        class="bg-slate-950/95 backdrop-blur rounded-[22px] px-6 py-7 md:px-7 md:py-8 space-y-6 border border-white/10"
      >
        <!-- Datos básicos -->
        <div class="grid md:grid-cols-[2fr,1fr] gap-6">
          <div class="space-y-4">
            <div>
              <label
                for="full_name"
                class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
              >
                Nombre completo *
              </label>
              <input
                id="full_name"
                name="full_name"
                class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60"
                placeholder="Tu nombre y apellido"
                value={form?.values?.full_name ?? data?.profile?.full_name ?? ''}
              />
              {#if form?.errors?.full_name}
                <p class="mt-1 text-xs font-semibold text-amber-300">
                  {form.errors.full_name}
                </p>
              {/if}
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  for="city"
                  class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
                >
                  Ciudad / Provincia *
                </label>
                <input
                  id="city"
                  name="city"
                  class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60"
                  placeholder="Ej. Toronto, Ontario"
                  value={form?.values?.city ?? data?.profile?.city ?? ''}
                />
                {#if form?.errors?.city}
                  <p class="mt-1 text-xs font-semibold text-amber-300">
                    {form.errors.city}
                  </p>
                {/if}
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
                >
                  Teléfono de contacto *
                </label>
                <input
                  id="phone"
                  name="phone"
                  class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60"
                  placeholder="+1 (___) ___ ____"
                  value={form?.values?.phone ?? data?.profile?.phone ?? ''}
                />
                {#if form?.errors?.phone}
                  <p class="mt-1 text-xs font-semibold text-amber-300">
                    {form.errors.phone}
                  </p>
                {/if}
              </div>
            </div>
          </div>

          <!-- “Foto” placeholder -->
          <div
            class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/70 px-4 py-6 text-center text-xs text-slate-400"
          >
            <p class="font-semibold text-slate-100 mb-1">
              Foto de perfil
            </p>
            <p class="mb-3">
              Más adelante podrás subir una foto real para tu perfil profesional.
            </p>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-slate-500 px-4 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-800/70"
            >
              Próximamente
            </button>
          </div>
        </div>

        <!-- Servicios -->
        <div class="space-y-3">
          <p class="text-xs font-semibold tracking-wide text-slate-200">
            Servicios que ofreces *
          </p>
          {#if form?.errors?.services}
            <p class="text-[11px] font-semibold text-amber-300">
              {form.errors.services}
            </p>
          {/if}
          <div class="grid md:grid-cols-2 gap-3 text-xs text-slate-100">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value="drywall"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileServices.includes('drywall')}
              />
              Drywall / Framing
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value="painting"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileServices.includes('painting')}
              />
              Pintura interior / exterior
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value="insulation"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileServices.includes('insulation')}
              />
              Insulación
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value="repairs"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileServices.includes('repairs')}
              />
              Reparaciones / mantenimiento
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value="full_renovations"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileServices.includes('full_renovations')}
              />
              Remodelaciones completas
            </label>
          </div>
        </div>

        <!-- Experiencia -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label
              for="years_experience"
              class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
            >
              Años de experiencia
            </label>
            <input
              id="years_experience"
              name="years_experience"
              type="number"
              min="0"
              class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60"
              placeholder="Ej. 5"
              value={form?.values?.years_experience ?? data?.profile?.years_experience ?? ''}
            />
            {#if form?.errors?.years_experience}
              <p class="mt-1 text-xs font-semibold text-amber-300">
                {form.errors.years_experience}
              </p>
            {/if}
          </div>

          <div>
            <label
              for="worker_type"
              class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
            >
              ¿Trabajas como?
            </label>
            <select
              id="worker_type"
              name="worker_type"
              bind:value={workerTypeValue}
              class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/60"
            >
              <option value="independent">Independiente / freelancer</option>
              <option value="crew_lead">Líder de cuadrilla</option>
              <option value="subcontractor">Subcontratista</option>
              <option value="company">Empresa registrada</option>
            </select>
          </div>
        </div>

        <!-- Certificaciones -->
        <div class="space-y-3">
          <p class="text-xs font-semibold tracking-wide text-slate-200">
            Certificaciones y seguridad
          </p>
          <div class="grid md:grid-cols-2 gap-3 text-xs text-slate-100">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="certs"
                value="whmis"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileCerts.includes('whmis')}
              />
              WHMIS
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="certs"
                value="working_at_heights"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileCerts.includes('working_at_heights')}
              />
              Working at Heights
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="certs"
                value="wsib"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileCerts.includes('wsib')}
              />
              WSIB / Insurance
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                name="certs"
                value="first_aid"
                class="rounded border-slate-500 bg-slate-900"
                checked={profileCerts.includes('first_aid')}
              />
              First Aid / CPR
            </label>
          </div>
        </div>

        <!-- Bio -->
        <div>
          <label
            for="bio"
            class="block text-xs font-semibold tracking-wide text-slate-200 mb-1.5"
          >
            Descripción de tu experiencia *
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/60 resize-y"
            placeholder="Cuéntanos brevemente en qué tienes más experiencia, tipos de proyectos, ciudades donde has trabajado, etc."
          >{form?.values?.bio ?? data?.profile?.bio ?? ''}</textarea>
          {#if form?.errors?.bio}
            <p class="mt-1 text-xs font-semibold text-amber-300">
              {form.errors.bio}
            </p>
          {/if}
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
          <p class="text-[11px] text-slate-400 max-w-sm">
            Este perfil será usado para mostrarte en el marketplace de contratistas.
            Más adelante podrás actualizarlo y añadir fotos de tus proyectos.
          </p>

          <button
            type="submit"
            class="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-amber-300 text-slate-950 text-sm font-semibold shadow-lg shadow-sky-900/70 hover:from-sky-300 hover:to-amber-200 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Guardar perfil
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
