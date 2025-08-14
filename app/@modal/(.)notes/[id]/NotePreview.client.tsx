'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note)
    return <Modal onClose={handleClose}>Error loading note.</Modal>;

  return (
    <Modal onClose={handleClose}>
      <button
        onClick={handleClose}
        aria-label="Close modal"
        style={{ float: 'right' }}
      >
        ✕
      </button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
      <p>
        <strong>Created at:</strong> {new Date(note.createdAt).toLocaleString()}
      </p>
    </Modal>
  );
};

export default NotePreviewClient;
