
"use client";

import { useEffect, useState } from "react";
import TarjetaProducto from "../component/tarjetaProducto";
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

// api retorna elementos de este tipo:
//  {
//     "codigo": "P001",
//     "nombre": "Mouse inalambrico",
//     "categoria": "Perifericos",
//     "precio": 85000,
//     "stock": 24
//   },
export default function Home() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosVisibles, setProductosVisibles] = useState<Producto[]>([]);
    const [filtro, setFiltro] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        async function cargarProductos() {
            setCargando(true);
            const respuesta = await fetch(API_URL);

            const lista: Producto[] = await respuesta.json();
            setProductos(lista);
            setProductosVisibles(lista);
            setCargando(false);
        }

        cargarProductos();
    }, []);

    function filtrarProductos() {
        const texto = filtro.trim().toLowerCase();
        if (!texto) {
            setProductosVisibles(productos);
            return;
        }

        setProductosVisibles(
            productos.filter((producto) =>
                producto.nombre.toLowerCase().includes(texto) ||
                producto.categoria.toLowerCase().includes(texto),
            ),
        );
    }

	return (
        // retornar lista de productos (GET)
        <main>
            <Link href="/">Inicio</Link>
            <h1>Lista de productos</h1>
            <div>
                <label htmlFor="filtro-productos">Buscar por nombre o categoría: </label>
                <input
                className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"

                    id="filtro-productos"
                    type="search"
                    value={filtro}
                    onChange={(event) => setFiltro(event.target.value)}
                    placeholder="Ej. Mouse o Periféricos"
                />
                <button
                    disabled={cargando}
                    type="button"
                    onClick={filtrarProductos}
                    className="ml-2 bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Filtrar
                </button>
            </div>
            {mensaje && <p role="alert">{mensaje}</p>}
            {cargando ? (
                <p className="text-gray-500 animate-pulse">Cargando productos...</p>
            ) : (
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    {productosVisibles.map((producto) => (
                        <li key={producto.codigo}>
                            <TarjetaProducto {...producto} />
                        </li>
                    ))}
                </ul>
            )}
            {!cargando && !mensaje && productosVisibles.length === 0 && <p>No se encontraron productos.</p>}
        </main>
	);
}