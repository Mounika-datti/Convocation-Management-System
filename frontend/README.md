# Convocation Management System

A comprehensive full-stack web application for managing convocation events, student registrations, document verification, and attendance tracking with QR code support.

## Project Overview

The Convocation Management System is a modern web application designed to streamline the management of convocation events at educational institutions. It provides role-based access for students and administrators, enabling efficient handling of event registration, document verification, and attendance management.

### Key Objectives

- **Student Management**: Register students, verify documents, and track attendance
- **Event Management**: Create and manage convocation events
- **Authentication**: Secure OTP-based email verification and password reset
- **Document Verification**: Upload and verify student documents
- **QR Code Tracking**: Generate and scan QR codes for attendance verification
- **Admin Dashboard**: Comprehensive analytics and reporting tools
- **Notifications**: Real-time notifications for students and administrators

---

## Features

### Student Features
- ✅ User registration with email verification (OTP)
- ✅ Secure login and password reset functionality
- ✅ View and update profile information
- ✅ Register for convocation events
- ✅ Upload and track document verification status
- ✅ Generate personal QR code for attendance
- ✅ View event details and announcements
- ✅ Receive real-time notifications
- ✅ Download convocation certificates

### Admin Features
- ✅ Admin authentication and dashboard
- ✅ Manage student information and profiles
- ✅ Create and manage convocation events
- ✅ Verify student documents
- ✅ View attendance reports
- ✅ Generate analytics and statistics
- ✅ Send notifications to students
- ✅ Export reports and data

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **PDF Generation**: PDFKit
- **QR Code**: qrcode library
- **Environment Variables**: dotenv

### Frontend
- **Framework**: React 19.2.6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.3.0
- **HTTP Client**: Axios
- **Routing**: React Router DOM v7.17.0
- **Charts**: Chart.js with react-chartjs-2
- **Animation**: Framer Motion
- **Icons**: React Icons
- **QR Code Display**: react-qr-code

### DevTools
- **Linting**: ESLint
- **Server Monitoring**: Nodemon (backend)

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Home, Login, Register, Dashboard, Events   │   │
│  │  Components: Navbar, Sidebar, Cards, Forms         │   │
│  │  Services: API Integration with Axios              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js + Express)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes: Auth, Student, Admin, Events, Documents   │   │
│  │  Controllers: Business Logic & Data Processing      │   │
│  │  Middleware: Authentication, Authorization, Upload  │   │
│  │  Utils: Email, OTP, QR Code Generation              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database                            │
│  Tables: Users, Students, Events, Registrations, Documents │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Authentication**: User registers → Email verification via OTP → Login with JWT token
2. **Event Registration**: Student logs in → Views events → Registers for convocation
3. **Document Upload**: Student uploads documents → Admin verifies → Status updated
4. **Attendance**: QR code generated → Scanned at event → Attendance recorded

---

## Project Structure

### Backend Structure
```
backend/
├── config/              # Configuration files
│   ├── db.js           # PostgreSQL database connection
│   └── email.js        # Email configuration
├── controllers/         # Business logic
│   ├── authController.js
│   ├── studentController.js
│   ├── adminController.js
│   ├── eventController.js
│   ├── documentController.js
│   ├── registrationController.js
│   ├── notificationController.js
│   └── reportController.js
├── routes/             # API endpoints
│   ├── authRoutes.js
│   ├── studentRoutes.js
│   ├── adminRoutes.js
│   ├── eventRoutes.js
│   ├── documentRoutes.js
│   └── notificationRoutes.js
├── middleware/         # Authentication & file upload
│   ├── auth.js        # JWT verification
│   ├── adminAuth.js   # Admin authorization
│   └── upload.js      # Multer file upload configuration
├── utils/             # Helper utilities
│   ├── sendEmail.js   # Email sending service
│   └── generateOTP.js # OTP generation utility
├── uploads/           # User uploaded files
├── certificates/      # Generated certificates
├── server.js          # Express server entry point
└── package.json       # Dependencies
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── EventCard.jsx
│   │   ├── StudentCard.jsx
│   │   ├── DocumentCard.jsx
│   │   ├── Loader.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/                 # React Context
│   │   └── AuthContext.jsx      # Authentication state management
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ConvocationRegistration.jsx
│   │   ├── UploadDocuments.jsx
│   │   ├── VerifyDocuments.jsx
│   │   ├── ManageEvents.jsx
│   │   ├── Reports.jsx
│   │   └── StudentProfile.jsx
│   ├── services/                # API service layer
│   │   ├── api.js              # Axios instance configuration
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   ├── adminService.js
│   │   ├── eventService.js
│   │   ├── documentService.js
│   │   └── registrationService.js
│   ├── routes/                  # React Router configuration
│   │   └── AppRoutes.jsx
│   ├── assets/                  # Images, icons
│   ├── App.jsx                  # Main App component
│   ├── App.css
│   ├── main.jsx                 # React entry point
│   └── index.css
├── public/                      # Static assets
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── package.json
└── index.html                  # HTML entry point
```

