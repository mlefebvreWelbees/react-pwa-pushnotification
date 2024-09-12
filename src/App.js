import logo from './logo.svg';
import './App.css';
import { ToastContainer, Zoom } from "react-toastify";
import Notification from "./firebaseNotifications/Notification";
import { TokenProvider, useToken } from "./firebaseNotifications/firebase";

function App() {
  const { token } = useToken();

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
        closeButton={false}
      />
      <Notification />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {token && <p>Current Token: {token}</p>}
      </header>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}
