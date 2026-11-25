import { motion } from 'framer-motion'
import { Paw } from './Decor'

/** Numbered steps joined by a trail of paw prints. */
export default function StepsRow({ steps, label = () => null }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <motion.li key={s.title} className="relative" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-cocoa bg-milk font-display text-xl font-extrabold">{i + 1}</span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="hidden flex-1 items-center justify-around text-toffee/60 lg:flex">
                {Array.from({ length: 6 }, (_, k) => <Paw key={k} className={`h-2.5 w-2.5 rotate-90 ${k % 2 ? '-translate-y-1' : 'translate-y-1'}`} />)}
              </span>
            )}
          </div>
          {label(i) && <p className="mt-3 font-hand text-sm text-toffee-ink">{label(i)}</p>}
          <h3 className="mt-3 font-display text-[19px] font-extrabold leading-tight">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-cocoa-soft">{s.body}</p>
        </motion.li>
      ))}
    </ol>
  )
}
