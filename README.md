# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## App Functionality & Data Flow

### 1. User Authentication Flow

- When the app starts, check if user is logged in.
- If not logged in, show login/sign-up screen.
- After successful login, fetch user-specific data from Firestore.
- Store user info in Redux state for app-wide use.
- Allow logout, which clears user state.

### 2. Managing Items & Other Costs

- On Add:
    - User fills form for item or other cost.
    - Validate inputs (name/description not empty, cost/amount positive).
    - Add the new document to Firestore under current user’s collection.
    - Update Redux state to reflect change immediately.
- On Edit:
    - User edits the selected item or cost.
    - Update Firestore document.
    - Update Redux state.
- On Delete:
    - User confirms deletion.
    - Remove document from Firestore.
    - Update Redux state.

### 3. Displaying Totals & Lists

- Fetch items and other costs from Firestore on login.
- Use Redux selectors to get current state.
- Calculate total cost = sum of item costs + sum of other costs.
- Show lists of items and other costs separately.
- Show total cost prominently.


##  Development 

1. **Initialize React App**
    - Use React + Vite.
2. **Install Dependencies**
    - `npm install @reduxjs/toolkit react-redux chakra-ui/react firebase`
3. **Setup Firebase**
    - Initialize Firebase app with config.
    - Setup Firestore and Auth instances.
4. **Setup Redux Store**
    - Create slices and store.
5. **Build Authentication UI**
    - Sign-up, sign-in, sign-out flows.
6. **Build Item & Other Costs Management**
    - Forms, lists, edit/delete actions.
7. **Sync with Firestore**
    - Fetch user data on login.
    - Real-time updates or polling.
8. **Display Total Cost**
    - Calculate and display total dynamically.
