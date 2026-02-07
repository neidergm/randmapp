import Link from 'next/link';
import Image from 'next/image';
import styles from './characterCard.module.scss';
import { Character } from '@/types/character.types';
import { LuFingerprint, LuMapPin } from 'react-icons/lu';

interface CharacterProps {
    data: Character
}

const CharacterCard = ({ data }: CharacterProps) => {
    return (
        <Link href={`/characters/${data.id}`} className={styles.card}>
            <span className={`${styles.status} ${styles[data.status.toLowerCase()]}`}>
                <span></span>
                {data.status}
            </span>
            <div className={styles.imageWrapper}>
                <Image
                    loading='lazy'
                    src={data.image}
                    alt={data.name}
                    width={300}
                    height={400}
                />
            </div>

            <div className={styles.content}>
                <h2 className={styles.name}>{data.name}</h2>

                <div className={styles.meta}>
                    <div>
                        <LuFingerprint size={16} />
                        <span>{data.species}</span>
                    </div>
                    <div>
                        <LuMapPin size={16} />
                        <span>{data.location.name}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CharacterCard;