'use client';

import css from './NoteDetails.module.css';
import type { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

interface NoteDetailsProps {
  note?: Note;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  const router = useRouter();

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>{note.content}</div>

        <div className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()} <br />
          Updated: {new Date(note.updatedAt).toLocaleDateString()}
        </div>

        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    </div>
  );
}
