require("./index.css")

require("../node_modules/font-awesome/css/font-awesome.min.css")

const $ = require("jquery")
const d3 = require("d3-scale-chromatic")

const { View } = require("./view.js")
const { PieChart } = require("./chart.js")
const { Tabs } = require("./tabs.js")

const {
    colors,
    shadows,
    mkToolbar
} = require("./common.js")

function Ui () {

    const pages = {
        mainPage: {
            view: MainPage(() => View($view, null, pages, "mainPage"))
            // How can we pass view pages inside pages definition?
        },
    }
    const $view = $("<div>")
        .prop("id", "mainView")

    const $app = $("<div>")
        .css("border-radius", "3px")
        .css("overflow", "hidden")
        .css("box-shadow", shadows.card1)
        .css("width", "100%")
        .css("height", "100%")
        .append($view)

    $(document.body).append($app)

    View($view, null, pages, 'mainPage', true)


}

function MainPage () {

    console.log("loading main page")

    const $view = $("<div>")
        .prop("id", "portfolioView")

    const pages = {
        detailsTab: {
            tabTitle: "Details",
            view: DetailsTab(),
            action: () => View($view, $tabs, pages, "detailsTab")
        },
        rebalanceTab: {
            tabTitle: "Rebalance",
            view: RebalanceTab(),
            action: () => View($view, $tabs, pages, "rebalanceTab")
        },
        editTab: {
            tabTitle: "Reallocate",
            view: EditTab(),
            action: () => View($view, $tabs, pages, "editTab")
        },
    }

    const $tabs = Tabs(pages)

    const $mainPage = $("<div>")
        .append(mkToolbar("Portfolio",
        // { right: [{ icon: "plus", action: toPageB }] }
        // TODO use ^ to create a settings? button in the future
        ))
        .prop("id", "mainPage")
        .append($tabs)
        .append($view)

    View($view, $tabs, pages, "detailsTab", true)

    return $mainPage

}

function DetailsTab () {

    const $pieChart = $("<canvas>")
        // .prop("class", "pieChart")
    const $detailsTab = $("<div>").append($pieChart)

    //  |ticker|quantity|value|current allocation (+/- actuatl)|
    fetch("/portfolio/snapshot")
        .then((resp) => resp.json())
        .then(({ assetSnapshots }) => {
            PieChart($pieChart, data = assetSnapshots.map(a => a.quantity * a.tickerValue)
                ,assetSnapshots.map((_, i) => d3.interpolateViridis(i / (assetSnapshots.length - 1)))
                ,assetSnapshots.map(a => a.ticker)
                ,label = "Ticker Amounts")
        })

    // JSON: {
    //    assetSnapshots: [
    //        {
    //          ticker: $ticker
    //          quantity: $quantity
    //          tickerValue: $tickerValue
    //          targetAllocationPercent: $targetAllocationPercent
    //          currentAllocationPercent: $currentAllocationPercent
    //        }, ...
    //    ]
    //}

    //  TODO
    //  Add support for multiple portfolios
    return $detailsTab
}

function RebalanceTab () {

    const $dollarcontributionLabel = $("<label>")
        .text("How much will you be contributing: ")
        .prop("for", "dollarContribution") // WHAT FOR
    const $dollarContribution = $("<input>")
        .prop("type", "text")
        .prop("id", "dollarContribution")


    const $userInput = $("<span>") // TODO Style this pls
        .append($dollarcontributionLabel)
        .append($dollarContribution)
    const $pieChart = $("<canvas>")
    const $rebalanceTab = $("<div>").append($userInput).append($pieChart)

    fetch("/portfolio/snapshot")
        .then((resp) => resp.json())
        .then(({ assetSnapshots }) => {
            PieChart($pieChart, data = assetSnapshots.map(a => a.quantity * a.tickerValue)
                ,assetSnapshots.map((_, i) => d3.interpolateViridis(i / (assetSnapshots.length - 1)))
                ,assetSnapshots.map(a => a.ticker)
                ,label = "Ticker Amounts")
            })

    $dollarContribution.on("input", () => {
        console.log($dollarContribution.val())
    })
    // TODO
    //  get /portfolio/snapshot
    //
    //  determine sell/buy quantity for each ticker to establish
    //     target allocation (as close as possible assuming integer quanities)
    //
    //  adjust quantities based on number entered in box
    //
    //  on submit post /portfolio/rebalance
    //      json: {
    //          [
    //          {
    //              ticker: $ticker,
    //              quantity: $quantity
    //          }
    //          ]
    //      }

    return $rebalanceTab
}

function EditTab () {

    const $editTab = $("<div>")
        .text("Edit Tab")

    // TODO
    // get /portfolio/snapshot
    //
    // display table
    // |ticker|targetAllocation|
    // target allocation should be editable
    //
    // submit on click ( with total as 100% -- backend validation also )
    //
    // post /portfolio/reallocate
    //      json {
    //          [
    //              ticker: $ticker
    //              targetAllocation: $targetAllocation
    //          ]
    //      }

    return $editTab
}

Ui()
