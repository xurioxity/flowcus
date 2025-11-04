import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeekStart(date: Date = new Date()): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust to Monday
  return new Date(d.setDate(diff))
}

export function getWeekEnd(weekStart: Date): Date {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6) // Sunday
  weekEnd.setHours(23, 59, 59, 999)
  return weekEnd
}

export function getWeekKey(date: Date = new Date()): string {
  const weekStart = getWeekStart(date)
  return weekStart.toISOString().split('T')[0]
}

export function getPreviousWeekKey(currentWeekKey: string): string {
  const date = new Date(currentWeekKey)
  date.setDate(date.getDate() - 7)
  return getWeekKey(date)
}

export function getNextWeekKey(currentWeekKey: string): string {
  const date = new Date(currentWeekKey)
  date.setDate(date.getDate() + 7)
  return getWeekKey(date)
}

export function formatWeekRange(weekKey: string): string {
  const weekStart = new Date(weekKey)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  
  return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
}

