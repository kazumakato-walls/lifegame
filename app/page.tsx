"use client"

import { useEffect, useState } from 'react'

type Wallet = { balance: number }

export default function Page() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState<number>(100)
  const [pop, setPop] = useState(false)

  const fetchWallet = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/wallet')
      const json = await res.json()
      const prev = wallet?.balance ?? null
      setWallet(json)
      // pop animation when balance increases
      if (prev !== null && json.balance > prev) {
        setPop(true)
        setTimeout(() => setPop(false), 700)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subtract = async (amt: number) => {
    if (amt <= 0) return
    setLoading(true)
    try {
      await fetch('/api/subtract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt }),
      })
      await fetchWallet()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div>
            <div className="title">Lifegame</div>
            <div className="subtitle">ログインボーナス型 仮想ウォレット（MVP）</div>
          </div>
          <div className="muted">Single-user • SQLite</div>
        </div>

        <div className={"balance" + (pop ? ' pop' : '')}>
          {wallet ? `🎉 ${wallet.balance.toLocaleString()} 円` : '—'}
          <small>毎日1回 1000円 を自動加算</small>
        </div>

        <div className="controls">
          <button className="btn" onClick={() => subtract(100)} disabled={loading}>
            🧧 -100
          </button>
          <button className="btn" onClick={() => subtract(500)} disabled={loading}>
            🧧 -500
          </button>
          <button className="btn ghost" onClick={fetchWallet} disabled={loading}>
            🔄 リフレッシュ
          </button>
          <button
            className="btn ghost"
            onClick={async () => {
              setLoading(true)
              try {
                const res = await fetch('/api/simulate-login', { method: 'POST' })
                const json = await res.json()
                const prev = wallet?.balance ?? null
                setWallet(json)
                if (prev !== null && json.balance > prev) {
                  setPop(true)
                  setTimeout(() => setPop(false), 700)
                }
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
          >
            🔑 ログイン再現
          </button>
        </div>

        <div className="inputRow">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
          />
          <button
            className="btn secondary"
            onClick={() => subtract(amount)}
            disabled={loading}
          >
            ➖ 減算
          </button>
        </div>

        <div className="note">注意: 認証・複数ユーザー未実装。単一ユーザーの動作確認用途のみです。</div>
      </div>
    </div>
  )
}
