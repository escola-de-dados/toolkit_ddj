import React from 'react'

import { Modal, Button } from "react-bootstrap"

import { Icon, InlineIcon } from '@iconify/react';
import repoForked16 from '@iconify/icons-octicon/repo-forked-16';

import styles from './styles.module.scss';

const InfoModal  = ({type, showModal, onHide}) => {
  return (
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header className={styles.modalHeader}>
        <button onClick={onHide}>&times;</button>
      </Modal.Header>
      {type === "howTo" ?
        <Modal.Body className={styles.modalBody}>
          <h2>Como contribuir?</h2>
          <p>Para adicionar uma ferramenta à base você pode Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna tellus, pellentesque et ante ut, molestie molestie turpis. Donec eu orci lorem. Vivamus non faucibus quam. Vivamus lobortis suscipit tellus a fringilla. Curabitur ullamcorper justo at erat aliquam consequat quis et ligula.</p>
          <p>O processo está explicado em mais detalhes na página do projeto no Github:</p>
          <Button>
            <Icon icon={repoForked16} style={{color: '#ffffff', fontSize: '16px'}} />
            Contribuir no GitHub
          </Button>
        </Modal.Body>
      :
      <Modal.Body className={styles.modalBody}>
          <h2>O que é a Caixa de Ferramentas</h2>
          <p>Para adicionar uma ferramenta à base você pode Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna tellus, pellentesque et ante ut, molestie molestie turpis. Donec eu orci lorem. Vivamus non faucibus quam. Vivamus lobortis suscipit tellus a fringilla. Curabitur ullamcorper justo at erat aliquam consequat quis et ligula.</p>
          <p>Para adicionar uma ferramenta à base você pode Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam urna tellus, pellentesque et ante ut, molestie molestie turpis. Donec eu orci lorem. Vivamus non faucibus quam. Vivamus lobortis suscipit tellus a fringilla. Curabitur ullamcorper justo at erat aliquam consequat quis et ligula.</p>
          <Button>
            <Icon icon={repoForked16} style={{color: '#ffffff', fontSize: '16px'}} />
            Contribuir no GitHub
          </Button>
        </Modal.Body>
      }
    </Modal>
  )
}

export default InfoModal
