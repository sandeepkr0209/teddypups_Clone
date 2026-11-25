// Shared between the build-time fetcher (Node) and the app (browser).
export const ORIGIN = 'https://puppy.instabizweb.com'

const SIZES = { card: 384, gallery: 828, family: 640, feature: 640, thumb: 256 }
export const sizeFor = (kind) => SIZES[kind] ?? 640

/** Local file name for a reference media path at a given width. */
export const assetKey = (path, w) =>
  `${path.replace(/^\/(media|brand)\//, '$1-').replace(/[^a-zA-Z0-9_-]+/g, '_')}-${w}.webp`

export const localUrl = (path, w) => `/img/${assetKey(path, w)}`
export const remoteUrl = (path, w) => `${ORIGIN}/_next/image?url=${encodeURIComponent(path)}&w=${w}&q=75`
