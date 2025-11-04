import React, { useState, useEffect } from 'react';
import { AlertTriangle, Server, RefreshCw } from 'lucide-react';

const DevelopmentNotice = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [retryCount, setRetryCount] = useState(0);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/health', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('error');
      }
    } catch (error) {
      setBackendStatus('disconnected');
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setBackendStatus('checking');
    checkBackendStatus();
  };

  useEffect(() => {
    checkBackendStatus();
    
    // Check every 30 seconds if disconnected
    let interval;
    if (backendStatus === 'disconnected') {
      interval = setInterval(checkBackendStatus, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [backendStatus]);

  // Don't show anything if backend is connected
  if (backendStatus === 'connected') {
    return null;
  }

  // Don't show in production
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`rounded-lg shadow-lg p-4 border-l-4 ${
        backendStatus === 'checking' 
          ? 'bg-blue-50 border-blue-400' 
          : 'bg-yellow-50 border-yellow-400'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {backendStatus === 'checking' ? (
              <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-800">
              {backendStatus === 'checking' 
                ? 'Checking Backend Connection...' 
                : 'Backend Server Not Available'
              }
            </h3>
            
            {backendStatus === 'disconnected' && (
              <>
                <div className="mt-2 text-sm text-gray-600">
                  <p>The backend server is not running. To start it:</p>
                  <div className="mt-2 p-2 bg-gray-800 rounded text-green-400 font-mono text-xs">
                    cd draupathi-backend && npm start
                  </div>
                </div>
                
                <div className="mt-3 flex items-center space-x-2">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Server className="w-4 h-4 mr-1" />
                    Retry Connection
                  </button>
                  {retryCount > 0 && (
                    <span className="text-xs text-gray-500">
                      Attempt #{retryCount + 1}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentNotice;