import { motion } from 'framer-motion'
import Button from '../../common/Button'
import Pup from '../../common/Pup'
import { waLink } from '../../../data/site'

function Shrub({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center ${className}`}>
      <div className="h-16 w-16 rounded-[45%] border-[3px] border-cocoa bg-[#6f9a4e] shadow-[inset_-6px_-6px_0_rgb(0_0_0/0.15)] md:h-20 md:w-20" />
      <div className="-mt-1 h-10 w-14 rounded-b-lg border-[3px] border-cocoa bg-toffee md:w-16" />
    </div>
  )
}

/** "Ready to meet your new best friend?" — the house at the end of the walk home. */
export default function HomeCta() {
  return (
    <section aria-labelledby="cta-title" className="relative bg-night pb-16 pt-6 text-milk">
      <div className="container-tp text-center">
        <h2 id="cta-title" className="h-section mx-auto max-w-3xl text-milk">Ready to meet your new best friend?</h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-milk/80">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>
      </div>

      <div className="container-tp mt-10">
        <div className="relative mx-auto h-[300px] max-w-3xl overflow-hidden rounded-t-[2rem] border-[3px] border-b-0 border-[#5c3420] bg-[#6b3a22] md:h-[340px]" style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 34px, rgb(0 0 0 / .18) 34px 36px)' }}>
          {/* door */}
          <motion.div
            className="absolute bottom-10 left-1/2 h-[200px] w-[130px] -translate-x-1/2 rounded-t-full border-[4px] border-cocoa bg-toffee-deep md:h-[230px] md:w-[150px]"
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          >
            <span className="absolute left-1/2 top-6 h-10 w-10 -translate-x-1/2 rounded-full border-[3px] border-cocoa bg-honey" />
            <span className="absolute inset-y-16 left-1/2 w-0.5 -translate-x-1/2 bg-cocoa/50" />
            <span className="absolute right-4 top-[60%] h-3 w-3 rounded-full border-2 border-cocoa bg-honey" />
          </motion.div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-md border-2 border-cocoa bg-honey-soft px-4 py-1 font-hand text-xs uppercase tracking-widest text-cocoa">welcome home</div>
          {/* wall lamp */}
          <div aria-hidden="true" className="absolute left-[calc(50%+6.5rem)] top-[38%] h-8 w-5 rounded-md border-[3px] border-cocoa bg-[#ffd98a] shadow-[0_0_40px_18px_rgb(255_200_110/0.35)]" />
          <Shrub className="absolute bottom-4 left-[16%]" />
          <Shrub className="absolute bottom-4 right-[16%]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-5 bg-[#3b2012]" />
        </div>
        <Pup variant="sit" className="relative z-10 mx-auto -mt-10 w-16 md:ml-[calc(50%-14rem)]" />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 px-5 sm:flex-row">
        <Button href={waLink()} variant="whatsapp">Enquire on WhatsApp</Button>
        <Button to="/contact" variant="light">Visit & contact</Button>
      </div>
    </section>
  )
}
