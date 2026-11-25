import { waLink, contact } from '../../data/site'

/** Fixed WhatsApp / Call bar shown on small screens (as on the reference). */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-[var(--bar-h)] items-start gap-2 border-t-2 border-cocoa/10 bg-milk px-3 pt-2 md:hidden">
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center rounded-full bg-wa font-semibold text-milk">
        WhatsApp us
      </a>
      <a href={contact.phoneHref} className="flex h-12 items-center justify-center rounded-full border-2 border-cocoa px-6 font-semibold">
        Call
      </a>
    </div>
  )
}
