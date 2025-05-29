import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
        404 - Página Não Encontrada
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Não foi possível encontrar a página solicitada.
      </p>
      <Link href="/" className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
        Voltar para a página inicial
      </Link>
    </div>
  )
}
