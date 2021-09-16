import React from "react";

import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { getPlatformIcon, getCategorySlug } from "../../utils/utils";

import styles from "./styles.module.scss";

const Card = ({ id, toolData, platforms, categories }) => {
  return (
    <article
      id={id}
      tabIndex="-1"
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
                <li
                  tabIndex="0"
                  aria-label={plataforma}
                  title={plataforma}
                  className={styles.platformIcon}
                  key={index}
                >
                  <span
                    style={{
                      height: "0",
                      width: "0",
                      opacity: "0",
                      position: "absolute",
                      left: "-9999px",
                    }}
                  >
                    {plataforma}
                  </span>
                  <Icon
                    icon={`${getPlatformIcon(plataforma, platforms)}`}
                    color={styles.purple}
                  />
                </li>
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
