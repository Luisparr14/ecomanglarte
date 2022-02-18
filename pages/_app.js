import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications';
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <NotificationContainer/>
    </>
  )
}

export default MyApp
