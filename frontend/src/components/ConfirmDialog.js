import React from 'react';
import Modal from './Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger', 'warning', 'info'
}) => {
  const getButtonStyles = () => {
    const styles = {
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      info: 'bg-blue-600 hover:bg-blue-700 text-white'
    };
    return styles[type];
  };

  const getIcon = () => {
    const icons = {
      danger: '⚠️',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{getIcon()}</span>
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
