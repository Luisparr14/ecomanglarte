import connection from "../../../database/conexion"

export default function todos (req, res) {

  connection.query('SELECT * FROM metodos_de_pago', (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al consultar los metodos de pago",
      })
    }

    if (results.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No hay metodos de pago registrados",
      })
    }

    res.status(200).json({
      ok: true,
      metodosDePago: results
    })
  })
}