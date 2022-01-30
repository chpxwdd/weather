// ------------------------------------------------------------------------------------------
// install USER ACL ROLES

exports.installCore = mongoose => {
  const bcrypt = require('bcryptjs')

  const modelRole = mongoose.model('CoreRole')

  const DOMAIN = 'local.domain'
  const MEMBER = 'member'
  const ADMIN = 'admin'
  const PASSWORD = 'alkoklan'

  const memberRole = new modelRole({ title: MEMBER })
  memberRole.save()

  const adminRole = new modelRole({ title: ADMIN, parent: memberRole })
  adminRole.save()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return console.error('no get salt', err)
    }

    bcrypt.hash(PASSWORD, salt, (err, hash) => {
      
      if (err) {
        return console.error('no crypt hash', err)
      }

      const modelUser = mongoose.model('CoreUser')

      const memberUser = new modelUser({
        username: MEMBER,
        email: MEMBER + '@' + DOMAIN,
        password: hash,
        role: memberRole,
      })
      memberUser.save()

      const adminUser = new modelUser({
        username: ADMIN + '@' + DOMAIN,
        email: EMAIL_ADMIN,
        password: hash,
        role: adminRole,
      })
      adminUser.save()
    })
  })
}
// ------------------------------------------------------------------------------------------
