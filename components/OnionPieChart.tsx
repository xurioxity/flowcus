'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { memo } from 'react'

interface OnionPieChartProps {
  amazonPercentage: number // 0-100
  flipkartPercentage: number // 0-100
  meeshoPercentage: number // 0-100
}

function OnionPieChartComponent({ 
  amazonPercentage, 
  flipkartPercentage,
  meeshoPercentage
}: OnionPieChartProps) {
  // Outer layer = Amazon (orange)
  // Middle layer = Flipkart (blue)
  // Inner layer = Meesho (pink)
  
  const amazonClamped = Math.min(100, Math.max(0, amazonPercentage))
  const flipkartClamped = Math.min(100, Math.max(0, flipkartPercentage))
  const meeshoClamped = Math.min(100, Math.max(0, meeshoPercentage))
  
  const amazonRemaining = 100 - amazonClamped
  const flipkartRemaining = 100 - flipkartClamped
  const meeshoRemaining = 100 - meeshoClamped

  // Outer layer - Amazon
  const amazonData = [
    { name: 'Amazon Completed', value: amazonClamped },
    { name: 'Amazon Remaining', value: amazonRemaining },
  ]

  // Middle layer - Flipkart
  const flipkartData = [
    { name: 'Flipkart Completed', value: flipkartClamped },
    { name: 'Flipkart Remaining', value: flipkartRemaining },
  ]

  // Inner layer - Meesho
  const meeshoData = [
    { name: 'Meesho Completed', value: meeshoClamped },
    { name: 'Meesho Remaining', value: meeshoRemaining },
  ]

  // Beautiful gradient colors - no harsh borders
  const amazonColor = '#f97316' // orange-500
  const amazonGradient = '#fb923c' // lighter orange
  const flipkartColor = '#3b82f6' // blue-500
  const flipkartGradient = '#60a5fa' // lighter blue
  const meeshoColor = '#ec4899' // pink-500
  const meeshoGradient = '#f472b6' // lighter pink
  const remainingColor = '#0f172a' // slate-900 - very dark, almost black

  // Calculate average percentage for center display
  const avgPercentage = ((amazonClamped + flipkartClamped + meeshoClamped) / 3).toFixed(1)

  return (
    <div className="w-full">
      <div className="w-full h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Amazon gradient */}
              <linearGradient id="amazonGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={amazonColor} stopOpacity={1} />
                <stop offset="100%" stopColor={amazonGradient} stopOpacity={1} />
              </linearGradient>
              {/* Flipkart gradient */}
              <linearGradient id="flipkartGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={flipkartColor} stopOpacity={1} />
                <stop offset="100%" stopColor={flipkartGradient} stopOpacity={1} />
              </linearGradient>
              {/* Meesho gradient */}
              <linearGradient id="meeshoGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={meeshoColor} stopOpacity={1} />
                <stop offset="100%" stopColor={meeshoGradient} stopOpacity={1} />
              </linearGradient>
            </defs>
            
            {/* Outer layer - Amazon */}
            <Pie
              data={amazonData}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              strokeWidth={0}
            >
              <Cell fill="url(#amazonGradient)" />
              <Cell fill={remainingColor} />
            </Pie>
            
            {/* Middle layer - Flipkart */}
            <Pie
              data={flipkartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              strokeWidth={0}
            >
              <Cell fill="url(#flipkartGradient)" />
              <Cell fill={remainingColor} />
            </Pie>
            
            {/* Inner layer - Meesho */}
            <Pie
              data={meeshoData}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={45}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              strokeWidth={0}
            >
              <Cell fill="url(#meeshoGradient)" />
              <Cell fill={remainingColor} />
            </Pie>
            
            {/* Center text with gradient background */}
            <circle cx="50%" cy="50%" r="20" fill="#0f172a" opacity={0.8} />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-bold fill-white"
            >
              {avgPercentage}%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: amazonColor }}></div>
          <span className="text-gray-400">Amazon: <span className="text-white font-medium">{amazonClamped.toFixed(1)}%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: flipkartColor }}></div>
          <span className="text-gray-400">Flipkart: <span className="text-white font-medium">{flipkartClamped.toFixed(1)}%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: meeshoColor }}></div>
          <span className="text-gray-400">Meesho: <span className="text-white font-medium">{meeshoClamped.toFixed(1)}%</span></span>
        </div>
      </div>
    </div>
  )
}

// Export memoized component - re-render when percentages change
export const OnionPieChart = memo(OnionPieChartComponent, (prevProps, nextProps) => {
  // Return true to skip re-render if props are equal, false to re-render if they changed
  const propsEqual = (
    prevProps.amazonPercentage === nextProps.amazonPercentage &&
    prevProps.flipkartPercentage === nextProps.flipkartPercentage &&
    prevProps.meeshoPercentage === nextProps.meeshoPercentage
  )
  return propsEqual // Skip re-render if equal, re-render if different
})
