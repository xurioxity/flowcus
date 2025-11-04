'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface DualProgressPieChartProps {
  value1: number
  value2: number
  target: number
  label1: string
  label2: string
  color1: string
  color2: string
  remainingColor: string
}

export function DualProgressPieChart({
  value1,
  value2,
  target,
  label1,
  label2,
  color1,
  color2,
  remainingColor,
}: DualProgressPieChartProps) {
  const total = value1 + value2
  const remaining = Math.max(0, target - total)
  const percentage = Math.min((total / target) * 100, 100)
  
  const data = [
    { name: label1, value: value1 },
    { name: label2, value: value2 },
    { name: 'Remaining', value: remaining },
  ]
  
  const COLORS = [color1, color2, remainingColor]
  
  return (
    <div className="w-full">
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
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
          {percentage.toFixed(1)}% Complete
        </p>
      </div>
    </div>
  )
}

