'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { ProgressBar } from '@/components/ProgressBar'
import { OnionPieChart } from '@/components/OnionPieChart'
import { useSwathiProgress } from '@/hooks/useSwathiProgress'

const START_DATE = '2025-11-02'

const platforms = [
  {
    name: 'Amazon',
    key: 'amazon' as const,
    color: 'from-orange-500 to-amber-500',
    chartColors: ['#f97316', '#fb923c', '#fdba74', '#fed7aa'],
    progressColor: 'bg-orange-500',
    hoverBorderColor: 'hover:border-orange-500/30',
    hoverShadowColor: 'hover:shadow-orange-500/20',
    icon: '📦',
  },
  {
    name: 'Flipkart',
    key: 'flipkart' as const,
    color: 'from-blue-500 to-cyan-500',
    chartColors: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
    progressColor: 'bg-blue-500',
    hoverBorderColor: 'hover:border-blue-500/30',
    hoverShadowColor: 'hover:shadow-blue-500/20',
    icon: '🛒',
  },
  {
    name: 'Meesho',
    key: 'meesho' as const,
    color: 'from-pink-500 to-rose-500',
    chartColors: ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'],
    progressColor: 'bg-pink-500',
    hoverBorderColor: 'hover:border-pink-500/30',
    hoverShadowColor: 'hover:shadow-pink-500/20',
    icon: '💼',
  },
]

function SwathiContent() {
  // Fetch all three platform data for the combined onion chart
  const amazonData = useSwathiProgress('amazon')
  const flipkartData = useSwathiProgress('flipkart')
  const meeshoData = useSwathiProgress('meesho')

  const isLoading = amazonData.loading || flipkartData.loading || meeshoData.loading

  // Use data values and percentages for key to ensure reactivity - this forces re-render when data changes
  const chartKey = `${amazonData.data?.months_completed ?? 0}-${flipkartData.data?.months_completed ?? 0}-${meeshoData.data?.months_completed ?? 0}-${amazonData.percentage.toFixed(1)}-${flipkartData.percentage.toFixed(1)}-${meeshoData.percentage.toFixed(1)}`

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="group inline-flex items-center mb-6 text-sm text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Swathi&apos;s Invoice Progress
          </h1>
          <p className="text-gray-400 text-sm">
            Target: Complete invoices from April 2025 to October 2025 (7 months) for each platform
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Started: {new Date(START_DATE).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Combined Onion Pie Chart */}
        {!isLoading && (
          <div className="mb-8 group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-2xl p-8 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">
                Overall Progress - All Platforms
              </h2>
              <OnionPieChart
                key={chartKey}
                amazonPercentage={amazonData.percentage}
                flipkartPercentage={flipkartData.percentage}
                meeshoPercentage={meeshoData.percentage}
              />
            </div>
          </div>
        )}

        {/* Individual Platform Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((platform, index) => (
            <PlatformSection key={platform.key} platform={platform} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}

interface PlatformSectionProps {
  platform: typeof platforms[0]
  index: number
}

function PlatformSection({ platform, index }: PlatformSectionProps) {
  const { data, loading, updateProgress, percentage } = useSwathiProgress(platform.key)
  const [monthsCompleted, setMonthsCompleted] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (data) {
      setMonthsCompleted(data.months_completed)
    }
  }, [data])

  const handleUpdate = async () => {
    if (!data) return
    setIsUpdating(true)
    try {
      await updateProgress(monthsCompleted)
      // Optimistically update - real-time will confirm, but this makes it feel instant
    } catch (err) {
      alert('Failed to update progress')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl p-4 border border-gray-800/50">
        <div className="text-center py-4 text-gray-400 text-sm">Loading {platform.name}...</div>
      </div>
    )
  }

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl p-4 border border-gray-800/50 ${platform.hoverBorderColor} transition-all duration-500 hover:shadow-lg ${platform.hoverShadowColor} overflow-hidden`}
    >
      {/* Animated background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 transition-all duration-500 blur-2xl`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-lg shadow-md`}>
            {platform.icon}
          </div>
          <div>
            <h2 className={`text-lg font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
              {platform.name}
            </h2>
            <p className="text-xs text-gray-400">7 months (Apr-Oct 2025)</p>
          </div>
        </div>
      
        <div className="flex flex-col gap-3">
          {/* Progress Bar */}
          <div className="mb-2">
            <ProgressBar
              current={data?.months_completed ?? 0}
              target={7}
              label=""
              color={platform.progressColor}
              showNumbers={true}
            />
            <p className="text-xs text-gray-500 mt-1 text-center">
              {percentage.toFixed(1)}% ({data?.months_completed ?? 0} / 7)
            </p>
          </div>
          
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-300">
                Months Completed
              </label>
              <input
                type="number"
                value={monthsCompleted}
                onChange={(e) => setMonthsCompleted(Math.max(0, Math.min(7, Number(e.target.value))))}
                min="0"
                max="7"
                className="w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                placeholder="0-7"
              />
            </div>
            
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className={`group w-full px-4 py-2 text-sm bg-gradient-to-r ${platform.color} hover:opacity-90 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <span>Update</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SwathiPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">Loading...</div>
        </div>
      </main>
    }>
      <SwathiContent />
    </Suspense>
  )
}

