'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css';

const TAGS: NoteTag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={
                  tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`
                }
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
