import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a página inicial após 2 segundos
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
        404 - Página Não Encontrada
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Redirecionando para a página inicial...
      </p>
    </div>
  )
}
