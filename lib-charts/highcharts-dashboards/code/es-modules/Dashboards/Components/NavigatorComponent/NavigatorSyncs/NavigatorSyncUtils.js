/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
/* *
*
*  Namespace
*
* */
var NavigatorSyncUtils;
(function (NavigatorSyncUtils) {
    /* *
    *
    *  Utility Functions
    *
    * */
    /**
     * Adds or updates range options for a specific column.
     * @param ranges Array of range options (will be modified).
     * @param column Column name.
     * @param minValue Minimum value.
     * @param maxValue Maximum value.
     * @internal
     */
    function setRangeOptions(ranges, column, minValue, maxValue) {
        let changed = false;
        for (let i = 0, iEnd = ranges.length; i < iEnd; ++i) {
            if (ranges[i].column === column) {
                ranges[i].maxValue = maxValue;
                ranges[i].minValue = minValue;
                changed = true;
                break;
            }
        }
        if (!changed) {
            ranges.push({ column, maxValue, minValue });
        }
    }
    NavigatorSyncUtils.setRangeOptions = setRangeOptions;
    /**
     * Removes range options for a specific column.
     * @param ranges Array of range options (will be modified).
     * @param column Column name.
     * @internal
     */
    function unsetRangeOptions(ranges, column) {
        for (let i = 0, iEnd = ranges.length; i < iEnd; ++i) {
            if (ranges[i].column === column) {
                return ranges.splice(i, 1)[0];
            }
        }
    }
    NavigatorSyncUtils.unsetRangeOptions = unsetRangeOptions;
})(NavigatorSyncUtils || (NavigatorSyncUtils = {}));
/* *
 *
 *  Default Export
 *
 * */
export default NavigatorSyncUtils;
