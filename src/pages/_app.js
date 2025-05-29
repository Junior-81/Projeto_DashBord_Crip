import '../app/globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
