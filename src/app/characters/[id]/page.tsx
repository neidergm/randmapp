import { getCharacterDetail } from '@/actions/characters.actions';
import VisitedTracker from '../../../components/VisitedTracker';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import styles from './page.module.scss';
import { LuDna, LuGlobe, LuMapPin, LuShieldCheck } from 'react-icons/lu';
import CharacterLocation from '@/components/Character/CharacterLocation';

const CharacterDetailPage = async ({
    params
}: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const char = await getCharacterDetail(id);

    const statusClass = styles[char.status.toLowerCase()] || '';

    return (
        <div className={styles.container}>

            <VisitedTracker
                id={char.id}
                name={char.name}
                image={char.image}
                status={char.status}
            />

            <BackButton className={styles.backLink} />

            <div className={styles.hero}>
                <div className={`${styles.imageWrapper} ${statusClass}`}>
                    <span className={`${styles.statusBadge} ${statusClass}`}>
                        <span className={styles.statusDot} />
                        Status: {char.status}
                    </span>
                    <Image
                        src={char.image}
                        alt={char.name}
                        width={400}
                        height={400}
                        priority
                    />
                </div>

                <div className={styles.info}>
                    <span className={styles.uid}>UID: Character_{String(char.id).padStart(3, '0')}</span>
                    <h1 className={styles.name}>{char.name}</h1>
                    <div className={styles.divider} />

                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}><LuDna size={20} /></div>
                            <div>
                                <span className={styles.infoLabel}>Species</span>
                                <span className={styles.infoValue}>{char.species}{char.type ? ` (${char.type})` : ''}</span>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}><LuShieldCheck size={20} /></div>
                            <div>
                                <span className={styles.infoLabel}>Gender</span>
                                <span className={styles.infoValue}>{char.gender}</span>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}><LuGlobe size={20} /></div>
                            <div>
                                <span className={styles.infoLabel}>Origin</span>
                                <span className={styles.infoValue}>{char.origin.name}</span>
                                <div className={styles.infoValueDetails}>
                                    <CharacterLocation location={char.origin} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}><LuMapPin size={20} /></div>
                            <div>
                                <span className={styles.infoLabel}>Location</span>
                                <span className={styles.infoValue}>{char.location.name}</span>
                                <div className={styles.infoValueDetails}>
                                    <CharacterLocation location={char.location} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetailPage;
