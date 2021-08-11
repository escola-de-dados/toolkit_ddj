import React from 'react'

import GithubCorner from '../GithubCorner'

import logoImg from '../../../public/img/logo-caixadeferramentas.png'

import styles from './styles.module.scss'

const Header = ({handleModalOpen}) => {
  return (
    <header className={styles.pageHeader}>
      <GithubCorner/>
      <h1 className={styles.title}>
        <img className={styles.logoImage} src={logoImg} alt="Caixa de Ferramentas de Jornalismo de Dados"/>
      </h1>
      <p className={styles.subtitle}>Explore mais de <span className={styles.subtitleNumber}>140</span> ferramentas para jornalistas de dados</p>
      <a className={styles.colabModalLink} href="#" onClick={() => handleModalOpen("howTo")}>Colabore com a base</a>
  </header>
  )
}

export default Header
