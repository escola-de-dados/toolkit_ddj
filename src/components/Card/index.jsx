import React from "react";

import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { getPlatformIcon, getCategorySlug } from "../../utils/utils";

import styles from "./styles.module.scss";

const Card = ({ toolData, platforms, categories }) => {
  return (
    <article
      className={`${styles.toolCard} ${
        toolData.destaque && styles.toolCardHighlight
      }`}
    >
      <header className={styles.cardHeader}>
        <h2 className={styles.toolName}>{toolData.nome}</h2>
        <p className={styles.toolDescription}>{toolData["descrição"]}</p>
      </header>
      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Categorias</h3>
        <div>
          <span
            className={`${styles.toolCategory} ${getCategorySlug(
              toolData.categoria,
              categories
            )}`}
          >
            {toolData.categoria}
          </span>
        </div>
      </section>

      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Plataformas</h3>
        <ul className={styles.platformList}>
          {toolData.plataforma &&
            toolData.plataforma.map((plataforma, index) => {
              return (
                <span
                  title={plataforma}
                  className={styles.platformIcon}
                  key={index}
                >
                  <Icon
                    icon={`${getPlatformIcon(plataforma, platforms)}`}
                    color={styles.purple}
                  />
                </span>
              );
            })}
        </ul>
      </section>

      <footer className={styles.cardFooter}>
        {toolData.link && (
          <Button
            variant={toolData.destaque ? "secondary" : "primary"}
            className={styles.cardButton}
            href={toolData.link}
            target="_blank"
          >
            <Icon icon="mdi:link-variant" color="#fff" />
            Site
          </Button>
        )}
        {toolData.github && (
          <Button
            variant={toolData.destaque ? "secondary" : "primary"}
            className={styles.cardButton}
            href={toolData.github}
            target="_blank"
          >
            <Icon icon="octicon:repo-forked-16" color="#fff" />
            Repositório
          </Button>
        )}
      </footer>
    </article>
  );
};

export default Card;
