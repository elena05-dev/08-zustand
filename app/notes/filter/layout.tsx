import type { ReactNode } from 'react';
import css from './LayoutNotes.module.css';

type LayoutFilterProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NotesLayout({ children, sidebar }: LayoutFilterProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
