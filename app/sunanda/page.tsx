'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EmployeeLayout } from '@/components/EmployeeLayout'
import { ProgressBar } from '@/components/ProgressBar'
import { DualProgressPieChart } from '@/components/DualProgressPieChart'
import { useProgress } from '@/hooks/useProgress'
import { getWeekKey } from '@/lib/utils'

const TOTAL_HOURS_TARGET = 35 // 7 hours/day × 5 days
const DUMMIES_PER_HOUR = 7
const DRAGONS_PER_HOUR = 4

function SunandaContent() {
  const searchParams = useSearchParams()
  const weekKey = searchParams.get('week') || getWeekKey()
  const { data, loading, updateProgress } = useProgress('sunanda', weekKey)
  const [dummiesCount, setDummiesCount] = useState(0)
  const [dragonsCount, setDragonsCount] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (data && data.extra_data) {
      setDummiesCount(data.extra_data.dummies_count || 0)
      setDragonsCount(data.extra_data.dragons_count || 0)
    }
  }, [data])

  // Calculate hours from counts
  const dummiesHours = dummiesCount / DUMMIES_PER_HOUR
  const dragonsHours = dragonsCount / DRAGONS_PER_HOUR
  const totalHours = dummiesHours + dragonsHours

  const handleUpdate = async () => {
    if (!data) return
    setIsUpdating(true)
    try {
      await updateProgress({
        current_value: totalHours,
        target_value: TOTAL_HOURS_TARGET,
        extra_data: {
          dummies_count: dummiesCount,
          dragons_count: dragonsCount,
          dummies_hours: dummiesHours,
          dragons_hours: dragonsHours,
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
      <EmployeeLayout employeeName="sunanda" employeeDisplayName="Sunanda" weekKey={weekKey}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    )
  }

  return (
    <EmployeeLayout employeeName="sunanda" employeeDisplayName="Sunanda" weekKey={weekKey}>
      <div className="space-y-8">
        <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-2xl p-8 border border-gray-800/50 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                🐉
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Weekly Target: Assemble Dummies & Dragons</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Enter the count of items assembled. Assembly rate: 7 dummies/hour, 4 dragons/hour
                </p>
              </div>
            </div>
          
          <div className="mb-6">
            <DualProgressPieChart
              value1={dummiesHours}
              value2={dragonsHours}
              target={TOTAL_HOURS_TARGET}
              label1="Dummies"
              label2="Dragons"
              color1="#10b981"
              color2="#34d399"
              remainingColor="#1e293b"
            />
          </div>

          <div className="mb-6">
            <ProgressBar
              current={totalHours}
              target={TOTAL_HOURS_TARGET}
              label="Progress"
              color="bg-green-500"
              showNumbers={false}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
              <div className="text-sm text-gray-400 mb-2 font-medium">Dummies Assembled</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">{dummiesCount}</div>
              <div className="text-xs text-gray-500 mt-2">{dummiesHours.toFixed(1)} hours</div>
            </div>
            <div className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="text-sm text-gray-400 mb-2 font-medium">Dragons Assembled</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">{dragonsCount}</div>
              <div className="text-xs text-gray-500 mt-2">{dragonsHours.toFixed(1)} hours</div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Number of Dummies Assembled
              </label>
              <input
                type="number"
                value={dummiesCount}
                onChange={(e) => setDummiesCount(Number(e.target.value))}
                min="0"
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                placeholder="Enter count (e.g., 21)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Number of Dragons Assembled
              </label>
              <input
                type="number"
                value={dragonsCount}
                onChange={(e) => setDragonsCount(Number(e.target.value))}
                min="0"
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                placeholder="Enter count (e.g., 12)"
              />
            </div>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/50 backdrop-blur-sm">
              <div className="text-sm text-gray-400 mb-2 font-medium">Total Progress</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {((totalHours / TOTAL_HOURS_TARGET) * 100).toFixed(1)}% Complete
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {dummiesCount} dummies + {dragonsCount} dragons assembled
              </div>
            </div>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="group w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/50 active:scale-[0.98] flex items-center justify-center gap-2"
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

export default function SunandaPage() {
  return (
    <Suspense fallback={
      <EmployeeLayout employeeName="sunanda" employeeDisplayName="Sunanda" weekKey={getWeekKey()}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    }>
      <SunandaContent />
    </Suspense>
  )
}

