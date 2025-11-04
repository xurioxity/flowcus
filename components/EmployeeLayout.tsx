'use client'

import Link from 'next/link'
import { WeekNavigation } from './WeekNavigation'
import { getWeekKey } from '@/lib/utils'

interface EmployeeLayoutProps {
  employeeName: string
  employeeDisplayName: string
  weekKey: string
  children: React.ReactNode
}

export function EmployeeLayout({ employeeName, employeeDisplayName, weekKey, children }: EmployeeLayoutProps) {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="group inline-flex items-center mb-6 text-sm text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
          {employeeDisplayName}&apos;s Progress
        </h1>
        
        <div className="animate-slide-in">
          <WeekNavigation currentWeekKey={weekKey} employeeName={employeeName} />
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {children}
        </div>
      </div>
    </main>
  )
}

