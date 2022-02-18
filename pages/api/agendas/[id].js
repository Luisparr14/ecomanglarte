import connection from "../../../database/conexion";

export default function byID (req, res) {
  let {id} = req.query
  connection.query('SELECT * FROM agendas WHERE idagenda = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al consultar la agenda",
        error: err
      });
    }

    res.status(200).json({
      ok: true,
      agenda: results[0]
    })

  });
}