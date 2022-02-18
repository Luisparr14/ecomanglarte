import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../../../styles/NavBar.module.css'
const loadScript = () => {
  let btn = document.getElementById('collapse-button');
  let collapsenav = document.getElementById('collapseNav');
  let linkColapseNav = document.getElementById('collapseNav').getElementsByTagName('a');

  const openNav = () => {
    if (btn.classList.contains('collapseButtonActive')) {
      btn.classList.remove('collapseButtonActive');
      collapsenav.classList.remove('noCollapse');
    } else {
      collapsenav.classList.add('noCollapse')
      btn.classList.add('collapseButtonActive');
    }
  }

  btn.onclick = openNav;

  const closeNav = () => {
    collapsenav.classList.remove('noCollapse');
    btn.classList.remove('collapseButtonActive');
  }

  for (let i = 0; i < linkColapseNav.length; i++) {
    linkColapseNav[i].onclick = closeNav;
  }
}

export default function NavBar ({ title }) {
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
  const styleConsulta = {
    color: router.asPath.includes('consultar') ? '#FFF' : '#000'
  }
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarNav}>
          <label className={styles.logo}>
            <Link href={"/"}>
              <a>{`${title ? title : 'ECOMANGLARTE'}`}</a>
            </Link>
          </label>
          <label id="collapse-button" className={`${styles.navBarToggler} ${styles.collapseButton}`} type="button">
            <span></span>
          </label>
          <ul className={styles.navItems}>
            <li><Link href="/"><a style={styleIndex}>Inicio</a></Link></li>
            <li><Link href="/agendas"><a style={styleAgendas}>Agendas</a></Link></li>
            <li><Link href="/consultar/pedido"><a style={styleConsulta}>Consultar Pedido</a></Link></li>
          </ul>
        </div>
      </nav>
      <ul id="collapseNav" className={styles.navItemCollapse}>
        <li><Link href={{pathname: "/"}}><a style={styleIndex}>Inicio</a></Link></li>
        <li><Link href={{pathname: '/agendas'}}><a style={styleAgendas}>Agendas</a></Link></li>
        <li><Link href="/consultar/pedido"><a style={styleConsulta}>Consultar Pedido</a></Link></li>
      </ul>
    </>
  )
}