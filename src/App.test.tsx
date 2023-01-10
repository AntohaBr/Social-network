import React from 'react'
import { render, screen } from '@testing-library/react'
import ProjectApp from './App'


test('renders learn react link', () => {
  render(<ProjectApp/>)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
