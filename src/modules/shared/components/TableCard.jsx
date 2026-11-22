import Card from './Card';

function TableCard({ title, headerContent, footer, children }) {
  return (
    <Card className="p-0 overflow-hidden border-med-border">
      <div className="p-5 border-b border-med-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-base font-bold text-med-primary-900">{title}</h2>
        {headerContent}
      </div>
      {children}
      {footer}
    </Card>
  );
}

export default TableCard;
