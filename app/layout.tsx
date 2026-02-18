import './globals.css'

export const metadata = {
  title: 'Lifegame Wallet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>{children}</main>
      </body>
    </html>
  )
}
