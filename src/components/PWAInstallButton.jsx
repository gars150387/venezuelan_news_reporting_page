import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallButton = () => {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  if (!isInstallable || isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    await installApp();
  };

  return (
    <Button 
      type="primary" 
      size="small"
      icon={<DownloadOutlined />}
      onClick={handleInstall}
      className="bg-green-600 hover:bg-green-700 border-green-600"
    >
      Instalar App
    </Button>
  );
};

export default PWAInstallButton;