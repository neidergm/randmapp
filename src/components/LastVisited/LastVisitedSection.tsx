'use client';

import { useLastVisited } from '@/hooks/useLastVisited';
import styles from './lastVisited.module.scss';
import { LuGhost } from 'react-icons/lu';
import RecentViewedCard from '@/components/Character/RecentViewedCard';

export default function LastVisitedSection() {
  const { visited, clearVisited } = useLastVisited();

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h5 className={styles.title}>RECENTLY VIEWED</h5>
        <button onClick={clearVisited}>Clear</button>
      </div>

      {
        !visited.length &&
        <div className={styles.empty}>
          <LuGhost size={48} />
          <br/>
          <br/>
          <p>
            You have not viewed any characters yet. <br/> Start exploring to see them here!
          </p>
        </div>
      }

      <ul className={styles.list}>
        {visited.map((char) => (
          <li key={char.id}>
            <RecentViewedCard char={char} />
          </li>
        ))}
      </ul>
    </div>
  );
}