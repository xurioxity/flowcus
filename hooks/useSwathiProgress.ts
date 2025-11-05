'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface SwathiPlatformData {
  id?: string
  platform: 'amazon' | 'flipkart' | 'meesho'
  months_completed: number // 0-7 months (April-October)
  start_date: string // Nov 2, 2025
  updated_at?: string
}

const START_DATE = '2025-11-02'
const TARGET_MONTHS = 7 // April to October = 7 months

export function useSwathiProgress(platform: 'amazon' | 'flipkart' | 'meesho') {
  const [data, setData] = useState<SwathiPlatformData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Use week_key field to store platform identifier since schema requires it
        const weekKey = `swathi-${platform}`
        
        const { data: progressData, error: fetchError } = await supabase
          .from('employee_progress')
          .select('*')
          .eq('employee_name', 'swathi')
          .eq('week_key', weekKey)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError
        }

        if (progressData) {
          // Extract months_completed from extra_data or current_value
          const monthsCompleted = progressData.extra_data?.months_completed ?? progressData.current_value ?? 0
          setData({
            id: progressData.id,
            platform,
            months_completed: monthsCompleted,
            start_date: progressData.extra_data?.start_date ?? START_DATE,
            updated_at: progressData.updated_at,
          })
        } else {
          // Create initial entry
          const { data: newData, error: createError } = await supabase
            .from('employee_progress')
            .insert({
              employee_name: 'swathi',
              week_key: weekKey,
              current_value: 0,
              target_value: 100, // 100% target
              extra_data: {
                months_completed: 0,
                start_date: START_DATE,
                platform: platform,
              },
            })
            .select()
            .single()

          if (createError) throw createError
          
          setData({
            id: newData.id,
            platform,
            months_completed: 0,
            start_date: START_DATE,
            updated_at: newData.updated_at,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching Swathi progress:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to real-time updates
    const weekKey = `swathi-${platform}`
    const channel = supabase
      .channel(`progress-swathi-${platform}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employee_progress',
          filter: `employee_name=eq.swathi AND week_key=eq.${weekKey}`,
        },
        (payload) => {
          if (payload.new) {
            const progressData = payload.new as any
            const monthsCompleted = progressData.extra_data?.months_completed ?? progressData.current_value ?? 0
            setData({
              id: progressData.id,
              platform,
              months_completed: monthsCompleted,
              start_date: progressData.extra_data?.start_date ?? START_DATE,
              updated_at: progressData.updated_at,
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [platform])

  const updateProgress = async (monthsCompleted: number) => {
    if (!data) return

    // Clamp between 0 and 7
    const clampedMonths = Math.max(0, Math.min(7, monthsCompleted))
    
    // Optimistically update local state immediately
    setData({
      ...data,
      months_completed: clampedMonths,
      updated_at: new Date().toISOString(),
    })

    try {
      const weekKey = `swathi-${platform}`
      const { error: updateError } = await supabase
        .from('employee_progress')
        .update({
          current_value: clampedMonths,
          target_value: 100,
          extra_data: {
            months_completed: clampedMonths,
            start_date: data.start_date,
            platform: platform,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id)

      if (updateError) {
        // Revert optimistic update on error
        setData({
          ...data,
          months_completed: data.months_completed,
        })
        throw updateError
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
      throw err
    }
  }

  const percentage = data ? (data.months_completed / TARGET_MONTHS) * 100 : 0

  return { data, loading, error, updateProgress, percentage, targetMonths: TARGET_MONTHS }
}

