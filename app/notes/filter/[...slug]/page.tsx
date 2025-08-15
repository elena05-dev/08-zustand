import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface PageSlugProps {
  params: Promise<{ slug?: string[] }>;
}

const VALID_TAGS: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export async function generateMetadata({
  params,
}: PageSlugProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParam = resolvedParams.slug?.[0];

  const tag =
    slugParam && VALID_TAGS.includes(slugParam as NoteTag)
      ? (slugParam as NoteTag)
      : undefined;

  const tagText = tag ?? 'all';

  return {
    title: `NoteHub : Notes tagged "${tagText}"`,
    description: `Explore notes filtered by the tag "${tagText}" in NoteHub. Organize, search, and access related notes efficiently.`,

    openGraph: {
      title: `NoteHub : Notes tagged "${tagText}"`,
      description: `Explore notes filtered by the tag "${tagText}" in NoteHub. Organize, search, and access related notes efficiently.`,
      url: `https://notehub.vercel.app/notes/filter/${tagText}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub notes tagged ${tagText}`,
        },
      ],
      type: 'website',
    },
  };
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
