/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect } from "react";
import yaml from "js-yaml";

import Head from "next/head";

import { InputGroup, Form, Button } from "react-bootstrap";
import { sizing } from "@material-ui/system";
import Drawer from "@bit/mui-org.material-ui.drawer";
import { Icon } from "@iconify/react";

import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";
import FiltersGroup from "../components/FiltersGroup";
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

  const initialCategoriesData = await fetch(
    "https://escola-de-dados.github.io/toolkit_ddj/data/categories.yml"
  )
    .then((res) => res.text())
    .then((data) => yaml.load(data))
    .catch((err) => {
      throw new Error(err);
    });

  if (!initialPlatformsData || !initialToolsData || !initialCategoriesData) {
    return {
      notFound: true,
    };
  }

  const initialPlatformFilters = initialPlatformsData.map((platform) => {
    return {
      label: platform.nome,
      isChecked: true,
    };
  });

  const initialCategoryFilters = initialCategoriesData.map((category) => {
    return {
      slug: category.slug,
      label: category.nome,
      isChecked: category.nome === "Visualização" ? true : false,
    };
  });

  return {
    props: {
      initialToolsData,
      initialPlatformsData,
      initialPlatformFilters,
      initialCategoriesData,
      initialCategoryFilters,
    }, // will be passed to the page component as props
  };
}

export default function Home({
  initialToolsData,
  initialPlatformsData,
  initialPlatformFilters,
  initialCategoriesData,
  initialCategoryFilters,
}) {
  const [toolsData, setToolsData] = useState([]);

  const [platforms, setPlatforms] = useState([...initialPlatformsData]);

  const [categories, setCategories] = useState([...initialCategoriesData]);

  const [searchInput, setSearchInput] = useState("");

  const [categoryFilters, setCategoryFilters] = useState([
    ...initialCategoryFilters,
  ]);

  const [platformFilters, setPlatformFilters] = useState([
    ...initialPlatformFilters,
  ]);

  const [onlyOpenSourceFilter, setOnlyOpenSourceFilter] = useState(false);

  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showAboutPageModal, setShowAboutPageModal] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const fetchUpdatedData = async () => {
    const updatedToolsData = await fetch("/toolkit_ddj/data/tools.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));

    setToolsData([...updatedToolsData]);

    const updatedPlatformsData = await fetch("/toolkit_ddj/data/platforms.yml")
      .then((res) => res.text())
      .then((data) => yaml.load(data));

    setPlatforms(updatedPlatformsData);

    setPlatformFilters(() => {
      return platforms.map((platform) => {
        return {
          label: platform.nome,
          isChecked: true,
        };
      });
    });

    const updatedCategoriesData = await fetch(
      "/toolkit_ddj/data/categories.yml"
    )
      .then((res) => res.text())
      .then((data) => yaml.load(data));

    setCategories(updatedCategoriesData);

    setCategoryFilters(() => {
      return categories.map((category) => {
        return {
          slug: category.slug,
          label: category.nome,
          isChecked: category.nome === "Visualização" ? true : false,
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

  /*--- Filter Handlers ---*/
  const onSearch = (event) => {
    setSearchInput(event.target.value);
  };

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

  const clearCategoryFilters = () => {
    setCategoryFilters((currentFilters) =>
      currentFilters.map((f) => {
        return {
          ...f,
          isChecked: true,
        };
      })
    );
  };

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

  const clearPlatformFilters = () => {
    setPlatformFilters((currentFilters) =>
      currentFilters.map((f) => {
        return {
          ...f,
          isChecked: true,
        };
      })
    );
  };

  const onOnlyOpenSourceFilter = (event) => {
    const {
      target: { checked },
    } = event;

    setOnlyOpenSourceFilter(checked);
  };

  /*--- Filter Rules ---*/
  const removeInactiveRule = (item) => {
    return !item.desativado;
  };

  const categoryFilterRule = (item) => {
    const categoryCheckedFilters = getCheckedCategoryFilters();
    if (categoryCheckedFilters.length === 0) {
      return false;
    } else {
      return categoryCheckedFilters.indexOf(item.categoria) !== -1;
    }
  };

  const platformFilterRule = (item) => {
    const plataformas = [...item.plataforma];

    const platformCheckedFilters = getCheckedPlatformFilters();

    if (platformCheckedFilters.length === 0) {
      return false;
    } else {
      const match = plataformas.filter((platform) => {
        return platformCheckedFilters.includes(platform);
      });

      return match.length > 0;
    }
  };

  const onlyOpenSourceFilterRule = (item) =>
    onlyOpenSourceFilter ? item["open-source"] : true;

  const searchFilterRule = (item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
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
          {/* Filtros */}
          <FiltersGroup
            filtersData={{
              onSearch,
              categoryFilters,
              onCategoryFilter,
              clearCategoryFilters,
              platformFilters,
              platforms,
              onPlatformFilter,
              clearPlatformFilters,
              onOnlyOpenSourceFilter,
              onlyOpenSourceFilter,
            }}
          />

          {toolsData.length > 0 ? (
            <div className={styles.resultsContainer}>
              <div className={styles.resultsInfo}>
                <span className={styles.resultsNumber}>{toolsData.length}</span>{" "}
                {toolsData === 1 ? "Resultado" : "Resultados"}
              </div>

              <div className={styles.cardsContainer}>
                {toolsData
                  .filter(removeInactiveRule)
                  .filter(categoryFilterRule)
                  .filter(platformFilterRule)
                  .filter(onlyOpenSourceFilterRule)
                  .filter(searchFilterRule)
                  .sort(sortRule)
                  .map((tool, index) => (
                    <Card
                      key={index}
                      toolData={tool}
                      categories={categories}
                      platforms={platforms}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <Button
          className={styles.openPopupFiltersButton}
          onClick={toggleDrawer(true)}
        >
          <Icon icon="mdi:filter" color="#fff" />
        </Button>

        <Drawer
          classes={{ paper: styles.popupFiltersDrawerInner }}
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Button
            variant="light"
            className={styles.popupFiltersCloseButton}
            onClick={toggleDrawer(false)}
          >
            <Icon icon="mdi:close" color="#000" />
          </Button>
          <FiltersGroup
            filtersData={{
              onSearch,
              categoryFilters,
              onCategoryFilter,
              clearCategoryFilters,
              platformFilters,
              platforms,
              onPlatformFilter,
              clearPlatformFilters,
              onOnlyOpenSourceFilter,
              onlyOpenSourceFilter,
            }}
          />
        </Drawer>
      </main>

      <Footer handleModalOpen={handleModalOpen} />
    </div>
  );
}
