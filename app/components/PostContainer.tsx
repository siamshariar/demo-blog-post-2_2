'use client';

import React, { ReactNode } from 'react';

interface PostContainerProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}

export default function PostContainer({ header, children, className }: PostContainerProps) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-screen">
      {header}
      <article className={`bg-white rounded-xl shadow-lg p-8 ${className ?? ''}`}>
        {children}
      </article>
    </div>
  );
}
