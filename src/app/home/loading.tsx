import styles from './loading.module.scss';

const HomeLoading = () => {
    const skeletonCards = Array.from({ length: 8 });
    const skeletonItems = Array.from({ length: 3 });

    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <div className={`${styles.skeleton} ${styles.asideTitle}`} />
                {skeletonItems.map((_, i) => (
                    <div key={i} className={styles.asideItem}>
                        <div className={`${styles.skeleton} ${styles.asideAvatar}`} />
                        <div className={styles.asideLines}>
                            <div className={`${styles.skeleton} ${styles.asideLine1}`} />
                            <div className={`${styles.skeleton} ${styles.asideLine2}`} />
                        </div>
                    </div>
                ))}
            </aside>

            <main className={styles.main}>
                <div className={styles.topBar}>
                    <div className={`${styles.skeleton} ${styles.countSkeleton}`} />
                    <div className={`${styles.skeleton} ${styles.searchSkeleton}`} />
                </div>

                <div className={styles.grid}>
                    {skeletonCards.map((_, i) => (
                        <div key={i} className={styles.card}>
                            <div className={`${styles.skeleton} ${styles.cardImage}`} />
                            <div className={styles.cardContent}>
                                <div className={`${styles.skeleton} ${styles.cardTitle}`} />
                                <div className={`${styles.skeleton} ${styles.cardMeta}`} />
                                <div className={`${styles.skeleton} ${styles.cardMeta2}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomeLoading;
