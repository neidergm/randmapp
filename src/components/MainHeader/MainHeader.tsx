import { LuFlaskConical } from 'react-icons/lu';
import styles from './mainHeader.module.scss';

const MainHeader = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <LuFlaskConical />
        </div>
        <div className={styles.text}>
          <h3>RICK & MORTY</h3>
          <h6>Explorer</h6>
        </div>
      </div>
    </header>
  )
}

export default MainHeader