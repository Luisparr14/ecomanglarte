import connection from "../../../database/conexion";
export default function OrderByID(req, res) {
  const { idPedido } = req.query;
  const sql = `SELECT * FROM pedidos inner join agendas on pedidos.agenda = agendas.idagenda inner join estado on estado.idestado=pedidos.estado WHERE idpedidos = ?`;
  const values = [idPedido];
  connection.query(sql, values, (err, pedido) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al realizar la consulta",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Se ha obtenido el pedido",
      data: pedido[0]
    });
  });
}