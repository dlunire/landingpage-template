<script lang="ts">
    import type { IService } from "../../lib/Type";

    // Contrato de interfaz estricta para el catálogo de soluciones
    // Props con datos temporales especializados en el ramo de la construcción
    export let sectionBadge: string = "Qué Hacemos";
    export let sectionTitle: string =
        "Soluciones Integrales en Ingeniería y Arquitectura";
    export let sectionSubtitle: string =
        "Ofrecemos un portafolio de servicios diseñado para cubrir desde la concepción del plano hasta la entrega final de la obra de manera determinista.";

    export let servicesList: IService[] = [
        {
            id: "obras-civiles",
            title: "Obras Civiles e Infraestructura",
            description:
                "Construcción estructural de cimentaciones, vigas, pórticos y mampostería pesada bajo normativas sismorresistentes vigentes.",
            iconCode: "crane",
            features: [
                "Estructuras de concreto",
                "Movimiento de tierras",
                "Redes hidrosanitarias",
            ],
        },
        {
            id: "remodelaciones",
            title: "Remodelaciones de Alto Impacto",
            description:
                "Optimización y modernización de espacios comerciales, corporativos y residenciales con acabados de primera calidad.",
            iconCode: "trowel",
            features: [
                "Drywall y cielos falsos",
                "Pisos y revestimientos",
                "Pintura estructural",
            ],
        },
        {
            id: "diseno-arq",
            title: "Diseño Arquitectónico y Renders",
            description:
                "Modelado espacial y desarrollo de planos técnicos combinados con visualización 3D hiperrealista antes de iniciar la ejecución.",
            iconCode: "blueprint",
            features: [
                "Planos arquitectónicos",
                "Renders e interiorismo",
                "Licencias de construcción",
            ],
        },
        {
            id: "interventoria",
            title: "Gestión y Supervisión de Obra",
            description:
                "Control riguroso de presupuestos, interventoría técnica de materiales y aseguramiento del cronograma de obra establecido.",
            iconCode: "chart",
            features: [
                "Control de costos",
                "Auditoría de materiales",
                "Seguridad industrial",
            ],
        },
    ];
</script>

<section id="services" class="services">
    <div class="services__container">
        <!-- Encabezado de la Sección -->
        <div class="services__header">
            <span class="services__badge">{sectionBadge}</span>
            <h2 class="services__title">{sectionTitle}</h2>
            <p class="services__subtitle">{sectionSubtitle}</p>
        </div>

        <!-- Grid Modular de Servicios -->
        <div class="services__grid">
            {#each servicesList as service}
                <div class="services__card">
                    <div class="services__card-header">
                        <div class="services__icon-box">
                            <!-- Glifo geométrico basado en el iconCode -->
                            <span
                                class="services__icon services__icon--{service.iconCode}"
                            ></span>
                        </div>
                        <h3 class="services__card-title">{service.title}</h3>
                    </div>

                    <p class="services__card-desc">{service.description}</p>

                    <!-- Checklist técnico de especialidades -->
                    <ul class="services__feature-list">
                        {#each service.features as feature}
                            <li class="services__feature-item">
                                <span class="services__check-dot"></span>
                                {feature}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </div>
</section>
