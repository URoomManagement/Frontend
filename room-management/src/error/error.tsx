"use client";
import React from 'react';

type ErrorPageProps = {
  message?: string; 
};

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>{message || 'Something went wrong. Please try again later.'}</p>
    </div>
  );
};

export default ErrorPage;
