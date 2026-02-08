'use client';

import { LuTriangleAlert } from 'react-icons/lu';
import styles from './errorState.module.scss';
import Link from 'next/link';

interface ErrorStateProps {
    title: string;
    message: string;
    retry?: () => void;
    actionHref?: string;
    actionLabel?: string;
}

const ErrorState = ({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    retry,
    actionHref = '/home',
    actionLabel = 'Go to Home'
}: ErrorStateProps) => {
    return (
        <div className={styles.container}>
            <LuTriangleAlert size={56} className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>

            <div className={styles.actions}>
                {retry && (
                    <button onClick={retry} className={styles.retryButton}>
                        Try again
                    </button>
                )}
                {actionHref &&
                    <Link href={actionHref} className={styles.homeLink}>
                        {actionLabel}
                    </Link>
                }
            </div>
        </div>
    );
};

export default ErrorState;
