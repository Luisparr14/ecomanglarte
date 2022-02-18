import Constants from '../utils/Constants';
export default function OrderCard ({ idPedido, fecha, hora, precio, estado, idEstado }) {
  return (
    <>
      <div className="card">
        <div className="cardHeader">
          <h2>Pedido: {idPedido}</h2>
          <p>
            <span >Fecha: {fecha}</span>
            <span >Hora: {hora}</span>
            <span >Precio: {precio}</span>
          </p>
        </div>
        <div className="cardBody">
          <span>Estado:</span>
          {idEstado === Constants.orderStatus.pendiente && (
            <span className="status pendiente">{estado}</span>
          )}
          {idEstado === Constants.orderStatus.pagado && (
            <span className="status pagado">{estado}</span>
          )}
          {idEstado === Constants.orderStatus.entregado && (
            <span className="status entregado">{estado}</span>
          )}
          {idEstado === Constants.orderStatus.pagoCaducado && (
            <span className="status caducado">{estado}</span>
          )}
        </div>
      </div>
      <style jsx>{`
        .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            
        }
        .cardHeader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }
        .cardBody {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        span {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }

        .status {
            font-weight: bold;
            font-size: 1.2rem;
            padding: 0.5rem;
            border-radius: 10px;
        }
        .pendiente {
            background-color: #00bcd4;
        }
        .pagado {
            background-color: #4caf50;
        }
        .entregado {
            background-color: #ff9800;
        }
        .caducado {
            background-color: #f44336;
        }

      `}</style>
    </>
  )
}
