import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders the LUNA application shell', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'LUNA' })).toBeInTheDocument()
    expect(screen.getByText('Jewellery store foundation')).toBeInTheDocument()
  })
})
