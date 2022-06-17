function SIMMMMMM(req, res, next) {
  if (req.url.endsWith('removetask')){
    res.cookie('seasonsChange', '1', { expires: new Date(Date.now() + 900000) })
  }
  next()
}

module.exports = SIMMMMMM
