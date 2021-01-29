export default function process ({ next, router, to }) {
  const permissions = sessionStorage.getItem('AccountPermissions').split(',')
  if (permissions.includes(to.meta.permission)) {
    return next()
  } else {
    console.log('Access denied')
    return router.push({ name: 'app.desktop' })
  }
}
