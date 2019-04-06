const getIDsFromPage = function getIDsFromPage(page) {
    const jobPostingIdNodes = page.querySelectorAll('span.card-footer-text')

    return jobPostingIdNodes.reduce((acc, element) => {
        if(parseInt(element.innerHTML, 10) > 0) {
            acc.push(element.innerHTML)
        }

        return acc
    }, [])
}

module.exports = getIDsFromPage
