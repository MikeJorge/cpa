/* *
 *
 *  (c) 2019-2025 Highsoft AS
 *
 *  Boost module: stripped-down renderer for higher performance
 *
 *  License: highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import Boostables from './Boostables.js';
/* *
 *
 *  Constants
 *
 * */
// These are the series we allow boosting for.
var BoostableMap = {};
Boostables.forEach(function (item) {
    BoostableMap[item] = true;
});
/* *
 *
 *  Default Export
 *
 * */
export default BoostableMap;
