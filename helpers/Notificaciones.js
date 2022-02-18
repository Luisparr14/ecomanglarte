import { NotificationManager } from "react-notifications"

export const Notificacion = (tipo, mensaje) => {
  console.log(tipo, mensaje)
  switch (tipo) {
    case "success":
      NotificationManager.success(mensaje, "Exito", 3000);
      break;
    case "error":
      NotificationManager.error(mensaje, "Error", 3000);
      break;
    case "warning":
      NotificationManager.warning(mensaje, "Advertencia", 3000);
      break;
    case "info":
      NotificationManager.info(mensaje, "Información", 3000);
      break;
    default:
      break;
  }
}