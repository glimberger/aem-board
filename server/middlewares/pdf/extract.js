const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const PDFExtract = require('pdf.js-extract').PDFExtract
const pdfExtract = new PDFExtract()
const options = {}

const extract = (req, res, next) => {
  winston.debug('BEGIN pdf.extract middleware')
  winston.debug(`extracting ${req.file.filename}`)

  pdfExtract.extract(req.file.path, options , (err, data) => {
    if (err) {
      winston.debug('END pdf.extract middleware')

      return next(err)
    }

    winston.debug(`data extracted from ${req.file.filename}`)

    const {pages} = data
    const {content} = pages[0]
    content.sort((a, b) => {
      const ay = Math.round(a.y)
      const by = Math.round(b.y)

      if (Math.abs(ay - by) < 3) {
        return a.x - b.x
      }

      return ay - by
    })

    const findIndexInclude = inc => item => {
      return item.str.includes(inc)
    }

    const siComplementaireIndex = content.findIndex(findIndexInclude('Si complémentaire ou rectificative'))
    const raisonSocIndex = content.findIndex(findIndexInclude('Raison sociale ou nom'))
    const startDateIndex = content.findIndex(findIndexInclude("Date d'embauche"))
    const endDateIndex = content.findIndex(findIndexInclude('fin du contrat'))
    const ruptureAnticipeeIndex = content.findIndex(findIndexInclude('Rupture anticipée'))
    const salaireIndex = content.findIndex(findIndexInclude('CONTRIBUTIONS DUES'))

    let startDate = content[startDateIndex+1] ? content[startDateIndex+1].str.replace(/\s+/g, '-') : null
    if (startDate) {
      const [d, m, y] = startDate.split('-')
      startDate = y+'-'+m+'-'+d
    }

    let endDate = content[endDateIndex+1] ? content[endDateIndex+1].str.replace(/\s+/g, '-') : ''
    if (endDate) {
      const [d, m, y] = endDate.split('-')
      endDate = y+'-'+m+'-'+d
    }

    res.pdf = {
      url: `http://localhost:3000/static/pdf/${req.file.filename}`,
      path: req.file.path,
      id: content[siComplementaireIndex-2] ? content[siComplementaireIndex-2].str : (req.file.filename).split('.')[0],
      firm: content[raisonSocIndex+1] ? content[raisonSocIndex+1].str : '',
      startDate: startDate,
      endDate: endDate,
      hours: content[ruptureAnticipeeIndex+4] ? content[ruptureAnticipeeIndex+4].str : null,
      days: content[ruptureAnticipeeIndex+7] ? content[ruptureAnticipeeIndex+7].str : null,
      salary: content[salaireIndex+1] ? content[salaireIndex+1].str.replace(',', '.') : null,
      //content
    }

    winston.debug(`data formatted: ${res.pdf}`)
    winston.debug('END pdf.extract middleware')

    return next()
  })
}

module.exports = extract