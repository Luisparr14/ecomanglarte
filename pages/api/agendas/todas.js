import connection from '../../../database/conexion';
export default function All (req, res) {
  connection.query('SELECT * FROM agendas', (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al consultar las agendas',
        error: err
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No hay agendas registradas',
      });
    }
    
    res.status(200).json({
      ok: true,
      agendas: results
    })

  });

}