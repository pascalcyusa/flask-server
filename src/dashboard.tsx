'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
    const [speed, setSpeed] = useState(0)
    const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null)
    const [boost, setBoost] = useState(0)
    const [time, setTime] = useState('00:00')

    // Update time
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleCommand = (command: string) => {
        switch (command) {
            case 'moveup':
                setDirection('up')
                break
            case 'movedown':
                setDirection('down')
                break
            case 'moveleft':
                setDirection('left')
                break
            case 'moveright':
                setDirection('right')
                break
            case 'stop':
                setDirection(null)
                setSpeed(0)
                setBoost(0)
                break
            case 'speedup':
                setSpeed(prev => Math.min(prev + 10, 100))
                setBoost(prev => Math.min(prev + 20, 100))
                break
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    handleCommand('moveup')
                    break
                case 'ArrowDown':
                    handleCommand('movedown')
                    break
                case 'ArrowLeft':
                    handleCommand('moveleft')
                    break
                case 'ArrowRight':
                    handleCommand('moveright')
                    break
                case 's':
                case 'S':
                    handleCommand('stop')
                    break
                case 'a':
                case 'A':
                    handleCommand('speedup')
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-black rounded-[40px] p-8 relative overflow-hidden">
                {/* Dashboard Display */}
                <div className="bg-gray-900 rounded-[30px] p-6 relative">
                    {/* Time Display */}
                    <div className="text-blue-400 text-xl font-medium text-center mb-4">{time}</div>

                    {/* Main Display Area */}
                    <div className="flex items-center justify-between gap-8 mb-8">
                        {/* Left Speed Indicator */}
                        <div className="w-24 h-[120px] bg-gray-800 rounded-lg relative overflow-hidden">
                            <div
                                className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500 ease-out"
                                style={{ height: `${speed}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {speed}
                            </div>
                        </div>

                        {/* Central Boost Display */}
                        <div className="relative flex-1 aspect-square">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-700" />
                            <div
                                className="absolute inset-0 rounded-full border-4 border-blue-500 transition-all duration-300"
                                style={{
                                    clipPath: `polygon(50% 50%, -50% -50%, ${boost}% -50%, ${boost}% ${boost}%, -50% ${boost}%)`,
                                    transform: `rotate(${direction === 'up' ? 0 : direction === 'right' ? 90 : direction === 'down' ? 180 : direction === 'left' ? 270 : 0}deg)`
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-2xl font-bold">Boost</div>
                            </div>
                        </div>

                        {/* Right Speed Indicator */}
                        <div className="w-24 h-[120px] bg-gray-800 rounded-lg relative overflow-hidden">
                            <div
                                className="absolute bottom-0 w-full bg-orange-500 transition-all duration-500 ease-out"
                                style={{ height: `${boost}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {boost}
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                        <button
                            onClick={() => handleCommand('moveup')}
                            className={`col-start-2 p-4 rounded-lg ${direction === 'up' ? 'bg-blue-500' : 'bg-gray-800'} transition-colors`}
                        >
                            ⬆
                        </button>
                        <button
                            onClick={() => handleCommand('moveleft')}
                            className={`p-4 rounded-lg ${direction === 'left' ? 'bg-blue-500' : 'bg-gray-800'} transition-colors`}
                        >
                            ⬅
                        </button>
                        <button
                            onClick={() => handleCommand('stop')}
                            className="p-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            ⏹
                        </button>
                        <button
                            onClick={() => handleCommand('moveright')}
                            className={`p-4 rounded-lg ${direction === 'right' ? 'bg-blue-500' : 'bg-gray-800'} transition-colors`}
                        >
                            ➡
                        </button>
                        <button
                            onClick={() => handleCommand('speedup')}
                            className="col-start-2 p-4 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
                        >
                            ⚡
                        </button>
                        <button
                            onClick={() => handleCommand('movedown')}
                            className={`col-start-2 p-4 rounded-lg ${direction === 'down' ? 'bg-blue-500' : 'bg-gray-800'} transition-colors`}
                        >
                            ⬇
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

