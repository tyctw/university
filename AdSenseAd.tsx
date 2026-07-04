import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = 'ca-pub-6966991656561179';
const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};

interface AdSenseAdProps {
  slot?: string;
  className?: string;
  format?: string;
  fullWidthResponsive?: boolean;
}

export default function AdSenseAd({
  slot,
  className = '',
  format = 'auto',
  fullWidthResponsive = true,
}: AdSenseAdProps) {
  const adSlot = slot || env.VITE_ADSENSE_SLOT;

  useEffect(() => {
    if (!adSlot || typeof window === 'undefined') return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn('AdSense failed to initialize', error);
    }
  }, [adSlot]);

  if (!adSlot) {
    return null;
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}
