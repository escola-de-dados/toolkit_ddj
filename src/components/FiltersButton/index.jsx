import { Icon } from "@iconify/react";
import FixedButton from "../FixedButton";

import styles from "./styles.module.scss";

const FiltersButton = ({ onClick }) => {
    return (
        <FixedButton
            ariaLabel="Abrir janela de filtros"
            extraStyles={`${styles.filtersButton}`}
            onClick={onClick}
        >
            <Icon icon="mdi:filter" color="#fff" />
        </FixedButton>
    )
}

export default FiltersButton;