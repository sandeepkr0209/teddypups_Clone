import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-toffee-deep text-milk shadow-[var(--shadow-hard)] hover:bg-toffee-ink',
  outline: 'bg-milk text-cocoa border-2 border-cocoa hover:bg-honey-soft',
  whatsapp: 'bg-wa text-milk shadow-[0_8px_0_-2.4px_#0e3b24] hover:bg-wa-deep',
  light: 'bg-transparent text-milk border-2 border-milk hover:bg-milk/10',
  ghost: 'bg-milk/90 text-cocoa border-2 border-cocoa/80 hover:bg-milk',
}

/** Pill button. Renders a router Link for internal paths, <a> for external/tel/mailto, else <button>. */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const sizes = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-[1.6rem] py-[0.85rem] text-[17px]'
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-[1.1] tracking-[-0.005em] transition duration-200 ease-[var(--ease-pounce)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none ${sizes} ${VARIANTS[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return <button type="button" className={cls} {...rest}>{children}</button>
}
