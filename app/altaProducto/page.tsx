
"use client";
import { useState } from "react";
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
    const [cargando, setCargando] = useState(false);
	const [error, setError] = useState("");

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

        setCargando(true);
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            });
		} catch (err) {
			setError("No se pudo conectar con la api ")
		} finally {
			setCargando(false);
		}
    }

    return (
        <main>
            <Link href="/">Inicio</Link>
            <h1>Alta de Producto</h1>
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700
							px-4 py-2 rounded-lg">{error}</div>
			)}
            <form onSubmit={handleSubmit}>
                <label>
                    Código:
                    <input className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
type="text" name="codigo" required />
                </label>
                <br />
                <label>
                    Nombre:
                    <input className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
                        type="text" name="nombre" required />
                </label>
                <br />
                <label>
                    Categoría:
                    <input  className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
type="text" name="categoria" required />
                </label>
                <br />
                <label>
                    Precio:
                    <input  className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
type="number" name="precio" step="0.01" required />
                </label>
                <br />
                <label>
                    Stock:
                    <input className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
 type="number" name="stock" required />
                </label>
                <br />
                <button disabled={cargando} className="bg-violet-600 hover:bg-violet-700 text-white
                   font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50" type="submit">Agregar Producto</button>
            </form>
        </main>
    );      
}