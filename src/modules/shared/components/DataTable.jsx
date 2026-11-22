function TableMessageRow({ colSpan, isError = false, children }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={`px-6 py-8 text-center ${isError ? 'text-red-600' : 'text-med-text-muted'}`}
      >
        {children}
      </td>
    </tr>
  );
}

function DataTable({
  columns,
  isLoading = false,
  error = '',
  isEmpty = false,
  loadingText = 'Cargando...',
  emptyText = 'No hay datos para mostrar.',
  children,
}) {
  const colSpan = columns.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.label}
                className={`px-6 py-3.5 ${column.className ?? ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border-subtle">
          {isLoading && (
            <TableMessageRow colSpan={colSpan}>{loadingText}</TableMessageRow>
          )}
          {!isLoading && error && (
            <TableMessageRow colSpan={colSpan} isError>
              {error}
            </TableMessageRow>
          )}
          {!isLoading && !error && isEmpty && (
            <TableMessageRow colSpan={colSpan}>{emptyText}</TableMessageRow>
          )}
          {!isLoading && !error && children}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
