<script lang="ts">
  import { type IContactForm } from "../../lib/Type";

  // Props de configuración (modificables desde el componente padre o API)
  export let sectionBadge: string = "Contacto";
  export let sectionTitle: string = "Iniciemos tu Proyecto";
  export let phoneText: string = "+57 (300) 123-4567";
  export let emailText: string = "proyectos@saraconstrucciones.com";
  export let officeText: string =
    "Cra. 10 # 20 - 30, Oficina 501 - Bogotá, Colombia";

  // Estado del formulario
  let formData: IContactForm = {
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    details: "",
  };

  let isSubmitting: boolean = false;
  let submitStatus: "idle" | "success" | "error" = "idle";

  // Manejador de envío con tipado explícito
  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    isSubmitting = true;
    submitStatus = "idle";

    try {
      // Simulación de latencia de red (Aquí se integrará el fetch hacia el backend DLUnire)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Payload enviado a la API de DLUnire:", formData);
      submitStatus = "success";

      // Limpiar formulario tras éxito
      formData = {
        fullName: "",
        email: "",
        phone: "",
        projectType: "",
        details: "",
      };
    } catch (error) {
      submitStatus = "error";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section id="contacto" class="contact">
  <div class="contact__container">
    <div class="contact__info">
      <span class="contact__badge">{sectionBadge}</span>
      <h2 class="contact__title">{sectionTitle}</h2>
      <p class="contact__description">
        Agenda una asesoría técnica sin costo. Cuéntanos tu idea y nuestro
        equipo de ingenieros y arquitectos estructurará una propuesta económica
        y técnica ajustada a tus requerimientos.
      </p>

      <div class="contact__channels">
        <div class="contact__channel-item">
          <span class="contact__channel-icon contact__channel-icon--phone"
          ></span>
          <div>
            <h4 class="contact__channel-label">Línea Directa</h4>
            <p class="contact__channel-value">{phoneText}</p>
          </div>
        </div>

        <div class="contact__channel-item">
          <span class="contact__channel-icon contact__channel-icon--email"
          ></span>
          <div>
            <h4 class="contact__channel-label">Correo Electrónico</h4>
            <p class="contact__channel-value">{emailText}</p>
          </div>
        </div>

        <div class="contact__channel-item">
          <span class="contact__channel-icon contact__channel-icon--office"
          ></span>
          <div>
            <h4 class="contact__channel-label">Oficina Principal</h4>
            <p class="contact__channel-value">{officeText}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="contact__form-wrapper">
      {#if submitStatus === "success"}
        <div class="contact__alert contact__alert--success">
          <h3 class="contact__alert-title">¡Solicitud Recibida!</h3>
          <p>
            Un ingeniero de proyectos se pondrá en contacto contigo en las
            próximas 24 horas hábiles para evaluar los planos y detalles.
          </p>
          <button
            class="contact__btn contact__btn--inline"
            onclick={() => (submitStatus = "idle")}
          >
            Enviar otro mensaje
          </button>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="contact__form">
          {#if submitStatus === "error"}
            <div class="contact__alert contact__alert--error">
              <p>
                Ocurrió un error al procesar tu solicitud. Por favor, inténtalo
                de nuevo o contáctanos directamente.
              </p>
            </div>
          {/if}

          <div class="contact__group">
            <label for="fullName" class="contact__label"
              >Nombre Completo *</label
            >
            <input
              type="text"
              id="fullName"
              required
              disabled={isSubmitting}
              bind:value={formData.fullName}
              placeholder="Ej. Juan Pérez"
              class="contact__input"
            />
          </div>

          <div class="contact__row">
            <div class="contact__group">
              <label for="email" class="contact__label"
                >Correo Electrónico *</label
              >
              <input
                type="email"
                id="email"
                required
                disabled={isSubmitting}
                bind:value={formData.email}
                placeholder="juan@ejemplo.com"
                class="contact__input"
              />
            </div>

            <div class="contact__group">
              <label for="phone" class="contact__label"
                >Teléfono de Contacto *</label
              >
              <input
                type="tel"
                id="phone"
                required
                disabled={isSubmitting}
                bind:value={formData.phone}
                placeholder="300 123 4567"
                class="contact__input"
              />
            </div>
          </div>

          <div class="contact__group">
            <label for="projectType" class="contact__label"
              >Tipo de Proyecto *</label
            >
            <div class="contact__select-wrapper">
              <select
                id="projectType"
                required
                disabled={isSubmitting}
                bind:value={formData.projectType}
                class="contact__input contact__input--select"
              >
                <option value="" disabled selected>Selecciona una opción</option
                >
                <option value="residencial"
                  >Construcción Residencial (Casa / Edificio)</option
                >
                <option value="comercial"
                  >Infraestructura Comercial o Industrial</option
                >
                <option value="remodelacion"
                  >Remodelación Integral de Espacios</option
                >
                <option value="diseno"
                  >Diseño Arquitectónico y Planos técnicos</option
                >
              </select>
            </div>
          </div>

          <div class="contact__group">
            <label for="details" class="contact__label"
              >Detalles de la Obra o Mensaje</label
            >
            <textarea
              id="details"
              rows="4"
              disabled={isSubmitting}
              bind:value={formData.details}
              placeholder="Cuéntanos brevemente sobre los metros cuadrados, ubicación o estado del terreno..."
              class="contact__input contact__input--textarea"
            ></textarea>
          </div>

          <button type="submit" class="contact__btn" disabled={isSubmitting}>
            {isSubmitting
              ? "Procesando Cotización..."
              : "Enviar Solicitud de Proyecto"}
          </button>
        </form>
      {/if}
    </div>
  </div>
</section>
