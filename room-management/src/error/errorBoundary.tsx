"use client"
import React, { ReactNode } from 'react';
import ErrorPage from './error';

interface ErrorBoundaryProps {
  children: ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean; 
  error: Error | null; 
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const status = (this.state.error as any)?.status || "500"; 
      const message = this.state.error?.message || "A client-side error occurred.";

      return <ErrorPage status={status} message={message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
