import Link from 'next/link';
import { LuSearchX } from 'react-icons/lu';
import styles from './emptyState.module.scss';

interface EmptyStateProps {
    title: string;
    message: string;
    actionHref?: string;
    actionLabel?: string;
}

const EmptyState = ({
    title = 'No results found',
    message = 'Try adjusting your search or filters.',
    actionHref,
    actionLabel = 'Go to home',
}: EmptyStateProps) => {
    return (
        <div className={styles.container}>
            <LuSearchX size={56} className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
            {actionHref && (
                <Link href={actionHref} className={styles.actionButton}>
                    {actionLabel}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
