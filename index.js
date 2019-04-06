const superagent = require('superagent');
const parse = require('node-html-parser').parse;
const _ = require('lodash')
const fs = require('fs')

const getPage = async function getPage(pageNr) {
    const response = await superagent
    .post('https://iefponline.iefp.pt/IEFP/pesquisas/search.do')
    .send({ tipo: 'OFERTA_EMPREGO', action: '5', currentPage: pageNr, resultsPerPage: "50" })
    .set({"Content-Type": "application/x-www-form-urlencoded"})

    const page = parse(response.text)
    const ids = page.querySelectorAll("span.card-footer-text")

    return ids.reduce((acc, element) => {
        if(parseInt(element.innerHTML, 10) > 0) {
            acc.push(element.innerHTML)
        }

        return acc
    }, [])
}

const getOfferPage = async function getOfferPage(offerId) {
    const response = await superagent
    .get("https://iefponline.iefp.pt/IEFP/pesquisas/detalheOfertas2.do")
    .query({ idOferta: offerId })

    const page = parse(response.text)

    const details = page.querySelectorAll(".row.element-margin")

    const descricao = details.reduce((acc, element) => {
        const children = element.childNodes
        const offer_condition = _.find(children, (node) => {
            if(!node.rawAttrs) return false
            return node.rawAttrs.indexOf("offer_condition") > 0
        })
        let offer_condition_description = _.find(children, (node) => {
            if(!node.rawAttrs) return false
            return node.rawAttrs.indexOf("offer_condition_description") > 0
        })
        try {
            if (offer_condition.innerHTML !== offer_condition_description.innerHTML) {
                const title = _.snakeCase(offer_condition.innerHTML.trim())
                acc[title] = offer_condition_description.innerHTML.trim()
            }
            else {
                acc["perfil"] = offer_condition_description.innerHTML.trim()
            }
        } catch(e) {
        }
        return acc
    }, {})

    return {
        id: offerId,
        posicao: page.querySelectorAll("h2.nomargins")[0].innerHTML.trim(),
        localizacao: page.querySelectorAll(".offer-title .card-footer-text")[0].innerHTML.trim(),
        descricao
    }

}

;(async () => {
    let allOffersIds = []

    // TODO: get total number of pages in first request, or something
    for (let i = 1; i < 2; i++) {
        console.log("starting page", i)

        const offersIds = await getPage(i)
        allOffersIds = allOffersIds.concat(offersIds)

        console.log("end page", i)
    }


    const offerDescription = []

    for (let i = 0; i < allOffersIds.length; i++) {
        console.log("starting profile", allOffersIds[i])
        const scrape = await getOfferPage(allOffersIds[i])
        offerDescription.push(scrape)
        console.log("end profile", allOffersIds[i])
    }

    var json = JSON.stringify(offerDescription)

    fs.writeFile('myjsonfile.json', json, 'utf8');

})()
