import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

export const dynamic = 'force-dynamic';

export default async function NotesFilterPage() {
  const { results: notes } = await fetchNotes({});

  return (
    <div>
      <h1>All Notes</h1>
      <NoteList notes={notes} />
    </div>
  );
}
