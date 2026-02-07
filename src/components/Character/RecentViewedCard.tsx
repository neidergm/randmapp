import { VisitedCharacter } from "@/types/character.types"
import Image from "next/image"
import Link from "next/link"

import styles from "./recentViewedCard.module.scss"

const RecentViewedCard = ({ char }: { char: VisitedCharacter }) => {
    return (
        <Link href={`/characters/${char.id}`} className={styles.item}>
            <div className={styles.imageWrapper}>
                <Image
                    src={char.image}
                    alt={char.name}
                    width={50}
                    height={50}
                    className={styles.image}
                />
                <div className={`${styles.status} ${styles[char.status?.toLowerCase()]}`}></div>
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{char.name}</p>
                <p className={styles.action}>See again</p>
            </div>
        </Link>
    )
}

export default RecentViewedCard