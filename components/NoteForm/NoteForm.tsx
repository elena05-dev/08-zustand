'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    tag: '',
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created');
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const validate = () => {
    const newErrors = { title: '', content: '', tag: '' };
    let valid = true;

    if (draft.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
      valid = false;
    } else if (draft.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
      valid = false;
    }

    if (draft.content.length > 500) {
      newErrors.content = 'Content must be less than 500 characters';
      valid = false;
    }

    if (
      !['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(draft.tag)
    ) {
      newErrors.tag = 'Invalid tag';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
