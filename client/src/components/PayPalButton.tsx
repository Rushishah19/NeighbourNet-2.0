import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal: any;
  }
}

interface PayPalButtonProps {
  clientId: string;
  hostedButtonId: string;
  currency: string;
  disableFunding?: string[];
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  clientId,
  hostedButtonId,
  currency,
  disableFunding = ['venmo'],
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&disable-funding=${disableFunding.join(
      ','
    )}&currency=${currency}`;
    script.async = true;

    script.onload = () => {
      const paypal: any = window.paypal;
      if (paypal) {
        paypal.HostedButtons({
          hostedButtonId: hostedButtonId,
        }).render(paypalRef.current!);
      } else {
        console.error('PayPal SDK failed to load.');
      }
    };

    script.onerror = () => {
      console.error('Error loading PayPal SDK.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, hostedButtonId, currency, disableFunding]);

  return <div ref={paypalRef}></div>;
};