<script>
    import Cover from "./components/Hero/Cover.svelte";
    import Navbar from "./components/Header/Navbar.svelte";
    import AboutUS from "./components/About/AboutUS.svelte";
    import Services from "./components/Services/Services.svelte";
    import Projects from "./components/Projects/Projects.svelte";
    import ContactUS from "./components/Contacts/ContactUS.svelte";
    import Footer from "./components/Footer/Footer.svelte";
    import * as parsing from "./parsing/lexer";
    import * as routing from "./parsing/base-url";
    
    
    $: {
        console.clear();
        console.log({
            tokens: parsing.getTokensFromURI("/ciencias/de/la/computación"),
            uri: parsing.getTokensFromURI(":d?ciencia=vlor"),
        });
        routing.getBaseURL();
        routing.getRoute();
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
