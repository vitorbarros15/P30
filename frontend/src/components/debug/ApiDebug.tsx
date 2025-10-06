'use client';

import { useEffect, useState } from 'react';

export default function ApiDebug() {
  const [apiInfo, setApiInfo] = useState<{
    url: string;
    env: string;
    nodeEnv: string;
    vercel: string;
  } | null>(null);

  useEffect(() => {
    setApiInfo({
      url: process.env.NEXT_PUBLIC_API_URL || 'undefined',
      env: process.env.NODE_ENV || 'undefined',
      nodeEnv: process.env.NODE_ENV || 'undefined',
      vercel: process.env.VERCEL || 'undefined',
    });
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Não mostra em produção
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔧 API Debug</h3>
      <div className="space-y-1">
        <div>URL: {apiInfo?.url}</div>
        <div>NODE_ENV: {apiInfo?.nodeEnv}</div>
        <div>VERCEL: {apiInfo?.vercel}</div>
      </div>
    </div>
  );
}
