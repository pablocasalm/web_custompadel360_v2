export type Product = {
  id: string;
  nombre: string;
  categoria: "Pistas" | "Pelotas" | "Accesorios";
  precio: number;
  etiquetas: string[];
  descripcion: string;
  imagen?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "pista-pro",
    nombre: "Pista Panorámica PRO",
    categoria: "Pistas",
    precio: 18900,
    etiquetas: ["pro"],
    descripcion: "Estructura panorámica, vidrio 12mm, césped profesional."
  },
  {
    id: "pista-club",
    nombre: "Pista Club",
    categoria: "Pistas",
    precio: 14900,
    etiquetas: ["club"],
    descripcion: "Estructura clásica, vidrio 10mm, mantenimiento incluido."
  },
  {
    id: "pelotas-rebote",
    nombre: "Servicio REBOTE x 1000 pelotas",
    categoria: "Pelotas",
    precio: 650,
    etiquetas: ["eco"],
    descripcion: "Re-presurización y reciclaje. Recogida y entrega."
  },
  {
    id: "pack-welcome",
    nombre: "Welcome pack club",
    categoria: "Accesorios",
    precio: 320,
    etiquetas: ["club"],
    descripcion: "Pack de bienvenida personalizable."
  }
];
