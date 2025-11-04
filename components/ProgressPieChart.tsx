'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface ProgressPieChartProps {
  current: number
  target: number
  colors?: string[]
  label?: string
}

export function ProgressPieChart({ current, target, colors = ['#3b82f6', '#1e293b'], label }: ProgressPieChartProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const remaining = 100 - percentage
  
  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: remaining },
  ]
  
  return (
    <div className="w-full">
      {label && <p className="text-center mb-4 text-gray-400">{label}</p>}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              <Cell fill={colors[0]} />
              <Cell fill={colors[1]} />
            </Pie>
            <Tooltip />
            <Legend />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold fill-white"
            >
              {percentage.toFixed(1)}%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          {current} / {target}
        </p>
      </div>
    </div>
  )
}

