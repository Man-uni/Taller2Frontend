
"use client";
import Link from "next/link";


// Listar productos por get de API
const API_URL = "http://localhost:4001/productos";

type Producto = {
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
};

// elementos de este tipo:
//  {
//     "codigo": "P001",
//     "nombre": "Mouse inalambrico",
//     "categoria": "Perifericos",
//     "precio": 85000,
//     "stock": 24
//   },
export default function Home() {
    // Formulario para agregar un producto (POST)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nuevoProducto = {
            codigo: formData.get("codigo") as string,
            nombre: formData.get("nombre") as string,
            categoria: formData.get("categoria") as string,
            precio: parseFloat(formData.get("precio") as string),
            stock: parseInt(formData.get("stock") as string, 10),
        };

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoProducto),
        });
    }

    return (
        <main>
            <Link href="/">Inicio</Link>
            <h1>Alta de Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Código:
                    <input type="text" name="codigo" required />
                </label>
                <br />
                <label>
                    Nombre:
                    <input type="text" name="nombre" required />
                </label>
                <br />
                <label>
                    Categoría:
                    <input type="text" name="categoria" required />
                </label>
                <br />
                <label>
                    Precio:
                    <input type="number" name="precio" step="0.01" required />
                </label>
                <br />
                <label>
                    Stock:
                    <input type="number" name="stock" required />
                </label>
                <br />
                <button type="submit">Agregar Producto</button>
            </form>
        </main>
    );      
}