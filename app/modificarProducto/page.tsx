
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

    async function cargarProductos() {
        const respuesta = await fetch(API_URL);
        setProductos(await respuesta.json());
    }

    useEffect(() => {
        cargarProductos().catch((error) => setMensaje(error.message));
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

        const respuesta = await fetch(`${API_URL}/${encodeURIComponent(form.codigo)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const resultado = await respuesta.json();

        setForm(productoInicial);
        setEditando(false);
        setMensaje("Producto modificado correctamente.");
        await cargarProductos();
    }

    return (
        <main>
            <Link href="/">Inicio</Link>
            <h1>Modificar producto</h1>
            {mensaje && <p role="status">{mensaje}</p>}

            <ul>
                {productos.map((producto) => (
                    <li key={producto.codigo}>
                        <TarjetaProducto
                            {...producto}
                            accion="Editar"
                            onAccion={() => editar(producto)}
                        />
                    </li>
                ))}
            </ul>

            {editando && (
                <form onSubmit={guardar}>
                    <label>
                        Código:
                        <input type="text" value={form.codigo} readOnly />
                    </label>
                    <br />
                    <label>
                        Nombre:
                        <input
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
                            type="number"
                            value={form.stock}
                            onChange={(event) => cambiarCampo("stock", event.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Guardar cambios</button>{" "}
                    <button type="button" onClick={() => setEditando(false)}>
                        Cancelar
                    </button>
                </form>
            )}
        </main>
    );
}