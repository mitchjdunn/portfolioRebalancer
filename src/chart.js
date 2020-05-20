const $ = require("jquery")

const Chart = require("chart.js")

module.exports = {

    /*
     * Create piechart for the first elem in the $pieChart variable
     * data list of data in pie chart
     * backgroundColors  list of color for pieces
     * labels list of strings that associate with data
     *
     * optional args
     * label label of pie chart
     * reponsive boolean ???
     *
     */
    PieChart ($pieChart, data, backgroundColors, labels
            // optional
            ,label = ""
            , responsive = true) {

            const config = {
                type: "pie",
                data: {
                    datasets: [{
                        label: label,
                        data: data,
                        backgroundColor: backgroundColors,
                    }],
                    labels: labels,
                },
                options: {
                    responsive: responsive
                }
            }
            console.log(config)
            const chart = new Chart($pieChart[0].getContext("2d"), config)
            chart.update()
        return chart
    }

}
