import { Button } from "react-bootstrap";

import styles from './styles.module.scss';

const FixedButton = ({ children, onClick, ariaLabel, extraStyles }) => {
    return (
        <Button
            className={`${styles.fixedButton} ${extraStyles}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </Button>
    );
}

export default FixedButton;