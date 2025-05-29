import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirecionamos para a homepage da versão App Router
    router.replace('/');
  }, [router]);

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
