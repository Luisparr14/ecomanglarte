import Head from 'next/head'
import NavBar from '../../components/content/header/NavBar'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Jumbotron from '../../components/content/header/Jumbotron'
import Footer from '../../components/content/header/Footer'
import AgendasCard from '../../components/AgendasCard'

export default function ListAgendas ({ title, description }) {
  const router = useRouter()
  return (
    <>
      <NavBar />
      <div className={`container content-page`} id='content-pages'>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Jumbotron
            title={'Agendas'}
          />
          <section className='list-agendas'>
            <AgendasCard
              imgLink={'https://template.canva.com/EADwi4xAG6I/1/0/256w-JBWCAd5q564.jpg'}
              title={'Agendas'}
              description={'Una agenda mani'}
            />
            <AgendasCard
              imgLink={'https://template.canva.com/EADwi4xAG6I/1/0/256w-JBWCAd5q564.jpg'}
              title={'Agendas'}
              description={'Una agenda mani'}
            />
            <AgendasCard
              imgLink={'https://template.canva.com/EADwi4xAG6I/1/0/256w-JBWCAd5q564.jpg'}
              title={'Agendas'}
              description={'Una agenda mani'}
            />
            <AgendasCard
              imgLink={'https://template.canva.com/EADwi4xAG6I/1/0/256w-JBWCAd5q564.jpg'}
              title={'Agendas'}
              description={'Una agenda mani'}
            />
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
  return {
    props: {
      title: 'Agendas',
      description: 'Pagina principal de la app web ECOMANGLARTE'
    }
  }
}
