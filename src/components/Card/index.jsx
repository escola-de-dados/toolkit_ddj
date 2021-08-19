import React from "react";

import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

const Card = ({ toolData }) => {
  const getStyleTag = (category) => {
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
      case "MacOS":
        return "simple-icons:macos";
      case "Linux":
        return "simple-icons:linux";
      case "iOS":
        return "simple-icons:ios";
      case "Android":
        return "simple-icons:android";
      case "Web":
        return "mdi:web";
      default:
        return "mdi:help";
    }
  };

  return (
    <article className={styles.toolCard}>
      <header>
        <h2 className={styles.toolName}>{toolData.nome}</h2>
        <p className={styles.toolDescription}>{toolData["descrição"]}</p>
      </header>
      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Categorias</h3>
        <div>
          <span
            className={`${styles.toolCategory} ${getStyleTag(
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
          <ul>
            {toolData.plataforma.map((plataforma, index) => {
              return (
                <Icon
                  key={index}
                  className={styles.platformIcon}
                  icon={`${getPlatformIcon(plataforma)}`}
                  color={styles.purple}
                />
              );
            })}
          </ul>
        ) : (
          <Icon
            className={styles.platformIcon}
            icon={getPlatformIcon(toolData.plataforma)}
            color={styles.purple}
          />
        )}
        {/* <Icon
            className={styles.platformIcon}
            icon="mdi:microsoft-windows"
            color={styles.purple}
          />
          <Icon
            className={styles.platformIcon}
            icon="simple-icons:linux"
            color={styles.purple}
          />
          <Icon
            className={styles.platformIcon}
            icon="simple-icons:macos"
            color={styles.purple}
          />
          <Icon
            className={styles.platformIcon}
            icon="simple-icons:android"
            color={styles.purple}
          />
          <Icon
            className={styles.platformIcon}
            icon="simple-icons:ios"
            color={styles.purple}
          />
          <Icon
            className={styles.platformIcon}
            icon="mdi:web"
            color={styles.purple}
          /> */}
      </section>

      <footer className={styles.cardFooter}>
        <Button className={styles.cardButton}>
          <Icon icon="mdi:link-variant" color="#fff" />
          Site
        </Button>
        <Button className={styles.cardButton}>
          <Icon icon="octicon:repo-forked-16" color="#fff" />
          Repositório
        </Button>
      </footer>
    </article>
  );
};

export default Card;
