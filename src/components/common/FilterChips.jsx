/** One labelled row of toggle chips. Clicking the active chip clears that filter. */
export default function FilterChips({ label, options, value, onChange }) {
  return (
    <div className="grid items-center gap-2 sm:grid-cols-[8rem_1fr]" role="group" aria-label={label}>
      <span className="font-hand text-[15px] text-cocoa-soft">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active && o.value ? '' : o.value)}
              className={`rounded-full border-2 px-4 py-1.5 text-[13px] font-semibold transition ${active ? 'border-cocoa bg-cocoa text-milk' : 'border-cocoa bg-milk hover:bg-honey-soft'}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
