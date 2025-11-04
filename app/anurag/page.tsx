'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EmployeeLayout } from '@/components/EmployeeLayout'
import { ProgressBar } from '@/components/ProgressBar'
import { ProgressPieChart } from '@/components/ProgressPieChart'
import { useProgress } from '@/hooks/useProgress'
import { getWeekKey } from '@/lib/utils'

const TARGET_HEYGEN = 5 // 1 per day × 5 days
const TARGET_REEL = 5 // 1 per day × 5 days

function AnuragContent() {
  const searchParams = useSearchParams()
  const weekKey = searchParams.get('week') || getWeekKey()
  const { data, loading, updateProgress } = useProgress('anurag', weekKey)
  const [heygenCount, setHeygenCount] = useState(0)
  const [reelCount, setReelCount] = useState(0)
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (data && data.extra_data) {
      setHeygenCount(data.extra_data.heygen_videos || 0)
      setReelCount(data.extra_data.reel_shoots || 0)
    }
  }, [data])

  const handleDaySelection = (day: string, type: 'heygen' | 'reel') => {
    if (type === 'heygen') {
      setHeygenCount(prev => prev + 1)
    } else {
      setReelCount(prev => prev + 1)
    }
    setSelectedDay('')
  }

  const handleManualUpdate = async () => {
    if (!data) return
    setIsUpdating(true)
    try {
      await updateProgress({
        current_value: heygenCount + reelCount,
        target_value: TARGET_HEYGEN + TARGET_REEL,
        extra_data: {
          heygen_videos: heygenCount,
          reel_shoots: reelCount,
        },
      })
    } catch (err) {
      alert('Failed to update progress')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <EmployeeLayout employeeName="anurag" employeeDisplayName="Anurag" weekKey={weekKey}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    )
  }

  const totalProgress = heygenCount + reelCount
  const totalTarget = TARGET_HEYGEN + TARGET_REEL

  return (
    <EmployeeLayout employeeName="anurag" employeeDisplayName="Anurag" weekKey={weekKey}>
      <div className="space-y-8">
        <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-2xl p-8 border border-gray-800/50 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
                🎬
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Weekly Target: 5 Heygen Videos + 5 Reel Shoots</h2>
            </div>
          
          <div className="mb-6">
            <ProgressPieChart
              current={totalProgress}
              target={totalTarget}
              colors={['#f97316', '#1e293b']}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="text-sm text-gray-400 mb-2 font-medium">Heygen Videos</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">{heygenCount} / {TARGET_HEYGEN}</div>
              <div className="mt-3">
                <ProgressBar
                  current={heygenCount}
                  target={TARGET_HEYGEN}
                  color="bg-orange-500"
                />
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
              <div className="text-sm text-gray-400 mb-2 font-medium">Reel Shoots</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">{reelCount} / {TARGET_REEL}</div>
              <div className="mt-3">
                <ProgressBar
                  current={reelCount}
                  target={TARGET_REEL}
                  color="bg-red-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Quick Add (Select Day)
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm mb-3"
              >
                <option value="">Select a day to mark complete</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              {selectedDay && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDaySelection(selectedDay, 'heygen')}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95"
                  >
                    +1 Heygen ({selectedDay})
                  </button>
                  <button
                    onClick={() => handleDaySelection(selectedDay, 'reel')}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
                  >
                    +1 Reel ({selectedDay})
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Heygen Videos (Manual)
                </label>
                <input
                  type="number"
                  value={heygenCount}
                  onChange={(e) => setHeygenCount(Number(e.target.value))}
                  min="0"
                  max={TARGET_HEYGEN}
                  className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Reel Shoots (Manual)
                </label>
                <input
                  type="number"
                  value={reelCount}
                  onChange={(e) => setReelCount(Number(e.target.value))}
                  min="0"
                  max={TARGET_REEL}
                  className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                />
              </div>
            </div>

            <button
              onClick={handleManualUpdate}
              disabled={isUpdating}
              className="group w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/50 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <span>Update Progress</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}

export default function AnuragPage() {
  return (
    <Suspense fallback={
      <EmployeeLayout employeeName="anurag" employeeDisplayName="Anurag" weekKey={getWeekKey()}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    }>
      <AnuragContent />
    </Suspense>
  )
}

