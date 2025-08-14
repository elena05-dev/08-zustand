import type { Note } from '@/types/note';

interface NotePreviewProps {
  note?: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag || 'No tag'}
      </p>
    </div>
  );
}
