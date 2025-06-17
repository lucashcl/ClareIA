export function transformSummariesIntoPeriods(data: {
    id: string;
    title: string;
    summary: string;
    discipline: string;
    date: Date;
}[]) {
    // Handle empty input
    if (data.length === 0) return [];
    
    // Determine the semester based on the first date
    const firstDate = data[0].date;
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth(); // 0 = January, 11 = December
    const semester = month < 6 ? 1 : 2; // Jan-Jun = 1, Jul-Dec = 2
    const name = `${year}.${semester}`;
    
    // Group summaries by discipline using a Map
    const grouped = data.reduce((acc, item) => {
        const discipline = item.discipline;
        if (!acc.has(discipline)) {
            acc.set(discipline, []);
        }
        const summary = {
            id: item.id,
            title: item.title,
            date: item.date.toISOString().split('T')[0] // Convert to YYYY-MM-DD
        };
        acc.get(discipline).push(summary);
        return acc;
    }, new Map());
    
    // Convert Map to array of discipline objects
    const disciplines = Array.from(grouped, ([name, summaries]) => ({ name, summaries }));
    
    // Create the result object
    const result = {
        name: name,
        disciplines: disciplines
    };
    
    // Return as an array with one object
    return [result];
}