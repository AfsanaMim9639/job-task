import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedIndicators from '@/components/home/FeaturedIndicators'
import LatestInsights from '@/components/home/LatestInsights'
import MapPreview from '@/components/home/MapPreview'
import DataSources from '@/components/home/DataSources'
import CallToAction from '@/components/home/CallToAction'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedIndicators />
      <LatestInsights />
      <MapPreview />
      <DataSources />
      <CallToAction />
    </>
  )
}