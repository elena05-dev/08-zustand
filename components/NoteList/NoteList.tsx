'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteNote } from '@/lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Note, Error, string, unknown>({
    mutationFn: deleteNote,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      toast.success('Note deleted');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeletingId(null);
    },
    onError: () => {
      toast.error('Failed to delete note');
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>{' '}
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
