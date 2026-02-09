// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { div } from 'motion/react-client';
// import React from 'react';

// export default function Collaborate() {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-4xl font-bold text-gray-800">Welcome to the Collaborate Page!</h1>
//             <p className="mt-4 text-lg text-gray-600">
//                 We're excited to have you here. Start collaborating and building amazing things!
//             </p>
//             <div className="mt-6">
//                 <Link href="/Editor" passHref>
//                     <Button className="flex items-center cursor-pointer">
//                         Collaborate Now
//                     </Button>
//                 </Link>
//             </div>
//         </div>

//     );
// } 

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../../components/login"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-black relative overflow-hidden">
      {/* Animated background grid - matching landing page */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Content */}
      <div className="flex w-full items-center justify-center p-6 md:p-10 relative z-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          {/* Logo and title */}
          <div className="flex flex-col items-center gap-4 text-center">
            <a href="/" className="flex items-center gap-3 font-bold text-2xl text-white hover:scale-105 transition-transform">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                XOR+
              </span>
            </a>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Start Collaborating</h1>
              <p className="text-gray-400">Join a room and code together in real-time</p>
            </div>
          </div>
          
          {/* Login form */}
          <LoginForm />
          
          {/* Footer text */}
          <p className="text-center text-sm text-gray-500">
            Real-time code collaboration made simple
          </p>
        </div>
      </div>
    </div>
  )
}
