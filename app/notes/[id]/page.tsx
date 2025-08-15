import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';
import type { Note } from '@/lib/api';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id: noteId } = await params;

  const note: Note | null = await fetchNoteById(noteId);

  return {
    title: `NoteHub : ${note.title}`,
    description: note.content.slice(0, 160),
    openGraph: {
      title: `NoteHub : ${note.title}`,
      description: note.content.slice(0, 160),
      url: `https://08-zustand-ibkv.vercel.app/notes/${noteId}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id: noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
