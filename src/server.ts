import express, { Request, Response } from 'express'
import { z } from 'zod'

const app = express()
const port = 3000

function sieveOfEratosthenes(n: number): number[] {
  const isPrime = new Array(n).fill(true)

  isPrime[0] = isPrime[1] = false

  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i < n; i += p) {
        isPrime[i] = false
      }
    }
  }

  const primes: number[] = []

  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      primes.push(i)
    }
  }

  return primes
}

// Function to find the median prime number(s)
function findMedianPrimes(n: number): number[] {
  const primes = sieveOfEratosthenes(n)
  const len = primes.length

  if (len === 0) return []

  if (len % 2 === 1) {
    // Odd number of primes, return the middle one
    return [primes[Math.floor(len / 2)]]
  } else {
    // Even number of primes, return the two middle ones
    return [primes[len / 2 - 1], primes[len / 2]]
  }
}

// Zod schema for validation
const nSchema = z.number().int().gt(2)

// Define the route
app.get('/median-primes/:n', (req: Request, res: Response) => {
  const n = Number(req.params.n)
  const result = nSchema.safeParse(n)

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid input, please provide an integer greater than 2',
    })
  }

  const medianPrimes = findMedianPrimes(n)
  res.json({ medianPrimes })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
