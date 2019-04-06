const fs = require('fs')

const getSearchPage = require('./utils/getSearchPage')
const getIDsFromPage = require('./utils/getIDsFromPage')
const getJobPostingPage = require('./utils/getJobPostingPage')
const getJobInformationFromPage = require('./utils/getJobInformationFromPage')

;(async () => {
    let allOffersIds = []

    // TODO: get total number of pages in first request, or something
    for (let i = 1; i < 2; i++) {
        console.log("starting page", i)

        const searchPage = await getSearchPage(i)
        const offersIds = getIDsFromPage(searchPage)

        allOffersIds = allOffersIds.concat(offersIds)

        console.log("end page", i)
    }

    const jobDescription = []

    for (let i = 0; i < allOffersIds.length; i++) {
        const jobId = allOffersIds[i]
        console.log("starting profile", jobId)

        const jobPage = await getJobPostingPage(jobId)
        const jobInfo = getJobInformationFromPage(jobPage, jobId)

        jobDescription.push(jobInfo)

        console.log("end profile", jobId)
    }

    fs.writeFile(`${process.cwd()}/joboffers.json`, JSON.stringify(jobDescription), 'utf8')
})()
