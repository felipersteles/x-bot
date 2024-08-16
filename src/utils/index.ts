export function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function cutString(text: string, limit: number = 280) {
    return text.length > 200 ? text.substring(0, limit) : text;
}