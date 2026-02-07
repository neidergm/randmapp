import styles from './loading.module.scss';

const DetailLoading = () => {
    const skeletonCards = Array.from({ length: 4 });

    return (
        <div className={styles.container}>
            <div className={`${styles.skeleton} ${styles.backLink}`} />

            <div className={styles.hero}>
                <div className={`${styles.skeleton} ${styles.image}`} />

                <div className={styles.info}>
                    <div className={`${styles.skeleton} ${styles.uid}`} />
                    <div className={`${styles.skeleton} ${styles.name}`} />
                    <div className={styles.divider} />

                    <div className={styles.infoGrid}>
                        {skeletonCards.map((_, i) => (
                            <div key={i} className={styles.infoCard}>
                                <div className={`${styles.skeleton} ${styles.infoCardIcon}`} />
                                <div className={styles.infoCardLines}>
                                    <div className={`${styles.skeleton} ${styles.infoCardLabel}`} />
                                    <div className={`${styles.skeleton} ${styles.infoCardValue}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailLoading;
