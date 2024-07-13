'use client';

import { useState } from 'react';

export default function Home() {
  const [configString, setConfigString] = useState('');

  const handleChange = (e) => {
    setConfigString(e.target.value);
  };

  const handleDownload = () => {
    const regex = /apiKey:\s*"([^"]+)",\s*authDomain:\s*"([^"]+)",\s*databaseURL:\s*"([^"]+)",\s*projectId:\s*"([^"]+)",\s*storageBucket:\s*"([^"]+)",\s*messagingSenderId:\s*"([^"]+)",\s*appId:\s*"([^"]+)",\s*measurementId:\s*"([^"]+)"/;
    const match = configString.match(regex);

    if (match) {
      const [
        _,
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
      ] = match;

      // 個々の値を変えることでenvに記載される名称も変更可能
      const envContent = `
NEXT_PUBLIC_FIREBASE_API_KEY=${apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${authDomain}
NEXT_PUBLIC_FIREBASE_DATABASE_URL=${databaseURL}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${appId}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${measurementId}
      `.trim();

      const blob = new Blob([envContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = '.env.local';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Invalid Firebase config format.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Firebase Config to .env.local Generator</h1>
      <textarea
        value={configString}
        onChange={handleChange}
        placeholder="Paste your Firebase config object here"
        rows={10}
        className="w-full max-w-lg p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download .env.local
      </button>
    </div>
  );
}
