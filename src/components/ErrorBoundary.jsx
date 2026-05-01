/**
 * @fileoverview React Error Boundary component for graceful error handling.
 * Catches JavaScript errors in child component tree and displays
 * a user-friendly fallback UI instead of a broken white screen.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary wraps the application to catch rendering errors.
 * Displays a recovery UI when an error occurs in any descendant component.
 *
 * @extends {Component}
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging and monitoring
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 max-w-lg text-center shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-6xl mb-6" aria-hidden="true">⚠️</div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page or click the button below.
            </p>
            <button
              onClick={this.handleReset}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              aria-label="Try again to recover from error"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  /** Child components to wrap with error protection */
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
