import { Link } from 'react-router-dom'
import Pup from '../components/common/Pup'
import useDocumentTitle from '../hooks/useDocumentTitle'

const TABS = [['/', 'Home'], ['/puppies', 'Puppies'], ['/how-it-works', 'How it works'], ['/faq', 'Questions'], ['/contact', 'Contact']]

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <div className="lattice flex justify-center px-5 py-16">
      <div className="w-full max-w-md -rotate-1 border-2 border-cocoa bg-[#fffaf0] shadow-[var(--shadow-paper)]">
        <div className="p-8 text-center">
          <p className="font-hand text-toffee-ink">have you seen this page?</p>
          <h1 className="mt-2 font-display text-7xl font-black tracking-tight">LOST</h1>
          <p className="mt-1 font-display text-sm font-extrabold uppercase tracking-[0.2em]">: this page has wandered off</p>
          <Pup variant="sit" className="mx-auto mt-6 w-32" wink />
          <p className="mt-6 text-[15px] leading-relaxed text-cocoa-soft">One page, last seen wandering off. It answers to the address you typed, but it isn't here any more. Teddy is on the case.</p>
        </div>
        <p className="border-t-2 border-dashed border-cocoa/40 px-4 pt-3 text-center font-hand text-sm">if found, take a tab:</p>
        <ul className="mt-2 grid grid-cols-5 border-t-2 border-dashed border-cocoa/40">
          {TABS.map(([to, label]) => (
            <li key={to} className="border-r-2 border-dashed border-cocoa/40 last:border-r-0">
              <Link to={to} className="flex h-28 items-center justify-center px-1 text-[12px] font-semibold transition hover:bg-honey-soft hover:text-toffee-deep [writing-mode:vertical-rl]">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
