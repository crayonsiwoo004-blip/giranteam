import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import KakaoConsultButton from "@/components/KakaoConsultButton";
import NotFound from "@/pages/NotFound";
import FAQPage from "@/pages/FAQ";
import ReviewsPage from "@/pages/Reviews";
import ServicesPage from "@/pages/Services";
import RecruitmentPage from "@/pages/Recruitment";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path={"/qna"} component={FAQPage} />
      <Route path={"/faq"} component={FAQPage} />
      <Route path={"/about"} component={ReviewsPage} />
      <Route path={"/items"} component={ServicesPage} />
      <Route path={"/services"} component={ServicesPage} />
      <Route path={"/recruitment"} component={RecruitmentPage} />
      <Route path={"/recruit"} component={RecruitmentPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <KakaoConsultButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
