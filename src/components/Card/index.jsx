import React from "react";

import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

const Card = () => {
  return (
    <article className={styles.toolCard}>
      <header>
        <h2 className={styles.toolName}>Nome da ferramenta</h2>
        <p className={styles.toolDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          malesuada mattis tellus ut ullamcorper. Nullam mollis nunc at
          tincidunt dignissim. Integer pellentesque nulla a enim maximus
          fermentum.
        </p>
      </header>
      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Categorias</h3>
        <div>
          <span className={`${styles.toolCategory} ${styles.visualizacao}`}>
            Visualização
          </span>
        </div>
      </section>

      <section className={styles.toolDetailsContainer}>
        <h3 className={styles.toolDetailsTitle}>Plataformas</h3>
        <div>
          <Icon
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
          />
        </div>
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
