'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function APITest() {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    const results: any = {};

    try {
      // Test each API endpoint
      console.log('Testing API endpoints...');
      
      // Test Hero Images
      try {
        const heroResponse = await api.getHeroImages();
        results.heroImages = { success: true, data: heroResponse };
        console.log('Hero Images:', heroResponse);
      } catch (error) {
        results.heroImages = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Hero Images Error:', error);
      }

      // Test Feedback
      try {
        const feedbackResponse = await api.getFeedback();
        results.feedback = { success: true, data: feedbackResponse };
        console.log('Feedback:', feedbackResponse);
      } catch (error) {
        results.feedback = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Feedback Error:', error);
      }

      // Test Services
      try {
        const servicesResponse = await api.getServices();
        results.services = { success: true, data: servicesResponse };
        console.log('Services:', servicesResponse);
      } catch (error) {
        results.services = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Services Error:', error);
      }

      // Test Team
      try {
        const teamResponse = await api.getTeam();
        results.team = { success: true, data: teamResponse };
        console.log('Team:', teamResponse);
      } catch (error) {
        results.team = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Team Error:', error);
      }

      // Test Clinic Info
      try {
        const clinicResponse = await api.getClinicInfo();
        results.clinicInfo = { success: true, data: clinicResponse };
        console.log('Clinic Info:', clinicResponse);
      } catch (error) {
        results.clinicInfo = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Clinic Info Error:', error);
      }

      // Test Blogs
      try {
        const blogsResponse = await api.getBlogs();
        results.blogs = { success: true, data: blogsResponse };
        console.log('Blogs:', blogsResponse);
      } catch (error) {
        results.blogs = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Blogs Error:', error);
      }

      // Test Partners
      try {
        const partnersResponse = await api.getPartners();
        results.partners = { success: true, data: partnersResponse };
        console.log('Partners:', partnersResponse);
      } catch (error) {
        results.partners = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('Partners Error:', error);
      }

      // Test FAQs
      try {
        const faqsResponse = await api.getFAQs();
        results.faqs = { success: true, data: faqsResponse };
        console.log('FAQs:', faqsResponse);
      } catch (error) {
        results.faqs = { 
          success: false, 
          error: error.message,
          suggestion: error.message.includes('not accessible') ? 'Start your backend server' : 'Check backend logs'
        };
        console.error('FAQs Error:', error);
      }

    } catch (error) {
      console.error('General API Test Error:', error);
    } finally {
      setLoading(false);
    }

    setTestResults(results);
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">API Test Results</h1>
      <p className="mb-4">API Base URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</p>
      
      {loading && <p className="text-blue-600">Testing APIs...</p>}
      
      <div className="grid gap-4">
        {Object.entries(testResults).map(([endpoint, result]: [string, any]) => (
          <div key={endpoint} className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold text-lg mb-2">{endpoint}</h3>
            {result.success ? (
              <div>
                <p className="text-green-600">✅ Success</p>
                <p className="text-sm text-gray-600">
                  Data: {result.data?.success ? 'API returned success' : 'API returned data'}
                </p>
                {result.data?.data && (
                  <p className="text-sm text-gray-600">
                    Items: {Array.isArray(result.data.data) ? result.data.data.length : 'Single item'}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-red-600">❌ Error</p>
                <p className="text-sm text-red-600">{result.error}</p>
                {result.suggestion && (
                  <p className="text-sm text-blue-600 mt-1">💡 {result.suggestion}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        onClick={testAPI} 
        disabled={loading}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Again'}
      </button>
    </div>
  );
}
