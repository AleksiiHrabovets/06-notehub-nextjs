import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr); // ← перетворення одразу

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id], // ← використовуємо число
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
