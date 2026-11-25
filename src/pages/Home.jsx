import Hero from '../components/sections/home/Hero'
import MeetThePups from '../components/sections/home/MeetThePups'
import TwoWays from '../components/sections/home/TwoWays'
import Journey from '../components/sections/home/Journey'
import Passport from '../components/sections/home/Passport'
import FamiliesWall from '../components/sections/home/FamiliesWall'
import FaqPreview from '../components/sections/home/FaqPreview'
import HomeCta from '../components/sections/home/HomeCta'
import useDocumentTitle from '../hooks/useDocumentTitle'

/** The homepage walks from morning (hero) through dusk to night (home at last). */
export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <MeetThePups />
      <TwoWays />
      <Journey />
      <Passport />
      <FamiliesWall />
      <FaqPreview />
      <HomeCta />
    </>
  )
}
