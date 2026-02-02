import { useState } from 'react'
import { motion } from 'framer-motion'
import AppRoutes from './routes/AppRoutes'
import LoadingScreen from './components/LoadingScreen'

const SESSION_LOADING_KEY = 'porto_loading_done'

function App() {
  // Hanya tampilkan loading saat session baru (pertama buka / setelah close lalu buka lagi)
  // Saat navigasi ke halaman lain (client-side) state ini tidak reset, jadi loading tidak muncul lagi
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem(SESSION_LOADING_KEY)
  })

  const handleLoadingComplete = () => {
    sessionStorage.setItem(SESSION_LOADING_KEY, 'true')
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <AppRoutes />
        </motion.div>
      )}
    </>
  )
}

export default App
