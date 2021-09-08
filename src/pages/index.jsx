/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect, useCallback } from "react";
import yaml from "js-yaml";

import Head from "next/head";

import { Button } from "react-bootstrap";
import Drawer from "@bit/mui-org.material-ui.drawer";
import { Icon } from "@iconify/react";

import InfiniteScroll from "react-infinite-scroll-component";

import Header from "../components/Header";
import Card from "../components/Card";
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
  const cardNumberPerLoading = 12;

  const [toolsData, setToolsData] = useState([...initialToolsData]);

  const [filteredToolsData, setFilteredToolsData] = useState([
    ...initialToolsData,
  ]);

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

  // Infinite Scroll
  const [count, setCount] = useState({
    prev: 0,
    next: cardNumberPerLoading,
  });

  const [hasMore, setHasMore] = useState(true);

  const [current, setCurrent] = useState(
    initialToolsData.slice(count.prev, count.next)
  );

  // Ao inicializar o componente
  useEffect(() => {
    const fetchUpdatedData = async () => {
      //Lista de ferramentas
      const updatedToolsData = await fetch("/toolkit_ddj/data/tools.yml")
        .then((res) => res.text())
        .then((data) => yaml.load(data));

      setToolsData([...updatedToolsData]);

      //Lista de plataformas
      const updatedPlatformsData = await fetch(
        "/toolkit_ddj/data/platforms.yml"
      )
        .then((res) => res.text())
        .then((data) => yaml.load(data));

      setPlatforms(updatedPlatformsData);

      //Lista de categorias
      const updatedCategoriesData = await fetch(
        "/toolkit_ddj/data/categories.yml"
      )
        .then((res) => res.text())
        .then((data) => yaml.load(data));

      setCategories(updatedCategoriesData);
    };

    fetchUpdatedData();

    const filteredDatabase = filterDatabase();
    setFilteredToolsData(filteredDatabase);
  }, []);

  //Atualiza os filtros de categorias
  useEffect(() => {
    setCategoryFilters(() => {
      return categories.map((category) => {
        return {
          slug: category.slug,
          label: category.nome,
          isChecked: category.nome === "Visualização" ? true : false,
        };
      });
    });
  }, [categories]);

  //Atualiza os filtros de plataformas
  useEffect(() => {
    setPlatformFilters(() => {
      return platforms.map((platform) => {
        return {
          label: platform.nome,
          isChecked: true,
        };
      });
    });
  }, [platforms]);

  // Filtra novamente base de dados original toda vez que um dos filtros muda
  useEffect(() => {
    const filteredDatabase = filterDatabase();
    setFilteredToolsData(filteredDatabase);
  }, [
    toolsData,
    categoryFilters,
    platformFilters,
    onlyOpenSourceFilter,
    searchInput,
  ]);

  useEffect(() => {
    setCount({ prev: 0, next: cardNumberPerLoading });
    setCurrent(filteredToolsData.slice(0, cardNumberPerLoading));
    setHasMore(true);
  }, [filteredToolsData]);

  // Checa se ainda tem mais ferramentas toda vez que o current muda
  useEffect(() => {
    if (current.length === filteredToolsData.length) {
      setHasMore(false);
    }
  }, [current, filteredToolsData]);

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleMoreDataButtonClick = () => {
    if (current.length === filteredToolsData.length) {
      setHasMore(false);
      return;
    }

    setCurrent(
      current.concat(
        filteredToolsData.slice(
          count.prev + cardNumberPerLoading,
          count.next + cardNumberPerLoading
        )
      )
    );

    setCount((prevState) => ({
      prev: prevState.prev + cardNumberPerLoading,
      next: prevState.next + cardNumberPerLoading,
    }));
  };

  //Aplica todos os filtros à base original de dados e retorna a base filtrada e ordenada
  const filterDatabase = () => {
    return toolsData
      .filter((item) => !item.desativado) //remove itens desativados
      .filter(categoryFilterRule)
      .filter(platformFilterRule)
      .filter(onlyOpenSourceFilterRule)
      .filter(searchFilterRule)
      .sort(sortRule);
  };

  /*--- Filter Rules ---*/
  //Remove itens inativos
  const removeInactiveRule = (item) => {
    return !item.desativado;
  };

  // Retorna o item se a categoria dele for encontrada dentre os filtros de categoria marcados
  const categoryFilterRule = (item) => {
    const categoryCheckedFilters = categoryFilters
      .filter((filterItem) => filterItem.isChecked)
      .map((filterItem) => filterItem.label);

    if (categoryCheckedFilters.length === 0) {
      return false;
    } else {
      return categoryCheckedFilters.indexOf(item.categoria) !== -1;
    }
  };

  // Retorna o item se a quantidade de suas plataformas que for igual às plataformas marcadas for maior que zero
  const platformFilterRule = (item) => {
    // Copia a array de plataformas do item para uma nova variável
    const itemPlatforms = [...item.plataforma];

    const platformCheckedFilters = platformFilters
      .filter((filterItem) => filterItem.isChecked)
      .map((filterItem) => filterItem.label);

    if (platformCheckedFilters.length === 0) {
      return false;
    } else {
      // 'match' guarda todas as plataformas do item que estão inclusas na array de plataformas marcadas
      const match = itemPlatforms.filter((platform) => {
        return platformCheckedFilters.includes(platform);
      });

      // se o nº de plataformas do item inclusas nas plataformas marcadas for maior que 0, retorna o item
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
    return b.destaque - a.destaque || a.categoria < b.categoria;
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

  return (
    <div>
      <Head>
        <title>Caixa de Ferramentas | Jornalismo de Dados</title>
        <meta
          name="description"
          content={`Explore mais de ${
            toolsData.filter(removeInactiveRule).length
          } ferramentas para jornalistas de dados e colabore para aumentar a base.`}
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
        toolsNumber={
          toolsData.length > 0
            ? toolsData.filter(removeInactiveRule).length
            : 144
        }
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

          {filteredToolsData.length > 0 ? (
            <div className={styles.resultsContainer}>
              <div className={styles.resultsInfo}>
                <span className={styles.resultsNumber}>
                  {filteredToolsData.length}
                </span>{" "}
                {filteredToolsData === 1 ? "Resultado" : "Resultados"}
              </div>
              <InfiniteScroll
                className={styles.cardsContainer}
                dataLength={current.length}
                hasMore={hasMore}
                // loader={<h4>Carregando mais resultados...</h4>}
                endMessage={
                  <div
                    className={styles.allResultsLoadedMessage}
                    style={{ textAlign: "center" }}
                  >
                    <strong>Todos os resultados foram carregados!</strong>
                  </div>
                }
              >
                {current &&
                  current.map((tool, index) => (
                    <Card
                      key={index}
                      toolData={tool}
                      categories={categories}
                      platforms={platforms}
                    />
                  ))}
              </InfiniteScroll>
              {hasMore && (
                <div className={styles.loadMoreButtonContainer}>
                  <Button
                    variant="load-more"
                    className={styles.loadMoreButton}
                    onClick={handleMoreDataButtonClick}
                  >
                    <Icon icon="mdi:plus" color={styles.red} />
                    Carregar mais
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4>Carregando resultados...</h4>
            </div>
          )}
        </div>

        <div className={styles.fabButtonsContainer}>
          {/* Abrir painel com os filtros */}
          <Button
            className={`${styles.backToTopButton} ${styles.fabButton}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Icon icon="mdi:chevron-up" color="#fff" />
          </Button>

          {/* Voltar ao topo da página */}
          <Button
            className={`${styles.openDrawerFiltersButton} ${styles.fabButton}`}
            onClick={toggleDrawer(true)}
          >
            <Icon icon="mdi:filter" color="#fff" />
          </Button>
        </div>

        <Drawer
          classes={{ paper: styles.drawerInner }}
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Button
            variant="light"
            className={styles.drawerCloseButton}
            onClick={toggleDrawer(false)}
          >
            <Icon icon="mdi:close" color="#000" />
          </Button>
          <FiltersGroup
            isSideDrawer={true}
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
          <Button
            className={styles.drawerApplyFiltersButton}
            onClick={toggleDrawer(false)}
          >
            Aplicar filtros
          </Button>
        </Drawer>
      </main>

      <Footer handleModalOpen={handleModalOpen} />
    </div>
  );
}
