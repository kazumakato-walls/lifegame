import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET: returns wallet and performs daily claim if eligible
export async function GET() {
  // ensure single wallet row exists (id=1)
  let wallet = await prisma.wallet.findUnique({ where: { id: 1 } })
  const now = new Date()
  if (!wallet) {
    wallet = await prisma.wallet.create({ data: { balance: 0, lastClaimed: null } })
  }

  // daily claim: if lastClaimed is null or on a previous day, add 1000
  let updated = false
  if (!wallet.lastClaimed) updated = true
  else {
    const last = new Date(wallet.lastClaimed)
    if (last.toDateString() !== now.toDateString()) updated = true
  }

  if (updated) {
    wallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: wallet.balance + 1000, lastClaimed: now },
    })
  }

  return NextResponse.json({ balance: wallet.balance })
}
