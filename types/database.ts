export interface ProgressData {
  id?: string
  employee_name: string
  week_key: string
  current_value: number
  target_value: number
  extra_data?: Record<string, any>
  updated_at?: string
}

export interface BhimeshData extends ProgressData {
  employee_name: 'bhimesh'
  extra_data?: {}
}

export interface ShivaputraData extends ProgressData {
  employee_name: 'shivaputra'
  extra_data?: {}
}

export interface SunandaData extends ProgressData {
  employee_name: 'sunanda'
  extra_data?: {
    dummies_hours: number
    dragons_hours: number
    dummies_count: number
    dragons_count: number
  }
}

export interface AnuragData extends ProgressData {
  employee_name: 'anurag'
  extra_data?: {
    heygen_videos: number
    reel_shoots: number
  }
}

