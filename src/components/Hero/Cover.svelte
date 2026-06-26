<script lang="ts">
    import { onMount } from "svelte";
    import Splide from "@splidejs/splide";
    import type { ISlide } from "../../lib/Type";


    // Definición estricta para la estructura de las láminas del carrusel
    // Contenido de relleno temporal (arquitectura, maquinaria y obras civiles)
    export let slides: ISlide[] = [
        {
            title: "Construimos Espacios de Vanguardia",
            subtitle:
                "Diseño arquitectónico y ejecución de obras civiles con los más altos estándares de solidez y acabados de lujo.",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Ver Proyectos",
            ctaLink: "#projects",
        },
        {
            title: "Ingeniería con Sello de Excelencia",
            subtitle:
                "Transformamos planos en realidades estructurales duraderas. Infraestructura residencial, comercial e industrial.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Nuestros Servicios",
            ctaLink: "#services",
        },
        {
            title: "Remodelaciones de Alto Impacto",
            subtitle:
                "Modernización y optimización de espacios existentes con planeación milimétrica y optimización presupuestaria.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Cotizar una Obra",
            ctaLink: "#contact",
        },
    ];

    let heroSliderRef: HTMLElement;
    let splideInstance: Splide;

    onMount(() => {
        // Inicialización nativa de Splide optimizada para el Hero
        splideInstance = new Splide(heroSliderRef, {
            type: "fade",
            rewind: true,
            autoplay: true,
            interval: 6000,
            speed: 1200,
            arrows: true,
            pagination: true,
            pauseOnHover: false,
            keyboard: true,
            classes: {
                arrows: "splide__arrows hero__arrows",
                arrow: "splide__arrow hero__arrow",
                prev: "splide__arrow--prev hero__arrow--prev",
                next: "splide__arrow--next hero__arrow--next",
                pagination: "splide__pagination hero__pagination",
                page: "splide__pagination__page hero__page-dot",
            },
        });

        splideInstance.mount();

        // Limpieza de memoria al destruir el componente
        return () => {
            if (splideInstance) splideInstance.destroy();
        };
    });
</script>

<!-- <svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
    />
</svelte:head> -->

<section
    class="hero splide"
    bind:this={heroSliderRef}
    aria-label="Galería principal de Sara Construcciones"
>
    <div class="splide__track">
        <ul class="splide__list">
            {#each slides as slide}
                <li
                    class="splide__slide hero__slide"
                    style="background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.75)), url('{slide.image}');"
                >
                    <div class="hero__container">
                        <div class="hero__content">
                            <span class="hero__badge">Sara Construcciones</span>
                            <h1 class="hero__title">{slide.title}</h1>
                            <p class="hero__subtitle">{slide.subtitle}</p>
                            <div class="hero__actions">
                                <a
                                    href={slide.ctaLink}
                                    class="hero__btn hero__btn--primary"
                                >
                                    {slide.ctaText}
                                </a>
                                <a
                                    href="#contact"
                                    class="hero__btn hero__btn--secondary"
                                >
                                    Asesoría Gratuita
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</section>
