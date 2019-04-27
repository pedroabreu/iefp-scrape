const superagent = require('superagent')
const parse = require('node-html-parser').parse
const iconv = require('iconv-lite')

const getJobPostingPage = async function getJobPostingPage(offerId) {
    const response = await superagent
        .get("https://iefponline.iefp.pt/IEFP/pesquisas/detalheOfertas2.do")
        .query({ idOferta: offerId })
        .set({ "Content-type": "text/html;charset=ISO-8859-1" })

    return parse(iconv.decode(response.text, 'ISO-8859-1'))
}

module.exports = getJobPostingPage
