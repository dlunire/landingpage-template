export interface ISlide {
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaLink: string;
}

export interface IService {
    id: string;
    title: string;
    description: string;
    iconCode: string;
    features: string[];
}

export interface IProject {
    id: string;
    title: string;
    type: string;
    location: string;
    status: "En ejecución" | "Entregado";
    image: string;
}

export interface IContactForm {
    fullName: string;
    email: string;
    phone: string;
    projectType: string;
    details: string;
}

export interface IFooterLink {
    label: string;
    href: string;
    nofollow?: string;
    rel?: string;
    target?: string;
}

export interface IPillar {
    title: string;
    description: string;
    iconCode: string; // Representación lógica para iconos
}

export interface Token {
    lexeme: string;
    offset: number;
    length?: number;
    error?: boolean;
}