import { useState } from 'react'
import { localUrl, remoteUrl, sizeFor } from '../../utils/assetKey'

/**
 * Image from the reference's media library. Serves the copy mirrored into /img at
 * build time and falls back to the original URL if that copy is missing.
 */
export default function Img({ path, kind = 'gallery', alt = '', className = '', eager = false, ...rest }) {
  const w = typeof kind === 'number' ? kind : sizeFor(kind)
  const [src, setSrc] = useState(() => localUrl(path, w))
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`${className} ${failed ? 'bg-honey-soft text-transparent' : ''}`}
      onError={() => {
        const remote = remoteUrl(path, w)
        if (src !== remote) setSrc(remote)
        else setFailed(true)
      }}
      {...rest}
    />
  )
}
