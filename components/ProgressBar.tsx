'use client'

interface ProgressBarProps {
  current: number
  target: number
  label?: string
  color?: string
  showNumbers?: boolean
}

export function ProgressBar({ current, target, label, color = 'bg-blue-500', showNumbers = true }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100)
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-400">{label}</span>
          {showNumbers && (
            <span className="text-gray-300">{current} / {target}</span>
          )}
          {!showNumbers && (
            <span className="text-gray-300">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-6 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="text-xs font-semibold text-white">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
      {percentage < 10 && (
        <div className="text-right mt-1 text-xs text-gray-500">
          {percentage.toFixed(1)}%
        </div>
      )}
    </div>
  )
}

