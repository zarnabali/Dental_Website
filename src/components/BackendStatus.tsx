'use client';

import { useState, useEffect } from 'react';

export default function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline' | 'error'>('checking');
  const [details, setDetails] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    const checkBackend = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      setApiUrl(baseUrl);
      
      try {
        console.log('Checking backend status at:', baseUrl);
        
        // Try to fetch a simple endpoint first
        const response = await fetch(`${baseUrl}/api/test-connection`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setStatus('online');
          setDetails('Backend is running and accessible');
          console.log('✅ Backend is online');
        } else {
          setStatus('error');
          setDetails(`Backend responded with status: ${response.status}`);
          console.log('⚠️ Backend responded with error status:', response.status);
        }
      } catch (error) {
        setStatus('offline');
        setDetails(`Cannot connect to backend: ${error.message}`);
        console.log('❌ Backend is offline:', error);
      }
    };

    checkBackend();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'checking': return 'text-yellow-600';
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'error': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking': return '⏳';
      case 'online': return '✅';
      case 'offline': return '❌';
      case 'error': return '⚠️';
      default: return '❓';
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4">Backend Status Check</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">API Base URL:</p>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            {apiUrl}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Status:</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getStatusIcon()}</span>
            <span className={`font-semibold ${getStatusColor()}`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Details:</p>
          <p className="text-sm text-gray-800">{details}</p>
        </div>
        
        {status === 'offline' && (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">Backend Not Running</h3>
            <p className="text-sm text-red-700 mb-2">
              Your backend server is not accessible. Please:
            </p>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              <li>Make sure your backend server is running on port 5000</li>
              <li>Check if the backend URL is correct: {apiUrl}</li>
              <li>Verify there are no firewall or network issues</li>
              <li>Check the backend console for any error messages</li>
            </ul>
          </div>
        )}
        
        {status === 'error' && (
          <div className="bg-orange-50 border border-orange-200 rounded p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Backend Error</h3>
            <p className="text-sm text-orange-700 mb-2">
              Your backend is running but returned an error. This might be:
            </p>
            <ul className="text-sm text-orange-700 list-disc list-inside space-y-1">
              <li>Authentication required (401 error)</li>
              <li>API endpoint not found (404 error)</li>
              <li>Server error (500 error)</li>
              <li>Check your backend logs for more details</li>
            </ul>
          </div>
        )}
        
        {status === 'online' && (
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-2">Backend Online</h3>
            <p className="text-sm text-green-700">
              Your backend is running and accessible. The API integration should work properly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
