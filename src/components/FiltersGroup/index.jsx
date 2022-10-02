import React from "react";

import { InputGroup, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { getPlatformIcon } from "../../utils/utils";

import styles from "./styles.module.scss";
import WorldWideWebIcon from "../WorldWideWebIcon";

const FiltersGroup = ({ filtersData, isSideDrawer }) => {
  return (
    <div
      className={`${styles.allFilters} ${isSideDrawer && styles.drawerFilters}`}
    >
      <div className={styles.radioFiltersContainer}>
        {/* Pesquisa - Side Drawer */}
        {isSideDrawer && (
          <InputGroup className={styles.searchContainer}>
            <Form.Control
              id={isSideDrawer && "drawer-search-input"}
              type="search"
              placeholder="Pesquise por qualquer ferramenta..."
              onChange={(e) => filtersData.onSearch(e)}
            />
            <Button
              aria-label="Pesquisar"
              variant="inside-input"
              id="button-addon1"
            >
              <Icon icon={"mdi:search"} color={styles.lightPurple} />
            </Button>
          </InputGroup>
        )}

        {/* Categorias */}
        <div className={`${styles.filters} ${styles.categoryFilters}`}>
          <span
            className={`${styles.filtersTitle} ${styles.categoryFiltersTitle}`}
          >
            Filtre por categorias
          </span>
          <div
            className={`${styles.filtersContainer} ${styles.categoryFiltersContainer}`}
          >
            {filtersData.categoryFilters.map((f) => (
              <Form.Check
                className={`${styles.filter} ${styles.categoryFilter}`}
                key={`${f.label}_key`}
                id={`${f.slug}${isSideDrawer && "-drawer"}`}
                title={f.description}
                type="radio"
              >
                <Form.Check.Input
                  className={`${styles.filterRadio} ${styles.categoryFilterRadio}`}
                  type="radio"
                  name={`category${isSideDrawer && "-drawer"}`}
                  value={f.label}
                  onChange={filtersData.onCategoryFilter}
                  checked={filtersData.selectedCategory === f.label}
                  isValid
                />
                <Form.Check.Label
                  title={f.description}
                  className={`${styles.filterLabel} ${styles.categoryFilterLabel} ${f.slug}`}
                >
                  {f.label}
                </Form.Check.Label>
              </Form.Check>
            ))}
          </div>
          <div className={styles.cleanFiltersButtonContainer}>
            <Button
              className={styles.cleanFiltersButton}
              variant="light"
              title="Limpar filtros de categorias"
              onClick={filtersData.clearCategoryFilters}
            >
              <Icon icon={"mdi:restart"} color={styles.lightPurple} />
            </Button>
          </div>
        </div>

        {/* Plataformas */}
        <div className={`${styles.filters} ${styles.platformFilters}`}>
          <span
            className={`${styles.filtersTitle} ${styles.platformFiltersTitle}`}
          >
            Plataformas
          </span>
          <div
            className={`${styles.filtersContainer} ${styles.platformFiltersContainer}`}
          >
            {filtersData.platformFilters.map((f) => (
              <Form.Check
                className={`${styles.filter} ${styles.platformFilter}`}
                key={`${f.label}_key`}
                id={`${f.label}${isSideDrawer && "-drawer"}`}
                type="radio"
              >
                <Form.Check.Input
                  aria-label={f.label}
                  className={`${styles.filterRadio} ${styles.platformFilterRadio}`}
                  name={`platform${isSideDrawer && "-drawer"}`}
                  type="radio"
                  value={f.label}
                  onChange={filtersData.onPlatformFilter}
                  checked={filtersData.selectedPlatform === f.label}
                  isValid
                />
                <Form.Check.Label
                  title={f.label}
                  className={`${styles.filterLabel} ${styles.platformFilterLabel}`}
                >
                  {f.label !== "Web" ? (
                    <Icon
                      icon={`${getPlatformIcon(
                        f.label,
                        filtersData.platforms
                      )}`}
                    />
                  ) : (
                    <WorldWideWebIcon size={24} />
                  )}
                </Form.Check.Label>
              </Form.Check>
            ))}
          </div>
          <div className={styles.cleanFiltersButtonContainer}>
            <Button
              className={styles.cleanFiltersButton}
              variant="light"
              title="Limpar filtros de plataformas"
              onClick={filtersData.clearPlatformFilters}
            >
              <Icon icon={"mdi:restart"} color={styles.lightPurple} />
            </Button>
          </div>
        </div>

        {/* Open Source */}
        <div className={styles.openSourceFilter}>
          <div className="filter">
            <Form.Check
              id="only-open-source"
              type="checkbox"
              value="only-open-source"
              onChange={filtersData.onOnlyOpenSourceFilter}
              checked={filtersData.onlyOpenSourceFilter}
              label="Apenas ferramentas de código aberto"
            />
          </div>
        </div>
      </div>

      {/* Pesquisa - Normal */}
      {!isSideDrawer && (
        <InputGroup className={styles.searchContainer}>
          <Form.Control
            id={isSideDrawer && "drawer-search-input"}
            type="search"
            placeholder="Pesquise por qualquer ferramenta..."
            onChange={(e) => filtersData.onSearch(e)}
          />
          <Button
            aria-label="Pesquisar"
            variant="inside-input"
            id="button-addon1"
          >
            <Icon icon={"mdi:search"} color={styles.lightPurple} />
          </Button>
        </InputGroup>
      )}
    </div>
  );
};

export default FiltersGroup;
