<script lang="ts">
    import Cover from "./components/Hero/Cover.svelte";
    import Navbar from "./components/Header/Navbar.svelte";
    import AboutUS from "./components/About/AboutUS.svelte";
    import Services from "./components/Services/Services.svelte";
    import Projects from "./components/Projects/Projects.svelte";
    import ContactUS from "./components/Contacts/ContactUS.svelte";
    import Footer from "./components/Footer/Footer.svelte";

    import * as parsing from "./parsing/lexer";
    import * as routing from "./parsing/base-url";
    import * as router from "./lib/router";

    import IconCalendar from "./icons/IconCalendar.svelte";
    import IconCrane from "./icons/IconCrane.svelte";

    $: {
        router.resetState();

        console.clear();
        console.log({
            tokens: parsing.getTokensFromURI("/ciencias/de/la/computación"),
            uri: parsing.getTokensFromURI(":d?ciencia=vlor"),
        });

        routing.getBaseURL();
        routing.getRoute();

        router.route("/ciencia/:de/datos", IconCalendar);
        router.route("/ciencias//de/la / computación", IconCrane);

        router.route("/contenido/:id", IconCalendar);
        console.log({ route: routing.getRoute(), routes: router.getRoutes() });
        router.dispatch();
    }
</script>

<main>
    <header class="header" id="home">
        <Navbar />
    </header>

    <div class="container" id="container">
        <Cover />
        <AboutUS />
        <Services />
        <Projects />
        <ContactUS />
    </div>

    <Footer id="footer" />
</main>
