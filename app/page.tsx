import Link from 'next/link'

const employees = [
  {
    name: 'Bhimesh',
    target: '50 action figures/weapons per week',
    href: '/bhimesh',
    color: 'from-blue-500 to-cyan-500',
    icon: '🎯',
  },
  {
    name: 'Shivaputra',
    target: '750 listings per week',
    href: '/shivaputra',
    color: 'from-purple-500 to-pink-500',
    icon: '📦',
  },
  {
    name: 'Sunanda',
    target: '49 dummies',
    href: '/sunanda',
    color: 'from-green-500 to-emerald-500',
    icon: '🐉',
  },
  {
    name: 'Anurag',
    target: '1 Heygen video + 1 reel per day',
    href: '/anurag',
    color: 'from-orange-500 to-red-500',
    icon: '🎬',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Flowcus
          </h1>
          <p className="text-xl text-gray-300 mb-2">Employee Progress Tracker</p>
          <p className="text-sm text-gray-500">Track progress, celebrate achievements 🚀</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee, index) => (
            <Link
              key={employee.name}
              href={employee.href}
              className="group block relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 hover:from-gray-900 hover:to-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${employee.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
              
              {/* Content */}
              <div className="relative p-8 z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${employee.color} mb-6 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {employee.icon}
                </div>
                <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {employee.name}
                </h2>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {employee.target}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  <span>View Progress</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

