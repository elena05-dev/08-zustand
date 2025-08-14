import Link from 'next/link';
import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

const TAGS: NoteTag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => {
        const href =
          tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
