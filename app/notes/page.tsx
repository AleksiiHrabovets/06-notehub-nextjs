import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const { notes, totalPages } = await fetchNotes('', 1); // initial load

  return <NotesClient initialNotes={notes} initialTotalPages={totalPages} />;
}
