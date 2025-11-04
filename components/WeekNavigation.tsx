'use client'

import Link from 'next/link'
import { formatWeekRange, getPreviousWeekKey, getNextWeekKey, getWeekKey } from '@/lib/utils'

interface WeekNavigationProps {
  currentWeekKey: string
  employeeName: string
}

export function WeekNavigation({ currentWeekKey, employeeName }: WeekNavigationProps) {
  const prevWeek = getPreviousWeekKey(currentWeekKey)
  const nextWeek = getNextWeekKey(currentWeekKey)
  const todayWeekKey = getWeekKey()
  const isCurrentWeek = currentWeekKey === todayWeekKey
  
  return (
    <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm">
      <Link
        href={`/${employeeName}?week=${prevWeek}`}
        className="group px-6 py-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 bg-gray-900/50 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-purple-800/20 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
      >
        <span className="flex items-center text-sm font-medium text-gray-400 group-hover:text-purple-300 transition-colors">
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous Week
        </span>
      </Link>
      
      <div className="text-center px-6 py-2 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
        <h2 className="text-lg font-semibold text-white">{formatWeekRange(currentWeekKey)}</h2>
        {isCurrentWeek && (
          <p className="text-xs text-blue-400 mt-1 font-medium animate-pulse">✨ Current Week</p>
        )}
      </div>
      
      {!isCurrentWeek && (
        <Link
          href={`/${employeeName}?week=${nextWeek}`}
          className="group px-6 py-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 bg-gray-900/50 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-purple-800/20 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
        >
          <span className="flex items-center text-sm font-medium text-gray-400 group-hover:text-purple-300 transition-colors">
            Next Week
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      )}
      {isCurrentWeek && <div className="w-28"></div>}
    </div>
  )
}

