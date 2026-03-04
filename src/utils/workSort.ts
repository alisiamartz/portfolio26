type WorkLikeEntry = {
  data: {
    date?: Date;
    timeline?: string;
  };
};

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function timelineToTimestamp(timeline?: string): number | null {
  if (!timeline) return null;

  const parts = timeline.split("—").map((part) => part.trim()).filter(Boolean);
  const endPart = (parts[parts.length - 1] ?? timeline).trim();
  if (!endPart) return null;

  if (/present/i.test(endPart)) return Number.MAX_SAFE_INTEGER;

  const monthYear = endPart.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTH_INDEX[monthYear[1].toLowerCase()];
    const year = Number(monthYear[2]);
    if (month !== undefined) return new Date(year, month, 1).getTime();
  }

  const yearOnly = endPart.match(/^(\d{4})$/);
  if (yearOnly) {
    const year = Number(yearOnly[1]);
    return new Date(year, 11, 31).getTime();
  }

  return null;
}

export function compareWorkByMostRecent(a: WorkLikeEntry, b: WorkLikeEntry): number {
  const aTs = a.data.date?.getTime() ?? timelineToTimestamp(a.data.timeline) ?? 0;
  const bTs = b.data.date?.getTime() ?? timelineToTimestamp(b.data.timeline) ?? 0;
  return bTs - aTs;
}
