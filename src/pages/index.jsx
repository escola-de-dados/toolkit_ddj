/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect } from "react";
import yaml from "js-yaml";

import Head from "next/head";
import Script from "next/script";

import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import InfoModal from "../components/InfoModal";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const [categoryFilters, setCategoryFilters] = useState([
    { label: "Visualização", isChecked: false },
    { label: "Obtenção", isChecked: false },
    { label: "Análise", isChecked: false },
    { label: "Cartografia", isChecked: false },
    { label: "Publicação", isChecked: false },
    { label: "Limpeza", isChecked: false },
    { label: "Redes", isChecked: false },
    { label: "Multi", isChecked: false },
    { label: "Programação", isChecked: false },
  ]);

  const [isFiltered, setIsFiltered] = useState(false);

  const [toolsData, setToolsData] = useState([]);

  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showAboutPageModal, setShowAboutPageModal] = useState(false);

  const fetchUpdatedData = async () => {
    const updatedData = await fetch("/toolkit_ddj/data/tools.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));
    console.log(updatedData);

    setToolsData([...updatedData]);
  };

  useEffect(() => {
    fetchUpdatedData();
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

  const getCheckedCategoryFilters = () => {
    return categoryFilters
      .filter((filterItem) => filterItem.isChecked)
      .map((filterItem) => filterItem.label);
  };

  // Filter change handler
  const onFilter = (event) => {
    const {
      target: { value, checked },
    } = event;

    setCategoryFilters((currentFilters) =>
      currentFilters.map((f) => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked,
          };
        }
        return f;
      })
    );
  };

  //Category filtering function
  const filterRule = (item) => {
    const checkedFilters = getCheckedCategoryFilters();

    if (checkedFilters.length === 0) {
      // if (isFiltered) {
      //   setIsFiltered(false);
      // }

      return true;
    } else {
      // if (!isFiltered) {
      //   setIsFiltered(true);
      // }

      return checkedFilters.indexOf(item.categoria) !== -1;
    }
  };

  const sortRule = (a, b) => {
    //Primeiro ordena pelos destaques, depois pelas categorias
    return b.destaque - a.destaque || a.categoria < b.categoria;
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

      <Header
        toolsNumber={toolsData.length > 0 ? toolsData.length : 144}
        handleModalOpen={handleModalOpen}
      />

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
          <div className="filter-container">
            {categoryFilters.map((f) => (
              <div className="filter" key={`${f.label}_key`}>
                <input
                  id={f.label}
                  type="checkbox"
                  value={f.label}
                  onChange={onFilter}
                  checked={f.isChecked}
                />
                <label htmlFor={f.label}>{f.label}</label>
              </div>
            ))}
          </div>

          {toolsData.length > 0 ? (
            <div className={styles.resultsContainer}>
              <div className={styles.resultsInfo}>
                <span className={styles.resultsNumber}>{toolsData.length}</span>{" "}
                Resultados
              </div>

              <div className={styles.cardsContainer}>
                {toolsData
                  .filter(filterRule)
                  .sort(sortRule)
                  .map(
                    (tool, index) =>
                      !tool.desativado && <Card key={index} toolData={tool} />
                  )}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>

      <Footer handleModalOpen={handleModalOpen} />
    </div>
  );
}
