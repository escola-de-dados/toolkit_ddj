/* eslint-disable @next/next/no-img-element */
import React from "react";

import escolaDeDadosImg from "../../../public/img/logo-ed01-branca.png";
import okbrImg from "../../../public/img/logo-okbr-branca-alt.png";

import styles from "./styles.module.scss";

const Footer = ({ handleModalOpen }) => {
  return (
    <footer className={styles.pageFooter}>
      <div className={styles.mainRow}>
        <div className={styles.linksContainer}>
          <a
            className={styles.footerLink}
            href="#"
            onClick={() => handleModalOpen("aboutPage")}
          >
            O que é a Caixa de Ferramentas?
          </a>
          <a
            className={styles.footerLink}
            href="#"
            onClick={() => handleModalOpen("howTo")}
          >
            Quero colaborar
          </a>
          <a
            className={styles.footerLink}
            href="https://premio.jornalismodedados.org/"
          >
            Prêmio Cláudio Weber Abramo
          </a>
          <a
            className={styles.footerLink}
            href="https://forum.jornalismodedados.org/"
          >
            Fórum Jornalismo de Dados
          </a>
        </div>
        <div className={styles.madeByContainer}>
          <span className={`${styles.madeBySpan} mb-4`}>Realização</span>
          <div className={styles.logoContainer}>
            <a className={styles.logoImgLink} href="https://escoladedados.org/">
              <img
                className={styles.logoImg}
                src={escolaDeDadosImg}
                alt="Logo da Escola de Dados"
              />
            </a>
            <a className={styles.logoImgLink} href="https://www.ok.org.br/">
              <img
                className={styles.logoImg}
                src={okbrImg}
                alt="Logo da Open Knowledge Brasil"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.creditsRow}>
        <span className={`${styles.creditsSpan} mb-3 mb-lg-2`}>
          Desenvolvimento:{" "}
          <a href="https://liaporto.github.io/pt-br/">Lia Porto</a>
        </span>
        <span className={styles.creditsSpan}>
          Nosso conteúdo está disponível sob a licença{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            Creative Commons Atribuição 4.0 Internacional
          </a>
          , e pode ser compartilhado e reutilizado para trabalhos derivados,
          desde que citada a fonte.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
