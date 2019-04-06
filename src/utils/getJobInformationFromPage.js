const _ = require('lodash')

const getJobInformation = function getJobInformation(page, jobId) {
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
        id: jobId,
        posicao: page.querySelectorAll("h2.nomargins")[0].innerHTML.trim(),
        localizacao: page.querySelectorAll(".offer-title .card-footer-text")[0].innerHTML.trim(),
        descricao
    }
}

module.exports = getJobInformation
