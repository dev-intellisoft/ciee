
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "@/views/Dashboard";
import Animals from "@/views/Animals";
import Care from "@/views/Care";
import Statistics from "@/views/Statistics";
import NotFound from "@/views/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/animals" element={<AppLayout><Animals /></AppLayout>} />
            <Route path="/care" element={<AppLayout><Care /></AppLayout>} />
            <Route path="/statistics" element={<AppLayout><Statistics /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
