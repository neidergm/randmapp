import styles from './mainFooter.module.scss';

const year = new Date().getFullYear();

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
        <p>With ❤️ by NeiderG </p>
        <p>&copy; {year} Rick and Morty App. All rights reserved.</p>
    </footer>
  )
}

export default MainFooter