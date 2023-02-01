import React from 'react';
import styles from './NotFound.module.scss';

console.log(styles)

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br/>
                <span>Ничего не найдено</span>
            </h1>
            <p className={styles.description}> К сожалению данная страница отсутсвует</p>
        </div>
    );
};

export default NotFoundBlock;