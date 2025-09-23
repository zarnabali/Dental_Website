import axios from 'axios';
import React from 'react';

// API Base URL - read from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Log API URL for debugging
console.log('API Base URL:', API_BASE_URL);
console.log('Environment API URL:', process.env.NEXT_PUBLIC_API_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
axiosInstance.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
  console.log('Making API request to:', fullUrl);
  console.log('Request method:', config.method);
  return config;
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.status, response.config?.url);
    return response;
  },
  (error) => {
    const fullUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    
    console.error('API Error Details:', {
      message: error.message || 'Unknown error',
      status: error.response?.status || 'No status',
      url: error.config?.url || 'No URL',
      fullURL: fullUrl,
      responseData: error.response?.data || 'No response data'
    });
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || error.message === 'Failed to fetch') {
      console.error('Network Error: Backend server is not running or not accessible');
      console.error('Attempted URL:', fullUrl);
      return Promise.reject({
        ...error,
        message: 'Unable to connect to server. Please make sure the backend is running.',
        isNetworkError: true
      });
    }
    
    return Promise.reject(error);
  }
);

// API endpoints - using the same pattern as dashboard
export const apiEndpoints = {
  // Hero Images
  getHeroImages: () => axiosInstance.get('/api/hero-images'),
  
  // Hero Videos
  getHeroVideos: () => axiosInstance.get('/api/hero-videos'),
  
  // Clinic Info
  getClinicInfo: () => axiosInstance.get('/api/clinic-info'),
  
  // Features
  getFeatures: () => axiosInstance.get('/api/features'),
  
  // Team Pictures
  getTeamPictures: () => axiosInstance.get('/api/team-pictures'),
  
  // Feedback
  getFeedback: () => axiosInstance.get('/api/feedback'),
  
  // FAQs
  getFAQs: () => axiosInstance.get('/api/faqs'),
  
  // Partners
  getPartners: () => axiosInstance.get('/api/partners'),
  
  // Team
  getTeam: () => axiosInstance.get('/api/team'),
  
  // Services
  getServices: () => axiosInstance.get('/api/services'),
  
  // Blogs
  getBlogs: () => axiosInstance.get('/api/blogs'),
};

// Wrapper functions that match the original API structure
export const api = {
  // Generic methods
  get: (endpoint: string) => axiosInstance.get(endpoint),
  post: (endpoint: string, data: Record<string, unknown>) => axiosInstance.post(endpoint, data),
  
  // Hero Images
  getHeroImages: async () => {
    const response = await apiEndpoints.getHeroImages();
    return response.data;
  },
  
  // Hero Videos
  getHeroVideos: async () => {
    const response = await apiEndpoints.getHeroVideos();
    return response.data;
  },
  
  // Clinic Info
  getClinicInfo: async () => {
    const response = await apiEndpoints.getClinicInfo();
    return response.data;
  },
  
  // Features
  getFeatures: async () => {
    const response = await apiEndpoints.getFeatures();
    return response.data;
  },
  
  // Team Pictures
  getTeamPictures: async () => {
    const response = await apiEndpoints.getTeamPictures();
    return response.data;
  },
  
  // Feedback
  getFeedback: async () => {
    const response = await apiEndpoints.getFeedback();
    return response.data;
  },
  
  // FAQs
  getFAQs: async () => {
    const response = await apiEndpoints.getFAQs();
    return response.data;
  },
  
  // Partners
  getPartners: async () => {
    const response = await apiEndpoints.getPartners();
    return response.data;
  },
  
  // Team
  getTeam: async () => {
    const response = await apiEndpoints.getTeam();
    return response.data;
  },
  
  // Services
  getServices: async () => {
    const response = await apiEndpoints.getServices();
    return response.data;
  },
  
  // Blogs
  getBlogs: async () => {
    const response = await apiEndpoints.getBlogs();
    return response.data;
  },
};

// Hook for data fetching with loading states
export function useAPI<T>(apiCall: () => Promise<T>, dependencies: unknown[] = []) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

export default api;
