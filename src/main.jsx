import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskProvider from "./providers/TaskProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <App />
        </TaskProvider>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);


//note: the dragoverlay is the component you take away and the isDragging shows 
// the component in the place where you have taken away