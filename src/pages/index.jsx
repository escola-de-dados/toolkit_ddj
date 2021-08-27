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

export async function getStaticProps(context) {
  const initialToolsData = await fetch(
    "https://escola-de-dados.github.io/toolkit_ddj/data/tools.yml"
  )
    .then((res) => res.text())
    .then((data) => yaml.load(data))
    .catch((err) => {
      throw new Error(err);
    });

  const initialPlatformsData = await fetch(
    "https://escola-de-dados.github.io/toolkit_ddj/data/platforms.yml"
  )
    .then((res) => res.text())
    .then((data) => yaml.load(data))
    .catch((err) => {
      throw new Error(err);
    });

  const initialPlatformFilters = initialPlatformsData.map((platform) => {
    return {
      label: platform.nome,
      isChecked: false,
    };
  });

  if (!initialPlatformsData || !initialToolsData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialToolsData,
      initialPlatformsData,
      initialPlatformFilters,
    }, // will be passed to the page component as props
  };
}

export default function Home({
  initialToolsData,
  initialPlatformsData,
  initialPlatformFilters,
}) {
  const [toolsData, setToolsData] = useState([]);

  const [platforms, setPlatforms] = useState([...initialPlatformsData]);

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

  const [platformFilters, setPlatformFilters] = useState([
    ...initialPlatformFilters,
  ]);

  const [isFiltered, setIsFiltered] = useState(false);

  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showAboutPageModal, setShowAboutPageModal] = useState(false);

  const fetchUpdatedData = async () => {
    const updatedToolsData = await fetch("/toolkit_ddj/data/tools.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));

    // console.log("line 93 ", updatedToolsData);

    setToolsData([...updatedToolsData]);

    const updatedPlatformsData = await fetch("/toolkit_ddj/data/platforms.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));

    setPlatforms(updatedPlatformsData);

    setPlatformFilters(() => {
      return platforms.map((platform) => {
        return {
          label: platform.nome,
          isChecked: false,
        };
      });
    });
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

  const getCheckedPlatformFilters = () => {
    return platformFilters
      .filter((filterItem) => filterItem.isChecked)
      .map((filterItem) => filterItem.label);
  };

  // Filter change handler
  const onCategoryFilter = (event) => {
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

  // Filter change handler
  const onPlatformFilter = (event) => {
    const {
      target: { value, checked },
    } = event;

    setPlatformFilters((currentFilters) =>
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

  const removeUnactive = (item) => {
    return !item.desativado;
  };

  //Category filtering function
  const categoryFilterRule = (item) => {
    const categoryCheckedFilters = getCheckedCategoryFilters();
    if (categoryCheckedFilters.length === 0) {
      return true;
    } else {
      return categoryCheckedFilters.indexOf(item.categoria) !== -1;
    }
  };

  const platformFilterRule = (item) => {
    const plataformas = [...item.plataforma];

    const platformCheckedFilters = getCheckedPlatformFilters();

    if (platformCheckedFilters.length <= 0) {
      return true;
    } else {
      const match = plataformas.filter((platform) => {
        return platformCheckedFilters.includes(platform);
      });

      return match.length > 0;
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
          <div className="filter-container d-flex flex-row justify-content-between">
            {/* filtros de categoria */}
            <div className="categoryFilters">
              {categoryFilters.map((f) => (
                <div className="filter" key={`${f.label}_key`}>
                  <input
                    id={f.label}
                    type="checkbox"
                    value={f.label}
                    onChange={onCategoryFilter}
                    checked={f.isChecked}
                  />
                  <label htmlFor={f.label}>{f.label}</label>
                </div>
              ))}
            </div>
            <div className="platformFilters">
              {platformFilters.map((f) => (
                <div className="filter" key={`${f.label}_key`}>
                  <input
                    id={f.label}
                    type="checkbox"
                    value={f.label}
                    onChange={onPlatformFilter}
                    checked={f.isChecked}
                  />
                  <label htmlFor={f.label}>{f.label}</label>
                </div>
              ))}
            </div>
          </div>

          {toolsData.length > 0 ? (
            <div className={styles.resultsContainer}>
              <div className={styles.resultsInfo}>
                <span className={styles.resultsNumber}>{toolsData.length}</span>{" "}
                {toolsData === 1 ? "Resultado" : "Resultados"}
              </div>

              <div className={styles.cardsContainer}>
                {toolsData
                  .filter(removeUnactive)
                  .filter(categoryFilterRule)
                  .filter(platformFilterRule)
                  .sort(sortRule)
                  .map((tool, index) => (
                    <Card key={index} toolData={tool} platforms={platforms} />
                  ))}
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
