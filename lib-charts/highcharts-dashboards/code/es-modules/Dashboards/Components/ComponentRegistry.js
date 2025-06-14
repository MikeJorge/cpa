/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Namespace
 *
 * */
var ComponentRegistry;
(function (ComponentRegistry) {
    /* *
     *
     *  Constants
     *
     * */
    /**
     *
     * Record of component classes
     * @todo
     *
     */
    ComponentRegistry.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method used to register new component classes.
     *
     * @param {string} key
     * Registry key of the component class.
     *
     * @param {ComponentType} DataConnectorClass
     * Component class (aka class constructor) to register.
     */
    function registerComponent(key, ComponentClass) {
        return (!!key &&
            !ComponentRegistry.types[key] &&
            !!(ComponentRegistry.types[key] = ComponentClass));
    }
    ComponentRegistry.registerComponent = registerComponent;
})(ComponentRegistry || (ComponentRegistry = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ComponentRegistry;
