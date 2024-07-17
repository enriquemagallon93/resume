// import qrcode from 'qrcode';
import QRCode from 'react-qr-code';
import { colors } from './themes/palette.stylex';

function SsrQrCode({ src }: { src: string }) {
  console.log('skipping qr code for:', src);
  // const codeUrl = await qrcode.toDataURL(src);

  // return <img src={codeUrl} />;
  return null;
}

const IsomorphicQRCode = ({ src }: { src: string }) => {
  if (typeof window === "undefined") {
    return <SsrQrCode src={src} />;
  }
  return (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={src}
      viewBox={`0 0 256 256`}
      fgColor={colors.pageColor}
      bgColor={colors.pageBackground}
    />
  );
};

export default IsomorphicQRCode;
