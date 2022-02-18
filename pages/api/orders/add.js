import conexion from '../../../database/conexion';
export default function AddOrder (req, res) {
  const { idPedido, formaDePago, articulo, cantidad, direccion } = req.body;
  const sql = `INSERT INTO pedidos (idpedidos,metodo_pago,agenda,cantidad,direccion) VALUES (?,?,?,?,?)`;
  const values = [idPedido, formaDePago, articulo, cantidad, direccion];
  conexion.query(sql, values, (err, rows) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al realizar la consulta'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Se ha agregado el pedido'
    });

  })
}