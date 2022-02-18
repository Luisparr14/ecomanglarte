import Head from 'next/head'
import NavBar from '../../components/content/header/NavBar'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Jumbotron from '../../components/content/header/Jumbotron'
import Footer from '../../components/content/header/Footer'
import AgendasCard from '../../components/AgendasCard'
import axios from 'axios'

export default function ListAgendas ({ agendas }) {
  const router = useRouter()
  return (
    <>
      <NavBar />
      <Head>
        <title>Agendas</title>
        <meta name="description" content='Lista de agendas disponibles de ECOMANGLARTE' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Jumbotron
          title={'Agendas'}
        />
        <section className='list-agendas'>
          {agendas.map(agenda => (
            <AgendasCard
              key={agenda.idagenda}
              id={agenda.idagenda}
              title={agenda.nombre}
              description={agenda.descripcion}
              imgLink={agenda.image}
              precio={agenda.precio}
            />
          ))}
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
          .list-agendas{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
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

export async function getStaticProps () {
  let agendas =[]

  try {
    const response = await axios.get(`${process.env.API_URL}/agendas/todas`)
    agendas = response.data.agendas
  } catch (error) {
     
  }
  return {
    props: {
      agendas
    }
  }
}
