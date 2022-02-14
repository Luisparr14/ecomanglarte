import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import styles from '../../../styles/NavBar.module.css'

const loadScript = () => {
  console.log('LISTO')
    let btn = document.getElementById('collapse-button');
    let collapsenav = document.getElementById('collapseNav');
    // let content = document.getElementById('content-page');
    // let content = document.getElementsByClassName('content-page');
    let linkColapseNav = document.getElementById('collapseNav').getElementsByTagName('a');

    function toogleCollapse () {
      collapsenav.classList.toggle('noCollapse')
      btn.classList.toggle('collapseButtonActive');
      // content.classList.toggle('blur')
    }

    btn.addEventListener('click', toogleCollapse)

    // content.addEventListener('click', () => {
    //   console.log('click')
    //   if (collapsenav.classList.contains('noCollapse')) {
    //     toogleCollapse()
    //   }
    // })

    for (let i = 0; i < linkColapseNav.length; i++) {
      linkColapseNav[i].addEventListener('click', () => {
        if (collapsenav.classList.contains('noCollapse')) {
          toogleCollapse()
        }
      })
    }
}

export default function NavBar () {
  const router = useRouter()
  useEffect(() => {
    loadScript()
  }, [router])
  const styleAgendas = {
    color: router.asPath === "/agendas" ? '#FFF' : '#000'
  }
  const styleIndex = {
    color: router.asPath === "/" || router.asPath.includes('new') ? '#FFF' : '#000'
  }
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarNav}>
          <label className={styles.logo}>
            <Link href={"/"}>
              <a>ECOMANGLARTE</a>
            </Link>
          </label>
          <label id="collapse-button" className={`${styles.navBarToggler} ${styles.collapseButton}`} type="button">
            <span></span>
          </label>
          <ul className={styles.navItems}>
            <li><Link href="/"><a style={styleIndex}>Inicio</a></Link></li>
            <li><Link href="/agendas"><a style={styleAgendas}>Agendas</a></Link></li>
          </ul>
        </div>
      </nav>
      <ul id="collapseNav" className={styles.navItemCollapse}>
        <li><Link href={{
          pathname: "/"
        }}>
          <a style={styleIndex}>Inicio</a>
        </Link></li>
        <li><Link href={{
          pathname: '/agendas'
        }}>
          <a style={styleAgendas}>Agendas</a>
        </Link></li>
      </ul>
    </>
  )
}

export async function getServerSideProps ({ }) {
  console.log('getServerSideProps')
  return {
    props: {

    }
  }
}