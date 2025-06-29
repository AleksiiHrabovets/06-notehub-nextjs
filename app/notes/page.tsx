import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  try {
    const { notes, totalPages } = await fetchNotes('', 1); // initial load
    return <NotesClient initialNotes={notes} initialTotalPages={totalPages} />;
  } catch (error) {
    console.error('Error loading notes:', error);
    return <div>❌ Nie udało się załadować notatek. Spróbuj później.</div>;
  }
}
