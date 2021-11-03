/* eslint-disable @next/next/no-page-custom-font */
import { useState, useEffect, useRef } from "react";
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

const env = process.env.NODE_ENV;

import { promises as fs } from "fs";
import path from "path";

export async function getStaticProps(context) {
  const dataDirectory = path.join(process.cwd(), "docs/data");

  const initialToolsData = await fs
    .readFile(path.join(dataDirectory, "tools.yml"))
    .then((data) => yaml.load(data))
    .catch((err) => {
      throw new Error(err);
    });

  const initialPlatformsData = await fs
    .readFile(path.join(dataDirectory, "platforms.yml"))
    .then((data) => yaml.load(data))
    .catch((err) => {
      throw new Error(err);
    });

  const initialCategoriesData = await fs
    .readFile(path.join(dataDirectory, "categories.yml"))
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
      description: category["descrição"],
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
  //Refs
  const cardNumberPerLoading = useRef(12);

  const isInitialCountMount = useRef(true);

  /*--- States ---*/
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

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedPlatform, setSelectedPlatform] = useState("");

  const [onlyOpenSourceFilter, setOnlyOpenSourceFilter] = useState(false);

  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showAboutPageModal, setShowAboutPageModal] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Infinite Scroll
  const [count, setCount] = useState({
    prev: 0,
    next: cardNumberPerLoading.current,
  });

  const [hasMore, setHasMore] = useState(true);

  const [current, setCurrent] = useState(
    initialToolsData.slice(count.prev, count.next)
  );
  /*--- END - States ---*/

  /*--- useEffects ---*/

  // Ao inicializar o componente
  useEffect(() => {
    //Muda o número de cards carregados por vez se a tela for pequena
    if (window.innerWidth <= 576) {
      cardNumberPerLoading.current = 6;
    }

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

    // Só busca dados atualizados nesse local se estiver no ambiente de desenvolvimento
    if (env !== "development") {
      fetchUpdatedData();
    }

    const filteredtoolsDatabase = filterAndSorttoolsDatabase();
    setFilteredToolsData(filteredtoolsDatabase);
  }, []);

  //Atualiza os filtros de categorias toda vez que a lista de categorias muda
  useEffect(() => {
    setCategoryFilters(() => {
      return categories.map((category) => {
        return {
          slug: category.slug,
          label: category.nome,
          description: category["descrição"],
          isChecked: false,
        };
      });
    });
  }, [categories]);

  //Atualiza os filtros de plataformas toda vez que a lista de plataformas muda
  useEffect(() => {
    setPlatformFilters(() => {
      return platforms.map((platform) => {
        return {
          label: platform.nome,
          isChecked: false,
        };
      });
    });
  }, [platforms]);

  // Filtra novamente base de dados original toda vez que um dos filtros muda
  useEffect(() => {
    const filteredtoolsDatabase = filterAndSorttoolsDatabase();
    setFilteredToolsData(filteredtoolsDatabase);
  }, [
    toolsData,
    categoryFilters,
    platformFilters,
    selectedCategory,
    selectedPlatform,
    onlyOpenSourceFilter,
    searchInput,
  ]);

  // Reseta o contador, o current das ferramentas e o hasMore toda vez que a base é filtrada
  useEffect(() => {
    setCount({ prev: 0, next: cardNumberPerLoading.current });
    setCurrent(filteredToolsData.slice(0, cardNumberPerLoading.current));
    setHasMore(true);
  }, [filteredToolsData]);

  // Checa se ainda tem mais ferramentas toda vez que o current muda
  useEffect(() => {
    if (current.length === filteredToolsData.length) {
      setHasMore(false);
    }
  }, [current, filteredToolsData]);

  //Muda o foco para o primeiro novo card após a mudança de count
  useEffect(() => {
    if (isInitialCountMount.current) {
      isInitialCountMount.current = false;
    } else {
      if (
        (count.next > 12 && window.innerWidth > 576) ||
        (count.next > 6 && window.innerWidth <= 576)
      ) {
        if (document.getElementById("new-first-card")) {
          document.getElementById("new-first-card").focus();
        }
      }
    }
  }, [count]);
  /*--- END - useEffects ---*/

  //Aplica os filtros à base original de dados e retorna a base filtrada e ordenada
  const filterAndSorttoolsDatabase = () => {
    const filteredtoolsDatabase = toolsData
      .filter(removeInactiveRule)
      .filter(categoryFilterRule)
      .filter(platformFilterRule)
      .filter(onlyOpenSourceFilterRule);

    const orderedtoolsDatabase = orderByThreeHighlights(filteredtoolsDatabase);

    return orderedtoolsDatabase
      .filter(categoryFilterRule)
      .filter(platformFilterRule)
      .filter(onlyOpenSourceFilterRule)
      .filter(searchFilterRule);
  };

  /*--- Filter Rules ---*/

  //Remove itens inativos
  const removeInactiveRule = (item) => {
    return !item.desativado;
  };

  // Retorna o item se a categoria dele for encontrada dentre os filtros de categoria marcados
  const categoryFilterRule = (item) => {
    return selectedCategory === ""
      ? true
      : item.categoria.includes(selectedCategory);
  };

  // Retorna o item se a quantidade de suas plataformas que for igual às plataformas marcadas for maior que zero
  const platformFilterRule = (item) => {
    return selectedPlatform === ""
      ? true
      : item.plataforma.includes(selectedPlatform);
  };

  // Retorna apenas itens de código aberto
  const onlyOpenSourceFilterRule = (item) =>
    onlyOpenSourceFilter ? item["open-source"] : true;

  // Retorna itens que incluam o termo pesquisado em qualquer uma de suas propriedades
  const searchFilterRule = (item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  };
  /*--- END - Filter Rules ---*/

  /*--- Funções para ordenar a lista com três destaques aleatórios no início ---*/
  const extractThreeRandomHighlights = (toolsDatabase) => {
    const allHighlights = toolsDatabase.filter((tool) => tool.destaque);
    let threeRandom = [];

    if (allHighlights.length >= 3) {
      for (let i = 0; i <= 2; i++) {
        // Puxa um item destaque aleatório
        let randomItem =
          allHighlights[Math.floor(Math.random() * allHighlights.length)];

        // Se o item puxado já estiver na lista dos três aleatórios, puxa outro até vir um único
        if (i > 0 && threeRandom.some((item) => item.id === randomItem.id)) {
          while (threeRandom.some((item) => item.id === randomItem.id)) {
            randomItem =
              allHighlights[Math.floor(Math.random() * allHighlights.length)];
          }
        }

        threeRandom.push(randomItem);
      }
    } else {
      threeRandom = allHighlights.slice(0); // Se o número de destaques na categoria for menor que 3, adiciona todos à lista
    }

    const threeRandomIds = threeRandom.map((item) => item.id);

    // Cria uma nova base completa sem os três destaques aleatórios
    const newArrayWithoutThreeHighlights = toolsDatabase.filter((item) => {
      return !threeRandomIds.includes(item.id);
    });

    return [threeRandom, newArrayWithoutThreeHighlights];
  };

  const orderByThreeHighlights = (toolsDatabase) => {
    const [threeRandom, toolsDatabaseWithoutRandom] =
      extractThreeRandomHighlights(toolsDatabase);

    // Ordena a base sem os três destaques por categoria
    const orderedtoolsDatabaseWithoutRandom = toolsDatabaseWithoutRandom.sort(
      (a, b) => {
        return a.categoria < b.categoria;
      }
    );

    return threeRandom.concat(orderedtoolsDatabaseWithoutRandom);
  };
  /*--- END - Funções para ordenar a lista com três destaques aleatórios no início ---*/

  /*--- Event Handlers ---*/
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

  const handleMoreDataButtonClick = () => {
    if (current.length === filteredToolsData.length) {
      setHasMore(false);
      return;
    }

    setCurrent(
      current.concat(
        filteredToolsData.slice(
          count.prev + cardNumberPerLoading.current,
          count.next + cardNumberPerLoading.current
        )
      )
    );

    setCount((prevState) => ({
      prev: prevState.prev + cardNumberPerLoading.current,
      next: prevState.next + cardNumberPerLoading.current,
    }));
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

  /* Filter Handlers */
  const onSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const onCategoryFilter = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedCategory(value);
  };

  const clearCategoryFilters = () => {
    setSelectedCategory("");
  };

  const onPlatformFilter = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedPlatform(value);
  };

  const clearPlatformFilters = () => {
    setSelectedPlatform("");
    setPlatformFilters((currentFilters) =>
      currentFilters.map((f) => {
        return {
          ...f,
          isChecked: false,
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
  /* END - Filter Handlers */
  /*--- END - Event Handlers ---*/

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

        {/* Icons */}
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Fonts */}
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
        <div className={styles.fabButtonsContainer}>
          {/* Abrir painel com os filtros */}
          <Button
            aria-label="Voltar ao início da página"
            className={`${styles.backToTopButton} ${styles.fabButton}`}
            onClick={() => {
              document.getElementById("github-corner").focus();
              window.scrollTo(0, 0);
            }}
          >
            <Icon icon="mdi:chevron-up" color="#fff" />
          </Button>

          {/* Voltar ao topo da página */}
          <Button
            aria-label="Abrir janela de filtros"
            className={`${styles.openDrawerFiltersButton} ${styles.fabButton}`}
            onClick={toggleDrawer(true)}
          >
            <Icon icon="mdi:filter" color="#fff" />
          </Button>
        </div>

        <div className={styles.contentContainer}>
          {/* Filtros */}
          <FiltersGroup
            filtersData={{
              onSearch,
              categoryFilters,
              onCategoryFilter,
              selectedCategory,
              clearCategoryFilters,
              platformFilters,
              onPlatformFilter,
              selectedPlatform,
              platforms,
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
                {filteredToolsData.length === 1 ? "Resultado" : "Resultados"}
              </div>
              {filteredToolsData.filter((item) => item.destaque).length > 0 && (
                <div className={styles.highlightsTitleContainer}>
                  <Icon icon="mdi:star" color={styles.yellow} />
                  <span className={styles.highlightsTitle}>
                    Nossos destaques
                  </span>
                </div>
              )}
              <InfiniteScroll
                className={styles.cardsContainer}
                dataLength={current.length}
                hasMore={hasMore}
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
                  current.map((tool, index) => {
                    const currentHighlightsNumber = current.filter(
                      (item) => item.destaque
                    ).length;

                    if (
                      tool.destaque &&
                      (index === 2 ||
                        (currentHighlightsNumber < 3 &&
                          index === currentHighlightsNumber - 1))
                    ) {
                      return (
                        <>
                          <Card
                            key={index}
                            toolData={tool}
                            categories={categories}
                            platforms={platforms}
                          />
                          <div
                            key="highlight-separator"
                            tabIndex="0"
                            className={styles.highlightsSeparator}
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
                              Fim dos destaques
                            </span>
                          </div>
                        </>
                      );
                    } else if (
                      index === current.length - cardNumberPerLoading.current ||
                      (current.length < 24 && index === 12)
                    ) {
                      return (
                        <Card
                          id="new-first-card"
                          key={index}
                          toolData={tool}
                          categories={categories}
                          platforms={platforms}
                        />
                      );
                    } else {
                      return (
                        <Card
                          key={index}
                          toolData={tool}
                          categories={categories}
                          platforms={platforms}
                        />
                      );
                    }
                  })}
              </InfiniteScroll>
              {hasMore && (
                <div className={styles.loadMoreButtonContainer}>
                  <Button
                    variant="load-more"
                    aria-label="Carregar mais ferramentas"
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
            <div
              className={styles.allResultsLoadedMessage}
              style={{ textAlign: "center" }}
            >
              <strong>
                Não foi encontrado nenhum resultado para esta filtragem
              </strong>
            </div>
          )}
        </div>

        <Drawer
          PaperProps={{ id: "filter-drawer", tabindex: "0" }}
          classes={{ paper: styles.drawerInner }}
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Button
            autoFocus
            id="close-drawer-button"
            variant="light"
            aria-label="Fechar janela de filtros"
            className={styles.closeDrawerButton}
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
              selectedCategory,
              clearCategoryFilters,
              platformFilters,
              onPlatformFilter,
              selectedPlatform,
              platforms,
              clearPlatformFilters,
              onOnlyOpenSourceFilter,
              onlyOpenSourceFilter,
            }}
          />
          <Button
            className={styles.applyFiltersButton}
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
