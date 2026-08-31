
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

// elementos de este tipo:
//  {
//     "codigo": "P001",
//     "nombre": "Mouse inalambrico",
//     "categoria": "Perifericos",
//     "precio": 85000,
//     "stock": 24
//   },
export default function Home() {
    const productoInicial: Producto = {
        codigo: "",
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
    };
    const [productos, setProductos] = useState<Producto[]>([]);
    const [form, setForm] = useState<Producto>(productoInicial);
    const [editando, setEditando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

	async function cargarProductos() {
		setCargando(true)
		try {
			const respuesta = await fetch(API_URL);
			if (!respuesta.ok) throw new Error("No se pudo conectar con la API");
			setProductos(await respuesta.json());
		} catch (err) {
			setError("No se pudo conectar con la api ")
		} finally {
			setCargando(false);
		}

	}

    useEffect(() => {
        cargarProductos().catch((error) => setError("No se pudo conectar con la API"));
    }, []);

    function editar(producto: Producto) {
        setForm(producto);
        setEditando(true);
        setMensaje("");
    }

    function cambiarCampo(campo: keyof Producto, valor: string) {
        setForm((producto) => ({
            ...producto,
            [campo]: campo === "precio" || campo === "stock" ? Number(valor) : valor,
        }));
    }

    async function guardar(event: React.FormEvent<HTMLFormElement>) {   
        event.preventDefault();
        if (!editando) return;

        setCargando(true);
        try {
            const respuesta = await fetch(`${API_URL}/${encodeURIComponent(form.codigo)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!respuesta.ok) throw new Error("No se pudo conectar con la API");
            setProductos(await respuesta.json());
            setForm(productoInicial);
            setEditando(false);
            setMensaje("Producto modificado correctamente.");
            await cargarProductos();
        } catch (err) {
            setError("No se pudo conectar con la api ")
        } finally {
            setCargando(false);
        }


    }

    return (
        <main>
            <Link href="/">Inicio</Link>
            <h1>Modificar producto</h1>
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700
							px-4 py-2 rounded-lg">{error}</div>
			)}
            {mensaje && <p role="status">{mensaje}</p>}

            <form className="space-y-4"></form>
            {cargando ? (
                <p className="text-gray-500 animate-pulse">Cargando productos...</p>
            ) : (
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    {productos.map((producto) => (
                        <li key={producto.codigo}>
                            <TarjetaProducto
                                {...producto}
                                accion="Editar"
                                onAccion={() => editar(producto)}
                                disabled={cargando}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {editando && (
                <form onSubmit={guardar}>
                    <label>
                        Código:
                        <input className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"
type="text" value={form.codigo} readOnly />
                    </label>
                    <br />
                    <label>
                        Nombre:
                        <input
                        className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"

                            type="text"
                            value={form.nombre}
                            onChange={(event) => cambiarCampo("nombre", event.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Categoría:
                        <input
                        className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"

                            type="text"
                            value={form.categoria}
                            onChange={(event) => cambiarCampo("categoria", event.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Precio:
                        <input
                        className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"

                            type="number"
                            step="0.01"
                            value={form.precio}
                            onChange={(event) => cambiarCampo("precio", event.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Stock:
                        <input
                        className="border rounded-lg px-3 py-2 text-sm
             focus:ring-2 focus:ring-violet-500"

                            type="number"
                            value={form.stock}
                            onChange={(event) => cambiarCampo("stock", event.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button disabled={cargando} className="bg-violet-600 hover:bg-violet-700 text-white
                   font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50" type="submit">Guardar cambios</button>{" "}
                    <button disabled={cargando} className="bg-violet-600 hover:bg-violet-700 text-white
                   font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50" type="button" onClick={() => setEditando(false)}>
                        Cancelar
                    </button>
                </form>
            )}
        </main>
    );
}