import { loadCharacters } from "@/actions/characters.actions"
import CharacterCard from "@/components/Character/CharacterCard";
import LastVisited from "@/components/LastVisited/LastVisitedSection";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.scss";

const HomePage = async ({
    searchParams
}: {
    searchParams: Promise<{ page?: string; name?: string }>
}) => {

    const { page, name } = await searchParams;
    const currentPage = parseInt(page || '1', 10);

    const { info, results: characters } = await loadCharacters({ page: currentPage, name })

    return (
        <div className={styles.container}>

            <aside className={styles.aside}>
                <LastVisited />
            </aside>

            <main className={styles.main}>

                <div className={styles.searchContainer}>
                    <div className={styles.charactersCount}>
                        {info.count} Characters found
                    </div>
                    <SearchBar />
                </div>

                <div className={styles.charactersContainer}>
                    {characters.map((character) => (
                        <CharacterCard key={character.id} data={character} />
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={info.pages} />

            </main>

        </div>
    )
}

export default HomePage