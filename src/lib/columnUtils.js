export const extractColumns = (data) => {
  const mainColumns = Object.keys(data[0] || {});
  return mainColumns.flatMap((column) =>
    Array.isArray(data[0][column])
      ? data[0][column].length > 0
        ? Object.keys(data[0][column][0]).map((nestedField) => `${column}.${nestedField}`)
        : []
      : column
  );
};


// to add classes to specific columns
export const getColumnClass = (column) => {
  switch (column) {
    case 'name':
      return 'td-bold';
    case 'status':
      return 'td-center';
    case 'salary':
      return 'td-right';
    default:
      return ''; // No special class for other columns
  }
};