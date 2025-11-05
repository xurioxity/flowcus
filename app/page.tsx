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
  {
    name: 'Swathi',
    target: '7 months invoices (Apr-Oct) per platform',
    href: '/swathi',
    color: 'from-indigo-500 to-purple-500',
    icon: '📋',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Flowcus
          </h1>
          <p className="text-lg text-gray-300 mb-1">Employee Progress Tracker</p>
          <p className="text-xs text-gray-500">Track progress, celebrate achievements 🚀</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.map((employee, index) => (
            <Link
              key={employee.name}
              href={employee.href}
              className="group relative block animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Glassmorphism card with gradient border */}
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 backdrop-blur-xl border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Animated gradient border glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${employee.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10`}></div>
                
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${employee.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-6 z-10">
                  <div className="flex items-start gap-4 mb-5">
                    {/* Icon with floating animation */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${employee.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3`}>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                      <span className="relative z-10">{employee.icon}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h2 className={`text-xl font-bold mb-2 bg-gradient-to-r ${employee.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                        {employee.name}
                      </h2>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        {employee.target}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow indicator with slide animation */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/30 group-hover:border-gray-600/50 transition-colors">
                    <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                      View Progress
                    </span>
                    <div className="flex items-center gap-1">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${employee.color} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated shine sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

