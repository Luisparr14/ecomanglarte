import Head from 'next/head'
import NavBar from '../components/content/header/NavBar'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Jumbotron from '../components/content/header/Jumbotron'
import Footer from '../components/content/header/Footer'
import Script from 'next/script'

export default function Home () {
  const router = useRouter()
  return (
    <>
      <NavBar />
      <div className={`container content-page`} id='content-pages'>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Pagina principal de la app web ECOMANGLARTE" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Jumbotron
            title={'Ecomanglarte'}
          />
          <section className={styles.content}>
            <h2 className='title'>¿QUIENES SOMOS?</h2>
            <p className='description'>
              Ecomanglarte es una iniciativa juvenil el cual consiste en elaborar papel artesanal
              de la hoja de mangle, es importante resaltar que la base principal para elaborar
              nuestro producto es el papel reciclado, el cual es recolectado de las instituciones
              educativas aledañas a nuestra comunidad, este y cada uno de los procesos son
              liderados y ejecutados por jóvenes cuyo interés es empoderarse de las necesidades
              de su comunidad y darle la mejor solución, con el objetivo de crear una conciencia
              ambiental en nuestra comunidad y mejorar la calidad de vida de las familias allí
              representadas.
            </p>
          </section>
          <Footer />
        </main>
      </div>
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
