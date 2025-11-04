'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { EmployeeLayout } from '@/components/EmployeeLayout'
import { ProgressBar } from '@/components/ProgressBar'
import { ProgressPieChart } from '@/components/ProgressPieChart'
import { useProgress } from '@/hooks/useProgress'
import { getWeekKey } from '@/lib/utils'

const TARGET = 750

function ShivaputraContent() {
  const searchParams = useSearchParams()
  const weekKey = searchParams.get('week') || getWeekKey()
  const { data, loading, updateProgress } = useProgress('shivaputra', weekKey)
  const [currentValue, setCurrentValue] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (data) {
      setCurrentValue(data.current_value)
    }
  }, [data])

  const handleUpdate = async () => {
    if (!data) return
    setIsUpdating(true)
    try {
      await updateProgress({
        current_value: currentValue,
        target_value: TARGET,
      })
    } catch (err) {
      alert('Failed to update progress')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <EmployeeLayout employeeName="shivaputra" employeeDisplayName="Shivaputra" weekKey={weekKey}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    )
  }

  return (
    <EmployeeLayout employeeName="shivaputra" employeeDisplayName="Shivaputra" weekKey={weekKey}>
      <div className="space-y-8">
        <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-2xl p-8 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                📦
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Weekly Target: 750 E-commerce Listings</h2>
            </div>
          
          <div className="mb-6">
            <ProgressPieChart
              current={currentValue}
              target={TARGET}
              colors={['#a855f7', '#1e293b']}
            />
          </div>

          <div className="mb-6">
            <ProgressBar
              current={currentValue}
              target={TARGET}
              label="Progress"
              color="bg-purple-500"
            />
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                Current Count
              </label>
              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                min="0"
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                placeholder="Enter count"
              />
            </div>
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="group w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 active:scale-[0.98] flex items-center justify-center gap-2"
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

export default function ShivaputraPage() {
  return (
    <Suspense fallback={
      <EmployeeLayout employeeName="shivaputra" employeeDisplayName="Shivaputra" weekKey={getWeekKey()}>
        <div className="text-center py-12">Loading...</div>
      </EmployeeLayout>
    }>
      <ShivaputraContent />
    </Suspense>
  )
}

