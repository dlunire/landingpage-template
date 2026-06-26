<script lang="ts">
    import { onMount } from "svelte";
    import Splide from "@splidejs/splide";
    import type { IProject } from "../../lib/Type";

    // Props con datos de relleno temporal optimizados para constructoras
    export let sectionBadge: string = "Portafolio";
    export let sectionTitle: string = "Obras que dejas huella";

    export let projectsList: IProject[] = [
        {
            id: "torre-sara-alta",
            title: "Torre Sara Alta Vista",
            type: "Residencial",
            location: "Norte de la Ciudad",
            status: "En ejecución",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: "centro-comercial-st",
            title: "Plaza Comercial Steel",
            type: "Comercial",
            location: "Zona Industrial",
            status: "Entregado",
            image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: "condominio-horizonte",
            title: "Condominio Horizontes",
            type: "Residencial",
            location: "Valle Verde",
            status: "En ejecución",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: "complejo-logistico-sara",
            title: "Complejo Logístico Sara S.A.",
            type: "Industrial",
            location: "Vía Principal Km 12",
            status: "Entregado",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
        },
    ];

    let projectsSliderRef: HTMLElement;
    let splideInstance: Splide;

    onMount(() => {
        // Configuración multipágina responsiva para las tarjetas de proyectos
        splideInstance = new Splide(projectsSliderRef, {
            type: "loop",
            perPage: 3,
            perMove: 1,
            gap: "32px",
            arrows: true,
            pagination: false,
            breakpoints: {
                1024: {
                    perPage: 2,
                    gap: "24px",
                },
                768: {
                    perPage: 1,
                    gap: "16px",
                    peek: { right: "40px", left: 0 }, // Permite ver un fragmento de la siguiente tarjeta
                },
            },
            classes: {
                arrows: "splide__arrows projects__arrows",
                arrow: "splide__arrow projects__arrow",
                prev: "splide__arrow--prev projects__arrow--prev",
                next: "splide__arrow--next projects__arrow--next",
            },
        });

        splideInstance.mount();

        return () => {
            if (splideInstance) splideInstance.destroy();
        };
    });
</script>

<section id="proyectos" class="projects">
    <div class="projects__container">
        <div class="projects__header">
            <div class="projects__title-block">
                <span class="projects__badge">{sectionBadge}</span>
                <h2 class="projects__title">{sectionTitle}</h2>
            </div>
        </div>

        <div class="projects__slider splide" bind:this={projectsSliderRef}>
            <div class="splide__track">
                <ul class="splide__list">
                    {#each projectsList as project}
                        <li class="splide__slide">
                            <div class="projects__card">
                                <div class="projects__media">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        class="projects__img"
                                        loading="lazy"
                                    />
                                    <span class="projects__tag-type"
                                        >{project.type}</span
                                    >
                                    <span
                                        class="projects__tag-status"
                                        class:projects__tag-status--executing={project.status ===
                                            "En ejecución"}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                <div class="projects__content">
                                    <h3 class="projects__card-title">
                                        {project.title}
                                    </h3>
                                    <div class="projects__location">
                                        <span class="projects__location-icon"
                                        ></span>
                                        <span class="projects__location-text"
                                            >{project.location}</span
                                        >
                                    </div>
                                    <a href="#contacto" class="projects__link">
                                        Solicitar Información
                                        <span class="projects__link-arrow"
                                            >→</span
                                        >
                                    </a>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</section>
