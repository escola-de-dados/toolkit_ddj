import React from "react";

import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

const Card = ({ toolData }) => {
  const getCategoryStyle = (category) => {
    switch (category) {
      case "Visualização":
        return styles.visualizacao;
      case "Obtenção":
        return styles.obtencao;
      case "Análise":
        return styles.analise;
      case "Cartografia":
        return styles.cartografia;
      case "Publicação":
        return styles.publicacao;
      case "Limpeza":
        return styles.limpeza;
      case "Redes":
        return styles.redes;
      case "Multi":
        return styles.multi;
      case "Programação":
        return styles.programacao;
      default:
        return "";
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Windows":
        return "mdi:microsoft-windows";
      case "Mac OS":
        return "simple-icons:macos";
      case "Linux":
        return "simple-icons:linux";
      case "iOS":
        return "simple-icons:ios";
      case "Android":
        return "simple-icons:android";
      case "Web":
        return "mdi:web";
      case "Python":
        return "mdi:language-python";
      case "NodeJS":
        return "mdi:nodejs";
      case "R":
        return "mdi:language-r";
      case "Chrome OS":
      case "Chrome":
        return "mdi:google-chrome";
      case "Firefox":
        return "mdi:firefox";
      case "Microsoft Power BI":
        return "bi:bar-chart-fill";
      case "Excel":
        return "mdi:microsoft-excel";
      case "Localhost":
        return "mdi:home-floor-l";
      case "JavaScript":
        return "mdi:language-javascript";
      case "Docker Compose":
        return "mdi:docker";
      default:
        return "mdi:help";
    }
  };

  return (
    <article className={styles.toolCard}>
      <header className={styles.cardHeader}>
        <h2 className={styles.toolName}>{toolData.nome}</h2>
        <p className={styles.toolDescription}>{toolData["descrição"]}</p>
      </header>
      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Categorias</h3>
        <div>
          <span
            className={`${styles.toolCategory} ${getCategoryStyle(
              toolData.categoria
            )}`}
          >
            {toolData.categoria}
          </span>
        </div>
      </section>

      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Plataformas</h3>
        {Array.isArray(toolData.plataforma) ? (
          <ul className={styles.platformList}>
            {toolData.plataforma.map((plataforma, index) => {
              return (
                <span
                  title={plataforma}
                  className={styles.platformIcon}
                  key={index}
                >
                  <Icon
                    icon={`${getPlatformIcon(plataforma)}`}
                    color={styles.purple}
                  />
                </span>
              );
            })}
          </ul>
        ) : (
          <span title={toolData.plataforma} className={styles.platformIcon}>
            <Icon
              icon={getPlatformIcon(toolData.plataforma)}
              color={styles.purple}
            />
          </span>
        )}
      </section>

      <footer className={styles.cardFooter}>
        {toolData.link && (
          <Button className={styles.cardButton} href={toolData.link}>
            <Icon icon="mdi:link-variant" color="#fff" />
            Site
          </Button>
        )}
        {toolData.github && (
          <Button className={styles.cardButton} href={toolData.github}>
            <Icon icon="octicon:repo-forked-16" color="#fff" />
            Repositório
          </Button>
        )}
      </footer>
    </article>
  );
};

export default Card;
