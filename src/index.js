const lcjs = require('@lightningchart/lcjs')
const { lightningChart, Themes } = lcjs

const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
const chart = lc.ParallelCoordinateChart({
    theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = window.devicePixelRatio >= 2
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (window.devicePixelRatio >= 2)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.devicePixelRatio >= 2 ? lcjs.htmlTextRenderer : undefined,
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

const series1 = chart.addSeries(
    { automaticColorIndex: 0 }
).setName('Sample 1').setData({
    'Variable A': 50,
    'Variable B': 100,
    'Variable C': 2.0,
})

const series2 = chart.addSeries(
    { automaticColorIndex: 2 }
).setName('Sample 2').setData({
    'Variable A': 30,
    'Variable B': 115,
    'Variable C': 0.5,
})

const series3 = chart.addSeries(
    { automaticColorIndex: 4 }
).setName('Sample 3').setData({
    'Variable A': 35,
    'Variable B': 82,
    'Variable C': 0.9,
})
