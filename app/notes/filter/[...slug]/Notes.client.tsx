'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse, NoteTag } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

const PER_PAGE = 12;
const validTags: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: NoteTag;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => {
    setPage(1);
    setSearchQuery(newSearchQuery);
  }, 300);

  const safeTag =
    tag && tag !== 'All' && validTags.includes(tag) ? tag : undefined;

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ['notes', page, searchQuery, safeTag],
      queryFn: () =>
        fetchNotes({
          page,
          perPage: PER_PAGE,
          search: searchQuery,
          tag: safeTag,
        }),
      placeholderData: keepPreviousData,
      initialData: page === 1 && searchQuery === '' ? initialData : undefined,
    },
  );

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load notes.');
    }
  }, [isError]);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isFetching && !isLoading && <p>Updating...</p>}
      {isError && <p>Failed to load notes.</p>}

      {!isLoading && !isFetching && data && data.results.length === 0 && (
        <p>No notes found.</p>
      )}

      {!isLoading && !isFetching && data && data.results.length > 0 && (
        <NoteList notes={data.results} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
