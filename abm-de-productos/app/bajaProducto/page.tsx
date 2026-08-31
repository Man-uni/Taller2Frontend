"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TarjetaProducto from "../component/tarjetaProducto";


const API_URL = "http://localhost:4001/productos";

type Producto = {
	codigo: string;
	nombre: string;
	categoria: string;
	precio: number;
	stock: number;
};

export default function Home() {
	const [productos, setProductos] = useState<Producto[]>([]);
	const [mensaje, setMensaje] = useState("");
	const [cargando, setCargando] = useState(false);

	async function cargarProductos() {
		setCargando(true);
		const respuesta = await fetch(API_URL);

		setProductos(await respuesta.json());
		setCargando(false);
	}

	useEffect(() => {
		cargarProductos().catch((error) => setMensaje(error.message));
	}, []);

	async function eliminar(codigo: string) {
		if (!window.confirm("¿Querés eliminar este producto?")) return;

		setCargando(true);
		const respuesta = await fetch(`${API_URL}/${encodeURIComponent(codigo)}`, {
			method: "DELETE",
		});
		const resultado = await respuesta.json();
		setCargando(false);

		await cargarProductos();

	}

	return (
		<main>
			<Link href="/">Inicio</Link>
			<h1>Baja de productos</h1>
			{mensaje && <p role="status">{mensaje}</p>}
			{cargando ? (
				<p className="text-gray-500 animate-pulse">Cargando productos...</p>
			) : (
				<ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
					{productos.map((producto) => (
						<li key={producto.codigo}>
							<TarjetaProducto
								{...producto}
								accion="Eliminar"
								onAccion={() => eliminar(producto.codigo)}
								disabled={cargando}
							/>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
