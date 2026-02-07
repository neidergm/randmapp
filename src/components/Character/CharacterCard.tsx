import Link from 'next/link';
import Image from 'next/image';
import styles from './characterCard.module.scss';
import { Character } from '@/types/character.types';
import { LuFingerprint, LuMapPin } from 'react-icons/lu';
// import { Button } from '../ui/Button';

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
                    height={300}
                />
            </div>

            {/* <span class="flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
<span class="size-2 bg-primary rounded-full shadow-[0_0_8px_#0df259]"></span>
<span class="text-xs font-bold text-white uppercase tracking-wider">Alive</span>
</span> */}
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

                {/* <Button className={styles.button}>View Details</Button> */}
            </div>
        </Link>
    );
}

export default CharacterCard;