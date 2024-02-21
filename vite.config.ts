import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, "src/assets"),
  experimental: {
    renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
      if (type === 'public') {
        return 'https://keepgoinglikelion.github.io/meringue-FE/' + filename
      }
      else if (path.extname(hostId) === '.js') {
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      }
      else {
        return 'https://keepgoinglikelion.github.io/meringue-FE/' + filename
      }
    }
  }
})
