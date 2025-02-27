"use client;"
import React from 'react'
import Link from 'next/link'
export default function Option() {
    const [playmode, setPlaymode] = React.useState<string>('')
    const [Option, setOption] = React.useState<string>('')

  return (
    <div className="h-[90vh] w-[60vw] bg-[#143034] rounded-sm z-50 border-[#f97e5c] border border-[1rem] p-4">
        <div className='w-full h-[10%] flex items-center justify-center'>
            <h1 className='text-4xl text-[#f97e5c] border-b-2 border-[#f97e5c]'>Game</h1>
        </div>
        <div className='flex flex-col items-center gap-[2rem] mt-8'>
            <div className='w-[90%] h-[10rem] flex items-center justify-center bg-[#f97e5c] rounded-sm hover:-translate-y-1 transition-all cursor-pointer' onClick={() => setPlaymode('multiplayer')}>
                <Link href='/game'>
                <h1 className='text-2xl text-[#143034] font-bold'>MultiPlayer</h1>
                </Link>
            </div>

            <div className='w-[90%] h-[10rem] flex items-center justify-center bg-[#f97e5c] rounded-sm transition-all cursor-pointer hover:-translate-y-1 ' onClick={() => setPlaymode('bot')}>
                <h1 className='text-2xl text-[#143034] font-bold' >Play with Bots</h1>
            </div>

        </div>

    </div>
  )
}



