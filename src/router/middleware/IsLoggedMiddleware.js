export default function process ({ next, router }) {
  const jwt = sessionStorage.getItem('JWT')
  if (jwt) {
    router.push({ name: 'app.desktop' })
  } else {
    return next()
  }
}
