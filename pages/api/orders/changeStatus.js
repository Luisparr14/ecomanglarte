import connection from "../../../database/conexion";
export default function ChangeStatus (req, res) {
  const { idPedido, status } = req.body;
  const sql = `UPDATE pedidos SET estado = ? WHERE idpedidos = ?`;
  const values = [status, idPedido];
  connection.query(sql, values, (err, pedido) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al realizar la consulta",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Se ha actualizado el status del pedido",
    });
  });
}