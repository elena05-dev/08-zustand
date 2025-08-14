import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';

interface PageSlugProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageSlugProps) {
  const { slug } = await params;
  const tagParam = slug?.[0];

  const tag =
    tagParam &&
    ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(tagParam)
      ? (tagParam as NoteTag)
      : undefined;

  const notesData = await fetchNotes({ tag });

  return <NotesClient initialData={notesData} tag={tag} />;
}
