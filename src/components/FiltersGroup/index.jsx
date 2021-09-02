import React from "react";

import { InputGroup, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { getPlatformIcon } from "../../utils/utils";

import styles from "./styles.module.scss";

const FiltersGroup = ({ filtersData, isSideDrawer }) => {
  return (
    <div
      className={`${styles.filters} ${isSideDrawer && styles.drawerFilters}`}
    >
      {/* Pesquisa */}
      <InputGroup className={styles.searchContainer}>
        <Form.Control
          type="search"
          placeholder="Pesquise por qualquer ferramenta..."
          onChange={(e) => filtersData.onSearch(e)}
        />
        <Button variant="inside-input" id="button-addon1">
          <Icon icon={"mdi:search"} color={styles.lightPurple} />
        </Button>
      </InputGroup>

      <div className={styles.checkboxFiltersContainer}>
        {/* Categorias */}
        <div className={styles.categoryFilters}>
          <span className={styles.filtersTitle}>Categorias</span>
          <div
            className={`${styles.filtersContainer} ${styles.categoryFiltersContainer}`}
          >
            {filtersData.categoryFilters.map((f) => (
              <Form.Check
                className={`${styles.filter} ${styles.categoryFilter}`}
                key={`${f.label}_key`}
                id={f.slug}
                type="checkbox"
              >
                <Form.Check.Input
                  className={`${styles.filterCheckbox} ${styles.categoryFilterCheckbox}`}
                  type="checkbox"
                  value={f.label}
                  onChange={filtersData.onCategoryFilter}
                  checked={f.isChecked}
                  isValid
                />
                <Form.Check.Label
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
              title="Limpar filtros"
              onClick={filtersData.clearCategoryFilters}
            >
              <Icon icon={"mdi:restart"} color={styles.lightPurple} />
            </Button>
          </div>
        </div>

        {/* Plataformas */}
        <div className={styles.platformFilters}>
          <span className={styles.filtersTitle}>Plataformas</span>
          <div
            className={`${styles.filtersContainer} ${styles.platformFiltersContainer}`}
          >
            {filtersData.platformFilters.map((f) => (
              <Form.Check
                className={`${styles.filter} ${styles.platformFilter}`}
                key={`${f.label}_key`}
                id={f.label}
                type="checkbox"
              >
                <Form.Check.Input
                  className={`${styles.filterCheckbox} ${styles.platformFilterCheckbox}`}
                  type="checkbox"
                  value={f.label}
                  onChange={filtersData.onPlatformFilter}
                  checked={f.isChecked}
                  isValid
                />
                <Form.Check.Label
                  title={f.label}
                  className={`${styles.filterLabel} ${styles.platformFilterLabel}`}
                >
                  <Icon
                    icon={`${getPlatformIcon(f.label, filtersData.platforms)}`}
                  />
                </Form.Check.Label>
              </Form.Check>
            ))}
          </div>
          <div className={styles.cleanFiltersButtonContainer}>
            <Button
              className={styles.cleanFiltersButton}
              variant="light"
              title="Limpar filtros"
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
    </div>
  );
};

export default FiltersGroup;
