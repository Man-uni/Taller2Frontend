type Props = {
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    accion?: string;
    onAccion?: () => void;
    disabled?: boolean;
}

export default function TarjetaProducto({codigo, nombre, categoria, precio, stock, accion, onAccion, disabled}: Props) {
    return (
        <div className="border rounded-lg p-4">
            <h2>{codigo}</h2>
            <h2>{nombre}</h2>
            <h2>{categoria}</h2>
            <h2>{precio}</h2>
            <h2>{stock}</h2>
            {accion && onAccion && (
                <button disabled={disabled} className="bg-violet-600 hover:bg-violet-700 text-white
                   font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50" type="button" onClick={onAccion}>
                    {accion}
                </button>
            )}
        </div>
    )
}