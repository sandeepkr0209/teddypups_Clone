import { useEffect } from 'react'

const SUFFIX = 'TeddyPups U.A.E.'

/** Sets <title> (and optionally the meta description) for the current page. */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : `${SUFFIX} — Premium teacup puppies in Dubai`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
