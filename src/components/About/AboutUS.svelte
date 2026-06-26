<script lang="ts">
    // Contrato para los pilares corporativos
    interface IPillar {
        title: string;
        description: string;
        iconCode: string; // Representación lógica para iconos
    }

    // Props con contenido temporal de relleno para la constructora
    export let sectionBadge: string = "Nuestra Trayectoria";
    export let title: string =
        "Construimos con Solidez, Diseñamos para el Futuro";
    export let mainText: string =
        "En Sara Construcciones fusionamos la ingeniería de precisión con el diseño arquitectónico de vanguardia. Llevamos años transformando visiones en realidades estructurales estables, priorizando la optimización de recursos y el cumplimiento riguroso de tiempos de entrega.";
    export let secondaryText: string =
        "Nos especializamos tanto en proyectos residenciales de alta gama como en infraestructura comercial. Nuestro enfoque se centra en la seguridad estructural, el uso de materiales certificados y una gestión transparente en cada fase de obra.";

    export let experienceYears: number = 15;
    export let completedProjects: number = 120;

    export let pillars: IPillar[] = [
        {
            title: "Calidad Certificada",
            description:
                "Garantizamos la máxima resistencia y acabados impecables utilizando materiales de primera línea controlados bajo normas estrictas.",
            iconCode: "building",
        },
        {
            title: "Cumplimiento Estricto",
            description:
                "Respetamos el cronograma de obra y la planificación presupuestaria de manera determinista, eliminando sorpresas o retrasos injustificados.",
            iconCode: "calendar",
        },
        {
            title: "Seguridad Estructural",
            description:
                "Cada plano y cimentación pasa por rigurosos análisis de ingeniería civil para asegurar una estabilidad atemporal.",
            iconCode: "shield",
        },
    ];
</script>

<section id="nosotros" class="about-us">
    <div class="about-us__container">
        <!-- Bloque de Texto e Impacto -->
        <div class="about-us__narrative">
            <span class="about-us__badge">{sectionBadge}</span>
            <h2 class="about-us__title">{title}</h2>
            <p class="about-us__paragraph about-us__paragraph--highlight">
                {mainText}
            </p>
            <p class="about-us__paragraph">{secondaryText}</p>

            <!-- Métricas de Confianza -->
            <div class="about-us__stats">
                <div class="about-us__stat-card">
                    <span class="about-us__stat-number">+{experienceYears}</span
                    >
                    <span class="about-us__stat-label">Años de Experiencia</span
                    >
                </div>
                <div class="about-us__stat-card">
                    <span class="about-us__stat-number"
                        >+{completedProjects}</span
                    >
                    <span class="about-us__stat-label">Obras Entregadas</span>
                </div>
            </div>
        </div>

        <!-- Bloque de Pilares / Valores -->
        <div class="about-us__pillars">
            {#each pillars as pillar}
                <div class="about-us__pillar-card">
                    <div class="about-us__pillar-icon-wrapper">
                        <!-- Icono decorativo CSS puro simulando el iconCode -->
                        <span
                            class="about-us__pillar-icon about-us__pillar-icon--{pillar.iconCode}"
                        ></span>
                    </div>
                    <div class="about-us__pillar-info">
                        <h3 class="about-us__pillar-title">{pillar.title}</h3>
                        <p class="about-us__pillar-desc">
                            {pillar.description}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss" src="./AboutUs.scss"></style>
