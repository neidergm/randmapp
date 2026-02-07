'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import styles from './searchBar.module.scss';
import { useCallback, useRef, useState, useTransition } from 'react';
import Spinner from '@/components/Spinner/Spinner';

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentName = searchParams.get('name') || '';
    const formRef = useRef<HTMLFormElement>(null);
    const [value, setValue] = useState(currentName);
    const [isPending, startTransition] = useTransition();

    const handleSearch = useCallback((e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        if (name.trim() === '') {
            if (currentName.trim() !== '') {
                startTransition(() => router.push('/home'));
            }
            return;
        } else if (name.trim() === currentName.trim()) {
            return;
        }

        const params = new URLSearchParams();

        if (name.trim()) {
            params.set('name', name.trim());
        }
        params.set('page', '1');

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    }, [currentName, router]);

    const handleBlur = () => {
        formRef.current?.requestSubmit();
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchBarContainer} ref={formRef}>
            <button type="submit">
                {isPending
                    ? <Spinner size={20} className={styles.searchIcon} />
                    : <LuSearch className={styles.searchIcon} size={20} />
                }
            </button>
            <input
                aria-label='Search Characters'
                onBlur={handleBlur}
                type="search"
                name="name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search characters..."
                className={styles.searchInput}
                disabled={isPending}
            />
        </form>
    );
};

export default SearchBar;
