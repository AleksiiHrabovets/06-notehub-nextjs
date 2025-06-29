'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

type Props = {
  initialNotes: Note[];
  initialTotalPages: number;
};

export default function NotesClient({ initialNotes, initialTotalPages }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['Notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    },
  });

  if (isError) {
    throw new Error('Could not load notes');
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChangeQuery} value={query} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageCount={data.totalPages}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isSuccess && <NoteList notes={data.notes} />}
      {modalOpen && <NoteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
