import { LuSearch } from 'react-icons/lu'
import styles from './searchBar.module.scss'

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <LuSearch className={styles.searchIcon} size={20}/>
      <input
        type="search"
        placeholder="Search characters..."
        className={styles.searchInput}
      />
    </div>
  )
}

export default SearchBar