import { Toaster } from '@/components/ui/Toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] max-w-xl max-h-xl bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      
      {/* KBC Logo in top corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 z-20">
        KBC
      </div>

      <main className="z-10 w-full">
        {children}
      </main>

      <footer className="absolute bottom-6 text-sm text-gray-600 z-10">
        <p>&copy; 2025 KBC Game. All rights reserved.</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