---

## Setup and Installation

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn**
- **PostgreSQL** v12 or higher
- **Git**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in backend root
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/convocation_db
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   NODE_ENV=development
   ```

4. **Initialize database** (run migrations if available)
   ```bash
   npm run db:init
   ```

5. **Start backend server**
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in frontend root
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new student | No |
| POST | `/login` | Login student | No |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/verify-otp` | Verify OTP for password reset | No |
| POST | `/reset-password` | Reset password | No |
| GET | `/test-email` | Test email configuration | No |

### Student Routes (`/api/student`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/profile` | Get student profile | Yes |
| PUT | `/profile` | Update student profile | Yes |
| GET | `/qr` | Get student QR code | Yes |

### Document Routes (`/api/documents`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/upload` | Upload student document | Yes |
| GET | `/` | Get all student documents | Yes |

### Event Routes (`/api/events`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Get all events | No |
| POST | `/` | Create event | Yes (Admin) |
| DELETE | `/:id` | Delete event | Yes (Admin) |

### Registration Routes (`/api/registration`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/register` | Register for event | Yes |
| GET | `/` | Get user registrations | Yes |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/students` | Get all students | Yes (Admin) |
| PUT | `/students/:id` | Update student | Yes (Admin) |
| GET | `/documents/verify` | Get documents for verification | Yes (Admin) |
| PUT | `/documents/:id/verify` | Verify document | Yes (Admin) |
| GET | `/reports` | Generate reports | Yes (Admin) |

### Notification Routes (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Get notifications | Yes |
| POST | `/` | Send notification | Yes (Admin) |

---

## Usage Guidelines

### For Students

1. **Register Account**
   - Go to Register page
   - Enter email and create password
   - Verify email with OTP
   - Complete profile

2. **Register for Convocation**
   - Go to Events page
   - View available convocation events
   - Click "Register" button
   - Wait for admin confirmation

3. **Upload Documents**
   - Navigate to Upload Documents
   - Upload required documents
   - Wait for verification

4. **View QR Code**
   - Go to Dashboard
   - Access "My QR Code"
   - Download or display for attendance

### For Administrators

1. **Admin Login**
   - Access admin login page
   - Enter admin credentials
   - Access admin dashboard

2. **Manage Events**
   - Create new events with dates and details
   - Edit event information
   - Delete past events

3. **Verify Documents**
   - Navigate to Document Verification
   - Review uploaded student documents
   - Approve or reject with comments

4. **View Reports**
   - Access Reports section
   - View attendance statistics
   - Generate downloadable reports
   - View registered students list

---

## Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/convocation_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=convocation_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,png

# Client URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Convocation Management System
```

---

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Linting
```bash
cd frontend
npm run lint
```

---

## Build for Production

### Backend
```bash
# No specific build step needed, just ensure dependencies are installed
npm install --production
```

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist` directory.

---

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env` file
- Check database credentials

### Email Service Issues
- Enable "Less secure app access" for Gmail
- Generate app-specific password for 2FA enabled accounts
- Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`

### CORS Issues
- Ensure `CLIENT_URL` is correctly configured in backend
- Check `VITE_API_URL` in frontend `.env`

---

## Future Enhancements

- SMS notifications for students
- Mobile app for attendance scanning
- Advanced analytics dashboard
- Integration with college management systems
- Automated certificate generation
- Email reminders for pending documents

---

## License

ISC License

---

## Support

For issues and questions, please contact the development team or open an issue in the project repository.
