import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import './App.css'
import CustomCursor from './components/CustomCursor.jsx'
import App from './App.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'
import CaseStudiesIndex from './pages/CaseStudiesIndex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/case-studies" element={<CaseStudiesIndex />} />
        <Route path="/work" element={<Navigate to="/case-studies" replace />} />
        <Route path="/case-study" element={<Navigate to="/case-studies" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)


