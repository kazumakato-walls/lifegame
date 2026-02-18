import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// POST: simulate a user login by performing the same daily-claim check
export async function POST() {
  let wallet = await prisma.wallet.findUnique({ where: { id: 1 } })
  const now = new Date()
  if (!wallet) {
    wallet = await prisma.wallet.create({ data: { balance: 0, lastClaimed: null } })
  }

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
