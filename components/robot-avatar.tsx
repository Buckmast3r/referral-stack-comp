export default function RobotAvatar() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-3xl bg-blue-600/20 blur-xl"></div>

      {/* Layered robot container */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-lg"></div>
      <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl"></div>
      <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
        {/* Robot face */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Robot head */}
          <div className="w-20 h-20 bg-blue-900 rounded-lg relative">
            {/* Robot eyes */}
            <div className="absolute top-6 left-3 w-3 h-6 bg-blue-950 rounded-sm"></div>
            <div className="absolute top-6 right-3 w-3 h-6 bg-blue-950 rounded-sm"></div>

            {/* Robot antenna */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-blue-700 rounded-full"></div>

            {/* Robot ears */}
            <div className="absolute top-8 -left-2 w-2 h-6 bg-blue-500 rounded-full"></div>
            <div className="absolute top-8 -right-2 w-2 h-6 bg-blue-500 rounded-full"></div>

            {/* Robot body hint */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-blue-800 rounded-t-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
