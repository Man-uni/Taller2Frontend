type Props = {
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    accion?: string;
    onAccion?: () => void;
}

export default function TarjetaProducto({codigo, nombre, categoria, precio, stock, accion, onAccion}: Props) {
    return (
        <div className="border rounded-lg p-4">
            <h2>{codigo}</h2>
            <h2>{nombre}</h2>
            <h2>{categoria}</h2>
            <h2>{precio}</h2>
            <h2>{stock}</h2>
            {accion && onAccion && (
                <button className="bg-violet-600 hover:bg-violet-700 text-white
                   font-semibold px-4 py-2 rounded-lg transition" type="button" onClick={onAccion}>
                    {accion}
                </button>
            )}
        </div>
    )
}