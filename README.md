# User Management Application

A modern, responsive, and full-featured User Management CRUD application built with **React 19**, **Vite**, and **Tailwind CSS v4**. The application interacts with the public **[JSONPlaceholder API](https://jsonplaceholder.typicode.com/)** to perform user creation, retrieval, updates, and deletion.

---

## 🚀 Features

- **User Directory (Read)**: View all users in a structured, responsive table showcasing key details (Name, Email, Phone, Company, etc.).
- **User Management (Create & Update)**: Add new users or update existing ones via a modal-based form with real-time validation.
- **User Detail View**: Navigate to individual user profiles (`/users/:id`) to view comprehensive information.
- **Delete Operation**: Delete users from the list with UI feedback.
- **State Management & API Syncing**: Emulates real backend communication by updating the application state upon successful mock API responses (POST/PUT/DELETE).
- **Modern UI/UX**:
  - Fully responsive layout optimized for mobile, tablet, and desktop screens.
  - Stylish styling built with **Tailwind CSS v4**.
  - Smooth loaders/skeletons during data fetching.
  - Toast notifications for success/error feedback using **React Hot Toast**.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📁 Repository Structure

```text
User-Management/
├── Frontend/                 # React frontend application
│   ├── public/               # Static assets
│   ├── src/                  # Source files
│   │   ├── api/              # Axios API configurations and endpoints
│   │   ├── components/       # Reusable components (Navbar, Modal, UserForm, Skeletons)
│   │   ├── pages/            # Application pages (HomePage, UserDetailPage)
│   │   ├── App.jsx           # Application routing and setup
│   │   ├── index.css         # Tailwind and global styles
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.js        # Vite configuration
└── .gitignore                # Git ignore file
```

---

## 💻 Getting Started

To run the application locally, follow these steps:

### Prerequisites

Make sure you have **Node.js (v18+)** and **npm** (or yarn/pnpm) installed on your machine.

### Installation & Run

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/bobbyku0104/User-Management.git
   cd User-Management
   ```

2. **Navigate to the Frontend directory**:
   ```bash
   cd Frontend
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to the URL shown in your terminal (usually `http://localhost:5173` or `http://localhost:5174`).

---

## 📦 Build for Production

To build the application for deployment:

1. **Build the production assets**:
   ```bash
   npm run build
   ```
   The compiled output will be generated inside the `Frontend/dist` directory.

2. **Preview the production build**:
   ```bash
   npm run preview
   ```
