const superagent = require('superagent')
const parse = require('node-html-parser').parse

const getSearchPage = async function getSearchPage(pageNr) {
    const response = await superagent
        .post('https://iefponline.iefp.pt/IEFP/pesquisas/search.do')
        .send({ tipo: 'OFERTA_EMPREGO', action: '5', currentPage: pageNr, resultsPerPage: '50' })
        .set({'Content-Type': 'application/x-www-form-urlencoded'})

    return parse(response.text)
}

module.exports = getSearchPage
