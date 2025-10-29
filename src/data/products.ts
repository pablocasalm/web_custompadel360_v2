export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: "Pistas" | "Pelotas" | "Accesorios";
  etiquetas: Array<"eco" | "pro" | "club">;
  precio: number;
  img?: string;
  url?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "pista-panoramica-pro",
    nombre: "Pista Panorámica PRO",
    descripcion: "Estructura panorámica, vidrio 12 mm, césped profesional y LED.",
    categoria: "Pistas",
    etiquetas: ["pro", "club"],
    precio: 28900,
  },
  {
    id: "pista-clasica-club",
    nombre: "Pista Clásica Club",
    descripcion: "Solución robusta y optimizada para clubs con alto uso.",
    categoria: "Pistas",
    etiquetas: ["club"],
    precio: 21900,
  },
  {
    id: "pelotas-eco-pack",
    nombre: "Pack Pelotas ECO (24 tubos)",
    descripcion: "Pelotas recicladas con rendimiento consistente.",
    categoria: "Pelotas",
    etiquetas: ["eco", "club"],
    precio: 168,
  },
  {
    id: "rebote-servicio",
    nombre: "Servicio REBOTE (mensual)",
    descripcion: "Re-presurización y reciclaje de pelotas con recogida programada.",
    categoria: "Pelotas",
    etiquetas: ["eco", "club"],
    precio: 129,
  },
  {
    id: "accesorio-red-pro",
    nombre: "Red profesional reforzada",
    descripcion: "Red de alta resistencia con cintas y tensores incluidos.",
    categoria: "Accesorios",
    etiquetas: ["pro", "club"],
    precio: 240,
  },
  {
    id: "accesorio-foco-led",
    nombre: "Foco LED 200W",
    descripcion: "Iluminación eficiente para pistas exteriores.",
    categoria: "Accesorios",
    etiquetas: ["eco"],
    precio: 189,
  },
];