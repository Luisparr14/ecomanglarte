import Head from 'next/head'
import NavBar from '../../components/content/header/NavBar'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Jumbotron from '../../components/content/header/Jumbotron'
import Footer from '../../components/content/header/Footer'
import InputText from '../../components/commons/InputText'
import Button from '../../components/commons/Button'
import { useEffect, useState } from 'react'
import OrderCard from '../../components/OrderCard'
import { StatusPayment } from '../../PaymentNequi/QR/StatusPayments'
import axios from 'axios'
export default function Pedido () {
  const router = useRouter()

  const [codidoPedido, setCodidoPedido] = useState('')
  const [datosPedido, setDatosPedido] = useState(null)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  const consultarPedido = async () => {
    setShow(false)
    try {
      await StatusPayment(codidoPedido)
      const response = await axios.get(`/api/orders/${codidoPedido}`)
      if (response.data.ok) {
        setDatosPedido(response.data.data)
        setShow(true)
      }
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 1000);
    }
  }

  return (
    <>
      <NavBar />
      <Head>
        <title>Consultar pedido</title>
        <meta name="description" content="Consulta de pedidos en la APP ecomanglarte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Jumbotron
          title={'Consultar Pedido'}
        />
        <section className={styles.content}>
          <InputText
            type={'text'}
            placeHolder={'Ingrese el codigo del pedido'}
            value={codidoPedido}
            onChange={(e) => setCodidoPedido(e.target.value)}
          />
          <Button
            title={'Consultar'}
            backGroundColor={'#00BFA6'}
            margin={'35px 0px 0px 0px'}
            onClick={consultarPedido}
          />
          {error && (
            <div className="error">
              <p>El codigo del pedido no existe</p>
            </div>
          )}
          {show && <OrderCard
            idPedido={codidoPedido}
            fecha={new Date(datosPedido.fecha).toLocaleDateString()}
            hora={new Date(datosPedido.fecha).toLocaleTimeString()}
            precio={datosPedido.precio*datosPedido.cantidad_comprada}
            idEstado={datosPedido.idestado}
            estado={datosPedido.nombre_estado}
          />}
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .title{
          font-size: 25px;
          padding: 0px 20px;
          font-family: 'Coming Soon';
          margin: 10px 0px 10px 0px;
        }
        .description{
          font-family: 'Coming Soon';
          margin: 0px 10px;
          padding: 10px;
        }

        .error{
          color: #f00;
          font-size: 20px;
        }
        @media (min-width: 375px) {
          .title{
            font-size: 28px;
          }
          .description{
            font-size: 16px;
          }
        }
        @media (min-width: 768px) {
          .title{
            font-size: 32px;
          }
          .description{
            font-size: 20px;
          }
        }
        @media (min-width: 1024px) {
          .title{
            font-size: 37px;
          }
          .description{
            font-size: 23px;
          }
        }
        `}</style>
    </>
  )
}