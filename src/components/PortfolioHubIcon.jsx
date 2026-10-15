export default function PortfolioHubIcon({ type }) {
  return (
    <svg className="cs-hub-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {type === 'projects' && <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>}
      {type === 'skills' && <><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></>}
      {type === 'contact' && <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 6 9 7 9-7" /></>}
    </svg>
  )
}
