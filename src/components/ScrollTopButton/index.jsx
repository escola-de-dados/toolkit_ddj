
import { Icon } from "@iconify/react";
import FixedButton from "../FixedButton";

import styles from "./styles.module.scss";

const ScrollTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            duration: 300,
            behavior: "smooth",
        });
    };

    return (
        <FixedButton ariaLabel="Voltar ao início da página" onClick={scrollToTop} extraStyles={styles.scrollTopButton}>
            <Icon icon="mdi:chevron-up" color="#fff" />
        </FixedButton>
    );
};

export default ScrollTopButton;
