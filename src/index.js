const lcjs = require('@lightningchart/lcjs')
const { lightningChart, Themes } = lcjs

const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
const chart = lc.ParallelCoordinateChart({
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})
    .setCursorMode('show-all')

const Axes = {
    'Variable A': 0,
    'Variable B': 1,
    'Variable C': 2,
}
chart.setAxes(Axes)
chart.getAxis(Axes['Variable A']).setInterval({ start: 20, end: 60 })
chart.getAxis(Axes['Variable B']).setInterval({ start: 80, end: 120 })
chart.getAxis(Axes['Variable C']).setInterval({ start: 0.0, end: 2.5 })

const series1 = chart.addSeries().setName('Sample 1').setData({
    'Variable A': 50,
    'Variable B': 100,
    'Variable C': 2.0,
})

const series2 = chart.addSeries().setName('Sample 2').setData({
    'Variable A': 30,
    'Variable B': 115,
    'Variable C': 0.5,
})

const series3 = chart.addSeries().setName('Sample 3').setData({
    'Variable A': 35,
    'Variable B': 82,
    'Variable C': 0.9,
})
