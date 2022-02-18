import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from 'react-loader-spinner'
import { init, send } from '@emailjs/browser'
import { QRPayment } from "../../PaymentNequi/QR/GenerateQR";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Button from '../../components/commons/Button'
import Constants from "../../utils/Constants";
import Footer from "../../components/content/header/Footer";
import Head from "next/head";
import Image from "next/image";
import InputSelect from "../../components/commons/InputSelect";
import InputText from "../../components/commons/InputText";
import NavBar from "../../components/content/header/NavBar";
import styles from "../../styles/Home.module.css";

export default function AgendasSlug ({ agenda, metodosDePago }) {
  init(process.env.NEXT_PUBLIC_USERID)
  const router = useRouter()

  const userData = {
    nombre: '',
    email: '',
    direccion: ''
  }
  const datosCompra = {
    cantidad: 0,
    formaDePago: metodosDePago.length !== 0 ? metodosDePago[0].idmetodo : '',
    articulo: agenda.idagenda,
    precio: agenda.precio
  }

  const [compra, setCompra] = useState(datosCompra)
  const [user, setUser] = useState(userData)
  const [loading, setLoading] = useState(false)

  const pagoNequi = async () => {
    setLoading(true)
    try {
      const { codeQR, MessageID } = await QRPayment(compra)
      const body = Object.assign({ idPedido: MessageID }, user, compra)
      await axios.post('/api/orders/add', body)
      await send(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL, process.env.NEXT_PUBLIC_SERVICE_TEMPLATE, {
        name_company: 'Ecomanglarte',
        to_name: user.nombre,
        to_email: user.email,
        pedido: MessageID,
        message: 'Muchas gracias por su compra, complete el procedimiento de pago',
        qrcode: codeQR
      })
      setLoading(false)
      alert('Revise su correo electrónico para proceder con el pago')
      router.push('/')
    } catch (error) {
      aleter('Ha ocurrido un error')
      setLoading(false)
    }
  }

  const comprar = async () => {
    if (compra.cantidad === 0 || compra.cantidad === '' ||
      user.nombre === '' || user.email === '' || user.direccion === '' ||
      compra.formaDePago === '' || compra.articulo === '') {
      return alert('Por favor complete todos los campos')
    }

    switch (compra.formaDePago) {
      case Constants.paymentMethod.nequi:
        pagoNequi()
        break;
      case Constants.paymentMethod.efectivo:
        alert('Pago en efectivo')
        break;
      default:
        alert('Por favor seleccione un método de pago')
        break;
    }
  }

  return (
    <>
      <NavBar
        title={'Agenda #' + agenda.idagenda}
      />
      <Head>
        <title>{agenda.nombre}</title>
        <meta name="description" content={agenda.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className='content'>
          <div className="portada" >
            <Image
              src={agenda.image}
              alt={agenda.nombre}
              layout="responsive"
              height={300}
              width={250}
            />
          </div>
          <p>{agenda.descripcion}</p>
          <InputSelect
            text={'Forma de pago'}
            value={compra.formaDePago}
            onChange={(e) => {
              setCompra({ ...compra, formaDePago: parseInt(e.target.value) })
            }}
            options={metodosDePago.map(metodo => {
              return {
                id: metodo.idmetodo,
                nombre: metodo.nombre
              }
            })}
          />
          <InputText
            type={'number'}
            placeHolder={'Cantidad de agendas'}
            value={compra.cantidad}
            onChange={(e) => {
              let cantidad = e.target.value
              cantidad === '' ? cantidad = '' : cantidad = parseInt(cantidad)
              setCompra({ ...compra, cantidad })
            }}
          />

          <InputText
            type={'text'}
            placeHolder={'Nombre'}
            value={user.nombre}
            onChange={(e) => {
              setUser({ ...user, nombre: e.target.value })
            }}
          />

          <InputText
            type={'text'}
            placeHolder={'Email'}
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value })
            }}
          />

          <InputText
            type={'text'}
            placeHolder={'Direccion'}
            value={user.direccion}
            onChange={(e) => {
              setUser({ ...user, direccion: e.target.value })
            }}
          />
          <h3>Total a pagar <code>{compra.cantidad * agenda.precio}$</code></h3>
          <div className="loading">
            {loading && <Oval
              color="#CF6060"
              secondaryColor="#000"
              width={40}
              height={40}
              strokeWidth={5}
            />}
          </div>
          <Button
            onClick={comprar}
            disabled={loading}
            title={'Comprar ' + compra.cantidad + ' agendas'}
            backGroundColor={'#00b894'}
            borderRadius={'10px'}
            margin={'20px auto'}
          />
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .content{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          flex: 0.8;
          background: rgba(254, 253, 253, 0.71);
          margin: 0% 20px;
          border-radius: 10px;
          margin-bottom: 10px;
        }
        .portada{
          width: 250px;
          height: 300px;
          margin: 0px auto;
          background-color: #f5f5f5;
          border-radius: 10px;
          padding: 10px;
          margin: 10px auto;
        }
        p{
          font-size: 16px;
          font-family: 'Coming Soon';
          margin: 0px;
          padding: 10px;
          font-weight: bold;
        }
        .loading {
          width: 40px;
          height: 40px;
        }
        `}</style>
    </>
  )
}

export async function getAllAgendas () {
  const response = await axios.get(`${process.env.API_URL}/agendas/todas`)
  const { agendas } = response.data
  return agendas.map(agenda => {
    return {
      params: {
        slug: agenda.idagenda.toString()
      }
    }
  })
}

export async function getStaticPaths () {
  const paths = await getAllAgendas()
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  let agenda
  let metodosDePago = []

  try {
    const response = await axios.get(`${process.env.API_URL}/agendas/${params.slug}`)
    agenda = response.data.agenda
  } catch (error) {
    alert('Ha ocurrido un error')
  }
  try {
    const response = await axios.get(`${process.env.API_URL}/methods-payment/todos`)
    metodosDePago = response.data.metodosDePago
  } catch (error) {
    alert('Ha ocurrido un error')
  }

  return {
    props: {
      agenda,
      metodosDePago
    }
  };
}