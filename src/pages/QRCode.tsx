import { QRCodeSVG } from 'qrcode.react';

const QRCodePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="text-center">
        <QRCodeSVG 
          value="https://modera-app.fr" 
          size={300}
          level="H"
          includeMargin
        />
        <p className="mt-4 text-gray-600 text-sm">modera-app.fr</p>
      </div>
    </div>
  );
};

export default QRCodePage;
