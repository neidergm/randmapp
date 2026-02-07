import { loadCharacters } from "@/actions/characters.actions"
import CharacterCard from "@/components/Character/CharacterCard";
import EmptyState from "@/components/EmptyState/EmptyState";
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

    const data = await loadCharacters({ page: currentPage, name })

    return (
        <div className={styles.container}>

            <aside className={styles.aside}>
                <LastVisited />
            </aside>

            <main className={styles.main}>

                <div className={styles.searchContainer}>
                    <div className={styles.charactersCount}>
                        {data ? `${data.info.count} Characters found` : '0 Characters found'}
                    </div>
                    <SearchBar />
                </div>

                {data ? (
                    <>
                        <div className={styles.charactersContainer}>
                            {data.results.map((character) => (
                                <CharacterCard key={character.id} data={character} />
                            ))}
                        </div>

                        <Pagination currentPage={currentPage} totalPages={data.info.pages} />
                    </>
                ) : (
                    <EmptyState
                        title="No characters found"
                        message={name
                            ? `No results for "${name}". Try a different search term.`
                            : 'No characters available at the moment.'
                        }
                        actionHref='/home'
                    />
                )}
            </main>

        </div>
    )
}

export default HomePage
