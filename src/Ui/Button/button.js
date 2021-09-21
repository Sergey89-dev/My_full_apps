import React from "react";
import styles from './button.module.css'
import cx from 'clsx'
function Button({ type, onClick, className,  children }) {
    return (
        <button type={type} className={cx(styles['button'], className)} onClick={onClick}>
            {children}
        </button>
    )

}

export { Button }