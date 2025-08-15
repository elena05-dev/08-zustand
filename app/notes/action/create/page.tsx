import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HubNotes | Create Note',
  description:
    'Create a new note in HubNotes. Add a title, content, and tag to keep your thoughts organized.',
  openGraph: {
    title: 'HubNotes | Create Note',
    description:
      'Create a new note in HubNotes. Add a title, content, and tag to keep your thoughts organized.',
    url: 'http://localhost:3000/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
