const _ = require('lodash')

const getOfferField = (field) => (node) => {
    if(!node.rawAttrs) return false
    return node.rawAttrs.indexOf(field) > 0
}

const getJobInformation = function getJobInformation(page, jobId) {
    const details = page.querySelectorAll(".row.element-margin")

    const descricao = details.reduce((acc, element) => {
        const children = element.childNodes
        const offerCondition = _.find(children, getOfferField("offer_condition"))
        const offerDescription = _.find(children, getOfferField("offer_condition_description"))

        try {
            if (offerCondition.innerHTML !== offerDescription.innerHTML) {
                const title = _.snakeCase(offerCondition.innerHTML.trim())
                acc[title] = offerDescription.innerHTML.trim()
            }
            else {
                acc["perfil"] = offerDescription.innerHTML.trim()
            }
        } catch(e) {
        }
        return acc
    }, {})

    return {
        id: jobId,
        posicao: page.querySelectorAll("h2.nomargins")[0].innerHTML.trim(),
        localizacao: page.querySelectorAll(".offer-title .card-footer-text")[0].innerHTML.trim(),
        descricao
    }
}

module.exports = getJobInformation
