'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the homepage in a few seconds…</p>
    </div>
  );
};

export default NotFound;
