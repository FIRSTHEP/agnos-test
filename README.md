
# Agnos Home Work

Agnos Home Work is a real-time web application built with Next.js and Socket.IO. It allows users to enter patient data, with real-time updates visible to staff, making it ideal for applications needing live data synchronization.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Quick Start Guide](#quick-start-guide)
- [Socket.IO Backend](#socketio-backend)
- [Folder Structure](#folder-structure)
- [Development Planning](#development-planning)
- [License](#license)

---

## Project Overview

Users can type patient information in real-time, and changes are immediately synchronized across different views using Socket.IO, allowing staff to monitor data updates without refreshing the page.

---

## Features

- **Real-Time Data Sync**: Updates are instantly visible to staff as users type.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Automatic Form Validation**: Validates fields like email and phone numbers.
- **Reusable Components**: Modular components to speed up development.

---

## Technologies Used

- **Next.js** - For server-rendered React applications
- **React** - For building user interfaces
- **TypeScript** - For type safety
- **Socket.IO** - For real-time, bidirectional communication
- **Tailwind CSS** - For responsive styling
- **React Icons** - For adding icons

---

## Quick Start Guide

1. **Clone the Repository**  
   Choose one of the following methods to clone the repository:

   - **SSH**:  
     ```bash
     git clone git@github.com:your-username/agnos-home-work.git
     ```
   - **HTTPS**:  
     ```bash
     git clone https://github.com/your-username/agnos-home-work.git
     ```
   - **ZIP Download**:  
     - Go to GitHub, click **Code** > **Download ZIP**, and extract it.

2. **Navigate to the Project Directory**  
   ```bash
   cd agnos-home-work
   ```

3. **Install Dependencies**  
   ```bash
   npm install
   ```

4. **Run the Development Server**  
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Socket.IO Backend

The backend server, which handles Socket.IO connections, is available in a separate repository.  
Visit: [agnos-socket-io repository](https://github.com/FIRSTHEP/agnos-socket-io) for setup instructions.

---

## Folder Structure

```plaintext
├── .next                     # Build output (generated by Next.js)
├── node_modules              # Installed dependencies
├── public                    # Static assets (e.g., logo)
│   └── agnos_logo.webp       # Application logo
├── src                       # Main application source code
│   ├── app                   # Next.js pages and routing
│   │   ├── patient           # Patient page folder
│   │   │   └── page.tsx      # Patient view component
│   │   ├── staff             # Staff page folder
│   │   │   └── page.tsx      # Staff view component
│   │   ├── globals.css       # Global CSS styles
│   │   ├── layout.tsx        # Layout component for all pages
│   │   └── page.tsx          # Home page component
│   ├── components            # Reusable components
│   │   ├── Button.tsx        # Custom button with icon support
│   │   ├── PatientForm.tsx   # Real-time patient data form
│   │   ├── StaffView.tsx     # Staff view
│   │   └── StatusDot.tsx     # Status indicator component
│   ├── hooks                 # Custom hooks
│   │   └── useSocket.ts      # Manages Socket.IO connection
│   ├── interfaces            # TypeScript interfaces
│   │   └── FormData.d.ts     # Form data structure
│   └── services              # External services
│       └── socketService.ts  # Socket.IO service
├── .env.local                # Local environment variables
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Files to ignore in Git
└── README.md                 # Documentation file
```

---

## Development Planning

- **Responsive Design**: Layout adjusts for all screen sizes, ensuring usability on mobile, tablet, and desktop.
- **Real-Time Sync**: `PatientForm` updates data in real time without a submit button; staff can see changes immediately in `StaffView`.
- **Component-Based Architecture**: Components are modular and reusable, facilitating scalability.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
