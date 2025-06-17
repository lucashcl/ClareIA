interface Summary {
  id: string;
  title: string;
  discipline: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

type SummaryInsert = Omit<Summary, "id" | "updatedAt" | "createdAt">;

let summariesStore: Summary[] = [];

export async function findAllSummaries(): Promise<Summary[]> {
  return summariesStore;
}

export async function findSummaryById(id: string): Promise<Summary | null> {
  return summariesStore.find((s) => s.id === id) || null;
}

export async function createSummary(data: SummaryInsert): Promise<Summary> {
  const id = Bun.randomUUIDv7();
  const newSummary: Summary = {
    id,
    ...data,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  summariesStore.push(newSummary);
  return newSummary;
}

export async function updateSummary(
  id: string,
  data: Partial<Omit<SummaryInsert, "id">>,
): Promise<Summary | null> {
  const index = summariesStore.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const updatedSummary = { ...summariesStore[index], ...data };
  summariesStore[index] = updatedSummary;
  return updatedSummary;
}

export async function deleteSummary(id: string): Promise<Summary | null> {
  const index = summariesStore.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const deleted = summariesStore[index];
  summariesStore.splice(index, 1);
  return deleted;
}
