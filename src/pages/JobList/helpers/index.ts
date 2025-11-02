export const generateJobId = (author: string, createdDate: Date) => {
  const idSource = `${author}-${createdDate}`;
  let hash = 0;
  for (let i = 0; i < idSource.length; i++) {
    const chr = idSource.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
