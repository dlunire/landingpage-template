<script lang="ts">
  import { onMount } from "svelte";
  import IconLogo from "../../icons/IconLogo.svelte";

  // Contrato estructural para los enlaces de navegación
  interface IMenuItem {
    label: string;
    anchor: string;
  }

  // Props con datos de relleno temporal (luego alimentados por la API de DLUnire)
  export let ctaText: string = "Cotizar Obra";
  export let menuItems: IMenuItem[] = [
    { label: "Inicio", anchor: "#home" },
    { label: "Nosotros", anchor: "#about" },
    { label: "Servicios", anchor: "#services" },
    { label: "Proyectos", anchor: "#projects" },
  ];

  // Estados del componente
  let isMobileMenuOpen: boolean = false;
  let isScrolled: boolean = false;

  // Alternar visibilidad en móviles
  function toggleMobileMenu(): void {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  // Cerrar menú al hacer click en un ancla
  function closeMenu(): void {
    isMobileMenuOpen = false;
  }

  // Detectar scroll para cambiar la opacidad/estilo del Navbar
  function handleScroll(): void {
    isScrolled = window.scrollY > 50;
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<nav class="navbar" class:navbar--scrolled={isScrolled}>
  <div class="navbar__container">
    <a
      href="#home"
      class="navbar__logo"
      onclick={closeMenu}
      aria-label="Sara Construcción"
    >
      <picture>
        {#if isScrolled}
          <source type="image/webp" srcset="images/logotipo.webp" />
        {:else}
          <source type="image/webp" srcset="images/logotipo-dark.webp" />
        {/if}

        <img src="images/logotipo-dark.webp" alt="Sara Construcción" />
      </picture>
    </a>

    <ul class="navbar__menu" class:navbar__menu--open={isMobileMenuOpen}>
      {#each menuItems as { anchor, label }}
        <li class="navbar__item">
          <a href={anchor} class="navbar__link" onclick={closeMenu}>
            {label}
          </a>
        </li>
      {/each}
      <li class="navbar__item navbar__item--cta">
        <a href="#contact" class="navbar__btn" onclick={closeMenu}>
          {ctaText}
        </a>
      </li>
    </ul>

    <button
      class="navbar__hamburger"
      class:navbar__hamburger--active={isMobileMenuOpen}
      onclick={toggleMobileMenu}
      aria-label="Alternar menú de navegación"
    >
      <span class="navbar__bar"></span>
      <span class="navbar__bar"></span>
      <span class="navbar__bar"></span>
    </button>
  </div>
</nav>
