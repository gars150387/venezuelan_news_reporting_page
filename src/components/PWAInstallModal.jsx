import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallModal = () => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the modal before
    const hasBeenDismissed = localStorage.getItem('pwa-install-dismissed');
    
    if (hasBeenDismissed) {
      setDismissed(true);
      return;
    }

    // Show modal after 3 seconds if app is installable and not installed
    if (isInstallable && !isInstalled && !dismissed) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, dismissed]);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setShowModal(false);
    }
  };

  const handleDismiss = () => {
    setShowModal(false);
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleLater = () => {
    setShowModal(false);
    // Don't mark as permanently dismissed, just close for this session
  };

  if (!isInstallable || isInstalled || dismissed) {
    return null;
  }

  return (
    <Modal
      open={showModal}
      onCancel={handleLater}
      footer={null}
      centered
      width={400}
      className="pwa-install-modal"
      closeIcon={<CloseOutlined />}
    >
      <div className="text-center p-4">
        <div className="mb-4">
          <img 
            src="/flag-for-flag-venezuela-svgrepo-com.svg" 
            alt="Noticias Venezuela" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            ¡Instala Noticias Venezuela!
          </h3>
          <p className="text-gray-600 mb-4">
            Mantente informado con las últimas noticias de Venezuela. 
            Instala nuestra app para acceso rápido y notificaciones.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            type="primary" 
            size="large" 
            icon={<DownloadOutlined />}
            onClick={handleInstall}
            className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Instalar App
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              size="large" 
              onClick={handleLater}
              className="flex-1"
            >
              Más tarde
            </Button>
            <Button 
              size="large" 
              onClick={handleDismiss}
              className="flex-1 text-gray-500"
            >
              No mostrar de nuevo
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>✓ Acceso sin conexión</p>
          <p>✓ Notificaciones push</p>
          <p>✓ Experiencia nativa</p>
        </div>
      </div>
    </Modal>
  );
};

export default PWAInstallModal;