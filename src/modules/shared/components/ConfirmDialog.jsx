import Modal from './Modal';
import Button from './Button';

function ConfirmDialog({
  isOpen,
  title = 'Confirmar acción',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-med-text-sub leading-relaxed">{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;
