/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import DataTableHelper from './DataTableHelper.js';
import GoogleSheetsConnector from '../../Data/Connectors/GoogleSheetsConnector.js';
import Serializable from '../Serializable.js';
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts the given JSON to a class instance.
 *
 * @param {GoogleSheetsConnectorHelper.JSON} json
 * JSON to deserialize as a class instance or object.
 *
 * @return {GoogleSheetsConnector}
 * Returns the class instance or object, or throws an exception.
 */
function fromJSON(json) {
    return new GoogleSheetsConnector(json.options || { googleAPIKey: '', googleSpreadsheetKey: '' });
}
/**
 * Validates the given class instance for JSON support.
 *
 * @param {Globals.AnyRecord} obj
 * Class instance or object to validate.
 *
 * @return {boolean}
 * Returns true, if the function set can convert the given object, otherwise
 * false.
 */
function jsonSupportFor(obj) {
    return obj instanceof GoogleSheetsConnector;
}
/**
 * Converts the given class instance to JSON.
 *
 * @param {GoogleSheetsConnector} obj
 * Class instance or object to serialize as JSON.
 *
 * @return {GoogleSheetsConnectorHelper.JSON}
 * Returns the JSON of the class instance or object.
 */
function toJSON(obj) {
    const options = merge(obj.options);
    options.dataTable = DataTableHelper.toJSON(obj.table);
    return {
        $class: 'Data.GoogleSheetsConnector',
        options
    };
}
/* *
 *
 *  Registry
 *
 * */
const GoogleSheetsConnectorHelper = {
    $class: 'Data.GoogleSheetsConnector',
    fromJSON,
    jsonSupportFor,
    toJSON
};
Serializable.registerHelper(GoogleSheetsConnectorHelper);
/* *
 *
 *  Default Export
 *
 * */
export default GoogleSheetsConnectorHelper;
