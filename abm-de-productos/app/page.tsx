import Link from "next/link";

export default function Inicio() {
  return (
    <main>
      <Link href="/productos">Lista de Productos</Link>
      <br/>
      <Link href="/altaProducto">Agregar Producto</Link>
      <br/>
      <Link href="/modificarProducto">Modificar Producto</Link>
      <br/>
      <Link href="/bajaProducto">Baja de Producto</Link>
    </main>
  );
}