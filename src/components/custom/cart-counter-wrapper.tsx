'use client'

import dynamic from 'next/dynamic'

const CartCounter = dynamic(() => import('./cart-counter'), { ssr: false })

export default function CartCounterWrapper() {
  return <CartCounter />
}
