import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirecionamos para a homepage da versão App Router
    router.replace('/');
  }, [router]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );

  // Página de carregamento temporária
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(to bottom right, #ffffff, #edf5ff)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecionando...</h2>
        <p>Por favor, aguarde.</p>
      </div>
    </div>
  );
}
