import React from "react";

import { InputGroup, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

import { getPlatformIcon } from "../../utils/utils";

import styles from "./styles.module.scss";

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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0863 0.254636C9.34466 0.453836 8.21522 0.762476 6.93386 1.38408C4.4897 2.56584 2.62466 4.40712 1.4477 6.79895C1.07762 7.55831 0.569783 8.94864 0.640823 9.01992C0.659783 9.03888 1.0157 9.04848 1.4333 9.04368L2.18306 9.02952L2.3633 8.53127C2.5721 7.95215 2.8853 7.28328 3.18914 6.77544C3.54506 6.18216 3.4217 6.22487 4.2617 6.39095C4.66034 6.46679 5.28674 6.57599 5.65226 6.63287C6.01298 6.68495 6.32138 6.74208 6.33098 6.74688C6.34058 6.75648 6.29306 7.008 6.22658 7.3068C6.1601 7.60104 6.07466 8.0472 6.03194 8.29392C5.99402 8.54064 5.9465 8.81591 5.93234 8.90135L5.90858 9.05807L7.45082 9.02976L7.55042 8.46024C7.6073 8.14704 7.70234 7.66775 7.76402 7.39727L7.87802 6.90384L8.37626 6.93695C11.0386 7.10303 12.9367 7.10303 15.5991 6.93695L16.0973 6.90384L16.2065 7.37376C16.2634 7.63488 16.3584 8.10936 16.4201 8.43672L16.5293 9.02999L18.0667 9.05832L18.043 8.9016C18.0288 8.81616 17.9813 8.54088 17.9386 8.29416C17.9007 8.04744 17.8104 7.60128 17.7439 7.30704C17.6823 7.008 17.6347 6.76128 17.6443 6.75192C17.6537 6.74232 17.9623 6.68544 18.3228 6.63336C18.6883 6.57648 19.3147 6.46728 19.7134 6.39144C20.5534 6.22536 20.43 6.18264 20.7907 6.78527C21.085 7.27415 21.4078 7.96704 21.6166 8.55072L21.7923 9.02999L22.542 9.04416C22.9596 9.04896 23.3155 9.03936 23.3345 9.0204C23.4058 8.94912 22.8979 7.5588 22.5276 6.79944C20.8243 3.32496 17.5167 0.918956 13.6488 0.344876C13.1316 0.268796 11.4754 0.211916 11.0863 0.254636ZM12.714 1.90608C13.5255 2.20968 14.3227 2.9928 14.9635 4.12704C15.2482 4.62528 15.5758 5.34192 15.5331 5.37984C15.4145 5.4984 11.7127 5.57448 9.9665 5.4984C9.25946 5.46528 8.61386 5.42255 8.53322 5.40815L8.3813 5.37504L8.70866 4.71072C9.5297 3.05448 10.4407 2.11008 11.5133 1.81584C11.8599 1.72104 12.3106 1.75416 12.714 1.90608ZM7.9493 2.93592C7.65986 3.37728 7.16618 4.3548 6.95738 4.90056C6.8957 5.05704 6.83402 5.19959 6.81986 5.21855C6.78674 5.25167 6.15074 5.17103 5.2349 5.01455L4.62746 4.91016L4.83146 4.69656C5.17322 4.34544 5.8613 3.78528 6.3881 3.43896C6.83906 3.13992 8.18666 2.43768 8.22938 2.4756C8.23898 2.4852 8.11082 2.694 7.9493 2.93592ZM16.8759 3.012C17.6494 3.4296 18.6079 4.14144 19.1443 4.6968L19.3483 4.9104L18.7409 5.0148C17.8251 5.17152 17.1891 5.25216 17.1559 5.2188C17.1418 5.19984 17.0563 5.0052 16.9709 4.78224C16.7479 4.21752 16.3303 3.41064 16.0075 2.9172C15.8604 2.68944 15.7371 2.49 15.7371 2.48064C15.7371 2.44704 16.4299 2.76984 16.8759 3.012Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1.65651 9.91681C1.67547 9.97849 1.77507 10.2821 2.56779 12.7167L3.02331 14.1307H4.24779L4.33803 13.8792C4.38555 13.7463 4.55163 13.2766 4.70811 12.8398C4.86003 12.4035 4.99755 12.0619 5.01651 12.0809C5.03067 12.0999 5.20155 12.5698 5.39619 13.1201L5.74731 14.131H6.98139L7.66011 12.0288C8.03499 10.8756 8.33883 9.91705 8.33403 9.89329C8.33403 9.87433 8.01603 9.86017 7.62699 9.86017C6.99099 9.86017 6.91515 9.86977 6.89139 9.94081C6.71571 10.5672 6.32667 11.8817 6.31707 11.8913C6.30747 11.9009 6.15099 11.4451 5.96115 10.8852L5.61939 9.86017H4.40451L4.05795 10.89C3.86811 11.4595 3.70683 11.9009 3.70203 11.8771C3.69267 11.8486 3.56451 11.4216 3.42195 10.9279C3.27483 10.4297 3.14667 9.98833 3.13251 9.94081C3.10875 9.86953 3.03291 9.86017 2.36835 9.86017C1.79907 9.85993 1.63755 9.87409 1.65651 9.91681Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.87474 10.6286C9.01226 11.0558 9.3257 12.0144 9.56762 12.769L10.0138 14.1358L11.2479 14.1074L11.599 13.0966C11.7936 12.546 11.9691 12.0905 11.988 12.0905C12.007 12.0905 12.1779 12.546 12.3725 13.0966L12.7282 14.1072L13.9623 14.1355L14.3609 12.911C14.5791 12.2371 14.8925 11.2738 15.0538 10.7707L15.348 9.85944H13.9054L13.6536 10.7237C13.5113 11.203 13.3783 11.6681 13.3498 11.7583C13.3071 11.9196 13.2881 11.8817 12.9605 10.9042L12.6187 9.88391L11.3943 9.85559L11.0621 10.8569C10.8819 11.4026 10.7203 11.8536 10.7062 11.8536C10.692 11.8536 10.5876 11.5404 10.4736 11.1514C10.3596 10.7669 10.2269 10.321 10.1746 10.1546L10.0843 9.86039H8.62802L8.87474 10.6286Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.642 9.89305C15.6372 9.91681 15.9411 10.8754 16.316 12.0286L16.9947 14.1307H18.2288L18.5799 13.1198C18.7697 12.5693 18.9406 12.0996 18.9596 12.0806C18.9737 12.0617 19.1542 12.5078 19.3534 13.0771L19.7139 14.1072L20.9525 14.1355L21.1234 13.5994C21.4128 12.7025 22.2955 9.98329 22.3193 9.91681C22.3383 9.86929 22.1911 9.85993 21.6171 9.86929L20.8863 9.88345L20.6914 10.548C20.5822 10.9135 20.4447 11.3738 20.3875 11.5682L20.2783 11.9242L19.5951 9.88369H18.3802L18.0432 10.866C17.8582 11.4118 17.6969 11.8531 17.6825 11.8531C17.6684 11.8531 17.5306 11.407 17.3741 10.866L17.0847 9.88369L16.3632 9.86953C15.9648 9.86473 15.642 9.87409 15.642 9.89305Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22.0013 14.0834H23.3775V12.7072H22.0013V14.0834Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.626896 14.9758C0.570016 15.0706 1.09682 16.4755 1.47625 17.2394C2.11225 18.5208 2.79553 19.4652 3.80641 20.4427C5.45785 22.0421 7.42249 23.0765 9.66264 23.5274C14.3467 24.467 19.097 22.5118 21.7641 18.5446C22.0963 18.0463 22.6421 17.0258 22.8605 16.4803C23.0789 15.9346 23.3731 15.0187 23.3493 14.976C23.3349 14.957 22.979 14.9381 22.5569 14.9381H21.7879L21.6266 15.4174C21.432 15.9869 21.0002 16.8934 20.6918 17.3678C20.5733 17.5577 20.4641 17.719 20.4593 17.7286C20.4497 17.7382 20.1175 17.681 19.7189 17.6004C19.3154 17.5243 18.689 17.4154 18.3235 17.3582C17.9628 17.3062 17.6544 17.2538 17.6496 17.2445C17.64 17.2349 17.6875 16.974 17.754 16.6656C17.9486 15.7735 18.0578 14.9808 17.9959 14.9573C17.9628 14.9431 17.621 14.9431 17.232 14.9477L16.525 14.9618L16.4254 15.5314C16.3685 15.8446 16.2734 16.3238 16.2118 16.5943L16.0978 17.0878L15.5995 17.0546C13.986 16.955 13.4261 16.9361 11.988 16.9361C10.5502 16.9361 9.99 16.955 8.37648 17.0546L7.87825 17.0878L7.76425 16.5943C7.70257 16.3238 7.60777 15.8446 7.55065 15.5314L7.45105 14.9618L6.72025 14.9477C6.32161 14.9429 5.97529 14.9525 5.95609 14.9714C5.91337 15.0142 6.08425 16.063 6.24553 16.7844C6.29785 17.0263 6.33577 17.2354 6.33097 17.2447C6.32161 17.2495 5.95129 17.316 5.50993 17.3822C5.06377 17.4535 4.45177 17.5579 4.13833 17.6244C3.82993 17.6861 3.55945 17.7382 3.54025 17.7382C3.48337 17.7382 3.04201 16.9932 2.78569 16.4568C2.65273 16.1815 2.46289 15.7354 2.36329 15.4603L2.18305 14.9621L1.41889 14.9479C0.996976 14.9424 0.641056 14.952 0.626896 14.9758ZM14.1756 18.497C15.3288 18.5539 15.547 18.5777 15.547 18.6583C15.547 18.7627 14.9443 19.9349 14.6974 20.3004C13.7674 21.7003 12.671 22.3884 11.6695 22.2034C10.8154 22.0469 10.0133 21.4109 9.27768 20.3004C9.03096 19.9349 8.42833 18.7627 8.42833 18.6583C8.42833 18.6252 8.51377 18.587 8.63233 18.5681C9.39672 18.4637 12.6048 18.421 14.1756 18.497ZM7.00033 19.2089C7.24225 19.8067 7.59841 20.514 7.92577 21.0312C8.07289 21.2638 8.18209 21.463 8.17249 21.4774C8.12497 21.5201 6.93865 20.9126 6.46393 20.6042C5.87545 20.2152 5.26801 19.7357 4.90273 19.3608L4.62745 19.0807L5.23489 18.9763C5.94193 18.8578 6.72985 18.7438 6.78193 18.7534C6.80089 18.7579 6.90049 18.9619 7.00033 19.2089ZM17.7775 18.8292C17.9722 18.853 18.4087 18.9242 18.7409 18.9811L19.3483 19.0855L19.073 19.3656C18.7171 19.7263 18.1049 20.2152 17.5402 20.5853C17.0798 20.8891 15.8508 21.5201 15.8081 21.4774C15.7939 21.4632 15.9031 21.2638 16.05 21.0312C16.439 20.4142 16.909 19.4508 17.1274 18.8196C17.1511 18.7579 17.1938 18.7438 17.2886 18.7579C17.3599 18.7721 17.5831 18.8006 17.7775 18.8292Z"
                        fill="currentColor"
                      />
                    </svg>
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
