/* eslint-disable @next/next/no-img-element */
import React from "react";

import GithubCorner from "../GithubCorner";

import logoImg from "../../../public/img/logo-caixadeferramentas.png";

import styles from "./styles.module.scss";

const Header = ({ toolsNumber, handleModalOpen }) => {
  return (
    <header className={styles.pageHeader}>
      <GithubCorner />
      <h1 className={styles.title}>
        <img
          className={styles.logoImage}
          src={logoImg}
          alt="Caixa de Ferramentas do Jornalismo de Dados"
        />
      </h1>
      <div className={styles.subtitle}>
        <p>
          Explore mais de{" "}
          <span className={styles.subtitleNumber}>
            {toolsNumber - (toolsNumber % 5)}
          </span>{" "}
          ferramentas para trabalhar com dados.
        </p>
        <p>
          Selecione uma categoria, plataforma ou faça uma busca por
          palavra-chave.
        </p>
      </div>
      <a
        className={styles.colabModalLink}
        href="https://github.com/escola-de-dados/toolkit_ddj"
      >
        Colabore com a base
      </a>
    </header>
  );
};

export default Header;
