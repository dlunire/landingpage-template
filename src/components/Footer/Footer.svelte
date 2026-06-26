<script lang="ts">
    import type { IFooterLink } from "../../lib/Type";

    // Props con datos temporales institucionales
    export let companyName: string = "Sara Construcciones";
    export let description: string =
        "Ingeniería estructural y diseño arquitectónico de vanguardia. Construimos proyectos con los más altos estándares de calidad, seguridad y cumplimiento integral.";

    export let navigationLinks: IFooterLink[] = [
        { label: "Inicio", href: "#home" },
        { label: "Nosotros", href: "#about" },
        { label: "Servicios", href: "#services" },
        { label: "Proyectos", href: "#projects" },
    ];

    export let legalLinks: IFooterLink[] = [
        { label: "Políticas de Privacidad", href: "#/privacidad" },
        { label: "Términos de Servicio", href: "#/terminos" },
        { label: "Tratamiento de Datos", href: "#/datos" },
    ];

    // Obtención dinámica del año (2026)
    const currentYear: number = new Date().getFullYear();
</script>

<footer class="footer">
    <div class="footer__container">
        <div class="footer__brand">
            <div class="footer__logo">
                <span class="footer__logo-square"></span>
                <span class="footer__logo-text">{companyName}</span>
            </div>
            <p class="footer__brief">{description}</p>

            <div class="footer__socials">
                <a
                    href="#facebook"
                    class="footer__social-link footer__social-link--fb"
                    aria-label="Facebook"
                ></a>
                <a
                    href="#instagram"
                    class="footer__social-link footer__social-link--ig"
                    aria-label="Instagram"
                ></a>
                <a
                    href="#linkedin"
                    class="footer__social-link footer__social-link--ln"
                    aria-label="LinkedIn"
                ></a>
            </div>
        </div>

        <div class="footer__links-group">
            <h3 class="footer__title">Navegación</h3>
            <ul class="footer__list">
                {#each navigationLinks as link}
                    <li class="footer__item">
                        <a href={link.href} class="footer__link">{link.label}</a
                        >
                    </li>
                {/each}
            </ul>
        </div>

        <div class="footer__links-group">
            <h3 class="footer__title">Horarios y Atención</h3>
            <ul class="footer__list footer__list--static">
                <li class="footer__item footer__item--text">
                    <strong>Lunes a Viernes:</strong><br />8:00 AM - 5:00 PM
                </li>
                <li class="footer__item footer__item--text">
                    <strong>Sábados:</strong><br />9:00 AM - 1:00 PM
                </li>
                <li class="footer__item footer__item--text">
                    Soporte técnico de obra 24/7 para proyectos activos.
                </li>
            </ul>
        </div>
    </div>

    <div class="footer__bottom">
        <div class="footer__bottom-container">
            <p class="footer__copy">
                &copy; {currentYear}
                {companyName}. Todos los derechos reservados.
            </p>
            <div class="footer__legal">
                {#each legalLinks as legal}
                    <a href={legal.href} class="footer__legal-link"
                        >{legal.label}</a
                    >
                {/each}
            </div>
        </div>
    </div>
</footer>