import QRCode from 'react-qr-code';
import { colors } from './themes/palette.stylex';
import { useEffect, useState } from 'react';

export const SIZE = 180;

const SsrQrCode = ({ title }: { title: string }) => {
  return <div style={{ width: SIZE, height: SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span>{title}</span>
  </div>;
};

const IsomorphicQRCode = ({ src, title }: { src: string; title: string }) => {
  const [shouldRenderFallback, setShouldRenderFallback] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShouldRenderFallback(false);
    }
  }, []);

  if (shouldRenderFallback) {
    return <SsrQrCode title={title} />;
  }
  return (
    <>
      <QRCode
        size={SIZE}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={src}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fgColor={colors.pageColor}
        bgColor={colors.pageBackground}
      />
      <span>{title}</span>
    </>
  );
};

export default IsomorphicQRCode;
