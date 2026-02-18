import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const amount = Number(body.amount || 0)
  if (isNaN(amount) || amount <= 0) return NextResponse.json({ error: 'invalid amount' }, { status: 400 })

  let wallet = await prisma.wallet.findUnique({ where: { id: 1 } })
  if (!wallet) {
    wallet = await prisma.wallet.create({ data: { balance: 0 } })
  }

  const newBalance = Math.max(0, wallet.balance - Math.floor(amount))
  await prisma.wallet.update({ where: { id: wallet.id }, data: { balance: newBalance } })

  return NextResponse.json({ balance: newBalance })
}
