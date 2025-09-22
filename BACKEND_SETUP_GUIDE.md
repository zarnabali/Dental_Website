# Backend Setup Guide

## 🚨 Current Issue: Backend Server Not Running

Your frontend is trying to connect to `http://localhost:5000` but the backend server is not running.

## 🔧 Quick Fix Steps:

### 1. Start Your Backend Server

Open a new terminal and navigate to your backend directory:

```bash
cd "Z:\React\Dentist Website\Dentist_Backend"
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Check Environment Variables

Make sure your `config.env` file in the backend directory has:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Backend Server

```bash
# For development (with auto-restart)
npm run dev

# OR for production
npm start
```

### 5. Verify Backend is Running

You should see output like:
```
✅ Connected to MongoDB successfully
🚀 Server running on port 5000
📚 API Documentation available at http://localhost:5000/api-docs
```

### 6. Test Backend Endpoints

Open your browser and go to:
- `http://localhost:5000/api/hero-images`
- `http://localhost:5000/api/feedback`
- `http://localhost:5000/api/services`

## 🔍 Troubleshooting

### If you get MongoDB connection errors:
1. Make sure MongoDB is running
2. Check your `MONGODB_URI` in `config.env`
3. Verify your MongoDB connection string is correct

### If you get port 5000 already in use:
1. Kill any process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### If you get CORS errors:
1. Check that `FRONTEND_URL` in `config.env` matches your frontend URL
2. Make sure your frontend is running on `http://localhost:3000`

## ✅ Success Indicators

When everything is working, you should see:
1. Backend server running on port 5000
2. Frontend showing "Backend Online" status
3. API Test showing green checkmarks
4. Real data from your backend appearing on the website

## 🎯 Next Steps

Once your backend is running:
1. Remove the debug components (`BackendStatus` and `APITest`) from your main page
2. Your website will automatically show real data from the backend
3. You can manage content through your backend admin panel

## 📞 Need Help?

If you're still having issues:
1. Check the backend console for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running and accessible
4. Check that all required dependencies are installed
