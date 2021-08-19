/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect } from "react";
import yaml from "js-yaml";

import Head from "next/head";

import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import InfoModal from "../components/InfoModal";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [toolsData, setToolsData] = useState([]);

  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showAboutPageModal, setShowAboutPageModal] = useState(false);

  const getUpdatedData = async () => {
    const updatedData = await fetch("/toolkit_ddj/data/tools.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));
    console.log(updatedData);
    setToolsData([...updatedData]);
  };

  useEffect(() => {
    getUpdatedData();
  }, []);

  const handleModalClose = () => {
    if (showHowToModal) {
      setShowHowToModal(false);
    } else {
      setShowAboutPageModal(false);
    }
  };

  const handleModalOpen = (modalName) => {
    if (modalName === "howTo") {
      setShowHowToModal(true);
    } else {
      setShowAboutPageModal(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Caixa de Ferramentas | Jornalismo de Dados</title>
        <meta
          name="description"
          content="Explore mais de 140 ferramentas para jornalistas de dados e colabore para aumentar a base."
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header handleModalOpen={handleModalOpen} />

      <InfoModal
        showModal={showHowToModal}
        onHide={handleModalClose}
        type="howTo"
      />
      <InfoModal
        showModal={showAboutPageModal}
        onHide={handleModalClose}
        type="aboutPage"
      />

      <main>
        <div className={styles.contentContainer}>
          {/* aqui entram os filtros */}
          {/* aqui entra o número de resultados */}
          <div className={styles.cardsContainer}>
            <Card />
            {/*
            {toolsData.length > 0 ?
            toolsData.map((tool, index) => {
              return(
                <div key={index} style={{marginBottom: "50px"}}>
                  <h2>{tool.nome}</h2>
                  <p><a href={tool.link}>{tool.link}</a></p>
                  <p><a href={tool.github}>{tool.github}</a></p>
                  <p>Descrição: {tool["descrição"]}</p>
                  <p>Categoria: {tool.categoria}</p>
                  {Array.isArray(tool.plataforma) ?
                    <div>
                      <p>Plataformas:</p>
                      <ul>
                      {tool.plataforma.map((plataforma, index) => {
                          return(
                            <li key={index}>{plataforma}</li>
                          )
                        })}
                      </ul>
                    </div>
                  :
                  <p>Plataforma: {tool.plataforma}</p>
                  }
                </div>
              )
            })
            :
            <div>Loading...</div>
            } 
          */}
          </div>
        </div>
      </main>

      <Footer handleModalOpen={handleModalOpen} />
    </div>
  );
}
