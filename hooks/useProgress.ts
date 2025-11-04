'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ProgressData } from '@/types/database'

export function useProgress(employeeName: string, weekKey: string) {
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch initial data
    async function fetchData() {
      try {
        const { data: progressData, error: fetchError } = await supabase
          .from('employee_progress')
          .select('*')
          .eq('employee_name', employeeName)
          .eq('week_key', weekKey)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          // If it's not a "not found" error, throw it
          throw fetchError
        }

        if (progressData) {
          setData(progressData)
        } else {
          // Create initial entry if doesn't exist
          // Determine target based on employee
          let targetValue = 0
          if (employeeName === 'bhimesh') targetValue = 50
          else if (employeeName === 'shivaputra') targetValue = 750
          else if (employeeName === 'sunanda') targetValue = 35
          else if (employeeName === 'anurag') targetValue = 10

          const { data: newData, error: createError } = await supabase
            .from('employee_progress')
            .insert({
              employee_name: employeeName,
              week_key: weekKey,
              current_value: 0,
              target_value: targetValue,
              extra_data: {},
            })
            .select()
            .single()

          if (createError) throw createError
          setData(newData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching progress:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`progress-${employeeName}-${weekKey}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employee_progress',
          filter: `employee_name=eq.${employeeName} AND week_key=eq.${weekKey}`,
        },
        (payload) => {
          if (payload.new) {
            setData(payload.new as ProgressData)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [employeeName, weekKey])

  const updateProgress = async (updates: Partial<ProgressData>) => {
    if (!data) return

    try {
      const { error: updateError } = await supabase
        .from('employee_progress')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id)

      if (updateError) throw updateError
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
      throw err
    }
  }

  return { data, loading, error, updateProgress }
}

