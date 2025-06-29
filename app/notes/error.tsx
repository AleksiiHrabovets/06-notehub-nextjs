'use client';

import React from 'react';

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
