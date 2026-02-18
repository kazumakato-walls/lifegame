"use client"

import { useEffect, useState } from 'react'

type Wallet = { balance: number }

export default function Page() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWallet = async () => {
    setLoading(true)
    const res = await fetch('/api/wallet')
    const json = await res.json()
    setWallet(json)
    setLoading(false)
  }

  useEffect(() => {
    // on load, call wallet endpoint which also triggers daily claim if eligible
    fetchWallet()
  }, [])

  const subtract = async (amount: number) => {
    setLoading(true)
    await fetch('/api/subtract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
    await fetchWallet()
  }

  return (
    <div>
      <h1>Lifegame — 仮想ウォレット</h1>
      {loading && <div>処理中…</div>}
      <div style={{ marginTop: 16 }}>
        <strong>現在残高:</strong> {wallet ? `${wallet.balance} 円` : '読み込み中'}
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => subtract(100)}> -100 円</button>
        <button onClick={() => subtract(500)} style={{ marginLeft: 8 }}>
          -500 円
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <label>
          任意金額: <input id="amount" type="number" defaultValue={100} />
        </label>
        <button
          style={{ marginLeft: 8 }}
          onClick={() => {
            const el = document.getElementById('amount') as HTMLInputElement | null
            if (!el) return
            const v = parseInt(el.value || '0', 10)
            if (v > 0) subtract(v)
          }}
        >
          減算
        </button>
      </div>
    </div>
  )
}
