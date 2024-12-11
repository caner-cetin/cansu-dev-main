import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dj')({
  component: RouteComponent,
})

function RouteComponent() {
  window.location.href = 'https://dj.cansu.dev'
  return undefined
}
