/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  Sand-Signika theme for Highcharts JS
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import D from '../../Core/Defaults.js';
var setOptions = D.setOptions;
import H from '../../Core/Globals.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, createElement = U.createElement;
/* *
 *
 *  Theme
 *
 * */
var SandSignikaTheme;
(function (SandSignikaTheme) {
    /* *
     *
     *  Constants
     *
     * */
    SandSignikaTheme.options = {
        colors: [
            '#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
            '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        chart: {
            backgroundColor: null,
            style: {
                fontFamily: 'Signika, serif'
            }
        },
        title: {
            style: {
                color: 'black',
                fontSize: '16px',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            style: {
                color: 'black'
            }
        },
        tooltip: {
            borderWidth: 0
        },
        legend: {
            backgroundColor: '#E0E0E8',
            itemStyle: {
                fontWeight: 'bold',
                fontSize: '13px'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }
        },
        yAxis: {
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }
        },
        plotOptions: {
            series: {
                shadow: true
            },
            candlestick: {
                lineColor: '#404048'
            },
            map: {
                shadow: false
            }
        },
        // Highcharts Stock specific
        navigator: {
            xAxis: {
                gridLineColor: '#D0D0D8'
            }
        },
        rangeSelector: {
            buttonTheme: {
                fill: 'white',
                stroke: '#C0C0C8',
                'stroke-width': 1,
                states: {
                    select: {
                        fill: '#D0D0D8'
                    }
                }
            }
        },
        scrollbar: {
            trackBorderColor: '#C0C0C8'
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Apply the theme.
     */
    function apply() {
        // Load the fonts
        createElement('link', {
            href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);
        // Add the background image to the container
        addEvent(H.Chart, 'afterGetContainer', function () {
            // eslint-disable-next-line no-invalid-this
            this.container.style.background =
                'url(https://www.highcharts.com/samples/graphics/sand.png)';
        });
        // Apply the theme
        setOptions(SandSignikaTheme.options);
    }
    SandSignikaTheme.apply = apply;
})(SandSignikaTheme || (SandSignikaTheme = {}));
/* *
 *
 *  Default Export
 *
 * */
export default SandSignikaTheme;
