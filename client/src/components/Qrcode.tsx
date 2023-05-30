import React, { FunctionComponent } from "react";
import QRCode from "react-qr-code";

interface QrcodeType {
  value: string;
}

const Qrcode: FunctionComponent<QrcodeType> = ({ value }) => {
  return (
    <div className="flex justify-center">
      <QRCode
        className="bg-white border rounded-md lg:h-24 lg:w-24 h-72 w-full lg:p-1 p-2"
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default Qrcode;
