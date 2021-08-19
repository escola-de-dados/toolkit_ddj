import React from "react";

import { Modal, Button } from "react-bootstrap";

import { Icon, InlineIcon } from "@iconify/react";

import styles from "./styles.module.scss";

const InfoModal = ({ type, showModal, onHide }) => {
  return (
    <Modal
      size="lg"
      dialogClassName={styles.customModalDialog}
      contentClassName={styles.customModalContent}
      show={showModal}
      onHide={onHide}
    >
      <Modal.Header className={styles.modalHeader}>
        <button onClick={onHide}>&times;</button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {type === "howTo" ? (
          <div className="mb-3">
            <h2 className={`${styles.modalTitle} mb-4`}>Como contribuir?</h2>
            <p>
              A base que reúne as ferramentas mostradas nesta página está
              disponível no respositório da página no Github.
            </p>
            <p>
              Para adicionar uma ferramenta à base você pode fazer um{" "}
              <em>fork</em> do projeto e criar uma nova entrada no arquivo.
              Avaliaremos o seu Pull Request e, caso esteja tudo certo, sua
              contribuição será aceita e incorporada à base oficial.
            </p>
            <p>
              O processo está explicado em detalhes no repositório da página no
              Github:
            </p>
          </div>
        ) : (
          <div className="mb-3">
            <h2 className={`${styles.modalTitle} mb-4`}>
              O que é a Caixa de Ferramentas?
            </h2>
            <p>
              A Caixa de Ferramentas do Jornalismo de Dados é um projeto
              elaborado pela Escola de Dados, iniciativa da Open Knowledge
              Brasil.
            </p>
            <p>
              O objetivo desta página é divulgar de forma prática as ferramentas
              no ecossistema de tecnologia que se adequam à atividade do
              jornalismo de dados. As ferramentas são separadas por categorias e
              plataformas, além de serem identificadas como ferramentas de
              código aberto ou não.
            </p>
            <p>
              A Caixa de Ferramentas é um trabalho colaborativo. Se você tem uma
              sugestão de ferramenta que se encaixa na premissa da página, mas
              não está presente na base, você pode contribuir com a lista
              diretamente pelo Github:
            </p>
          </div>
        )}
        <Button
          variant="primary"
          href="https://github.com/escola-de-dados/toolkit_ddj"
        >
          <Icon icon="octicon:repo-forked-16" color="#fff" />
          Contribuir no GitHub
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
