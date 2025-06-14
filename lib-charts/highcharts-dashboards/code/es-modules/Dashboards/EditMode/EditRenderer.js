/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
import EditGlobals from './EditGlobals.js';
import U from '../../Core/Utilities.js';
const { merge, createElement, defined } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Function to create a context button.
 * @internal
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param editMode
 * EditMode instance.
 *
 * @returns
 * Context button element.
 */
function renderContextButton(parentNode, editMode) {
    const contextMenuOptions = editMode.options.contextMenu;
    let contextButton;
    if (contextMenuOptions) {
        contextButton = createElement('button', {
            className: EditGlobals.classNames.contextMenuBtn,
            onclick: function (event) {
                event.stopPropagation();
                editMode.onContextBtnClick();
            }
        }, {}, parentNode);
        // Add the icon if defined.
        if (contextMenuOptions.icon) {
            createElement('img', {
                src: contextMenuOptions.icon,
                className: EditGlobals.classNames.icon
            }, {}, contextButton);
        }
        // Add text next to the icon if defined.
        if (contextMenuOptions.text) {
            createElement('span', {
                className: EditGlobals.classNames.contextMenuBtnText,
                textContent: contextMenuOptions.text
            }, {}, contextButton);
        }
        contextButton.setAttribute('aria-label', editMode.lang.accessibility.contextMenu.button);
        contextButton.setAttribute('aria-expanded', 'false');
    }
    return contextButton;
}
/**
 * Creates the collapsable header element.
 * @internal
 *
 * @param parentElement
 * The HTMLElement to which the element should be rendered to.
 *
 * @param options
 * Nested header options.
 *
 * @returns the outer element and content in the collapsable div.
 */
function renderCollapseHeader(parentElement, options) {
    const { name, showToggle, onchange, isEnabled, isNested, isStandalone, lang } = options;
    const accordion = createElement('div', {
        className: EditGlobals.classNames[(isNested ? 'accordionNestedWrapper' : 'accordionContainer')] + ' ' +
            (isStandalone ?
                EditGlobals.classNames.accordionStandaloneWrapper : '') + ' ' + EditGlobals.classNames.collapsableContentHeader
    }, {}, parentElement);
    const header = createElement('div', {
        className: EditGlobals.classNames.accordionHeader
    }, {}, accordion);
    let headerBtn;
    if (!isStandalone || showToggle) {
        headerBtn = createElement(isStandalone && showToggle ? 'span' : 'button', {
            className: EditGlobals.classNames[isStandalone ?
                'accordionHeaderWrapper' : 'accordionHeaderBtn']
        }, {}, header);
    }
    createElement('span', {
        textContent: lang[name] || name
    }, {}, headerBtn);
    if (showToggle && header) {
        renderToggle(header, {
            enabledOnOffLabels: true,
            id: name,
            name: '',
            onchange: onchange,
            value: isEnabled || false,
            lang
        });
    }
    if (!isStandalone) {
        const headerIcon = createElement('span', {
            className: EditGlobals.classNames.accordionHeaderIcon + ' ' +
                EditGlobals.classNames.collapsedElement
        }, {}, headerBtn);
        headerBtn?.addEventListener('click', function () {
            content.classList.toggle(EditGlobals.classNames.hiddenElement);
            headerIcon?.classList.toggle(EditGlobals.classNames.collapsedElement);
        });
    }
    const content = createElement('div', {
        className: EditGlobals.classNames.accordionContent + ' ' +
            (isStandalone ?
                EditGlobals.classNames.standaloneElement :
                EditGlobals.classNames.hiddenElement)
    }, {}, accordion);
    return { outerElement: accordion, content: content };
}
/**
 * Function to create select element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param options
 * Select form field options.
 *
 * @returns
 * Select element
 */
function renderSelect(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const iconsURLPrefix = options.iconsURLPrefix || '';
    const customSelect = createElement('div', {
        className: EditGlobals.classNames.dropdown +
            ' ' +
            EditGlobals.classNames.collapsableContentHeader
    }, {}, parentElement);
    const btn = createElement('button', {
        className: EditGlobals.classNames.dropdownButton
    }, {}, customSelect);
    const btnContent = createElement('div', {
        className: EditGlobals.classNames.dropdownButtonContent
    }, {}, btn);
    const iconURL = (U.find(options.selectOptions, (item) => item.name === options.value) || {}).iconURL;
    let headerIcon;
    if (iconURL) {
        headerIcon = createElement('img', {
            src: iconsURLPrefix + iconURL,
            className: EditGlobals.classNames.icon
        }, {}, btnContent);
    }
    const placeholder = createElement('span', {
        textContent: options.value,
        id: options.id || ''
    }, {}, btnContent);
    const dropdownPointer = createElement('img', {
        className: EditGlobals.classNames.dropdownIcon +
            ' ' +
            EditGlobals.classNames.collapsedElement,
        src: iconsURLPrefix + 'dropdown-pointer.svg'
    }, {}, btn);
    const dropdown = createElement('ul', {
        className: EditGlobals.classNames.dropdownContent +
            ' ' +
            EditGlobals.classNames.hiddenElement
    }, {}, customSelect);
    btn.addEventListener('click', function () {
        dropdown.classList.toggle(EditGlobals.classNames.hiddenElement);
        dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
    });
    for (let i = 0, iEnd = options.selectOptions.length; i < iEnd; ++i) {
        renderSelectElement(merge(options.selectOptions[i] || {}, { iconsURLPrefix }), dropdown, placeholder, options.id, dropdownPointer, headerIcon, options.onchange);
    }
    return customSelect;
}
/**
 * @internal
 */
function renderSelectElement(option, dropdown, placeholder, id, dropdownPointer, headerIcon, callback) {
    const iconURL = option.iconsURLPrefix + option.iconURL;
    const selectOption = createElement('li', {}, {}, dropdown);
    const selectOptionBtn = createElement('button', { className: EditGlobals.classNames.customSelectButton }, {}, selectOption);
    if (option.iconURL) {
        createElement('img', {
            src: iconURL
        }, {}, selectOptionBtn);
    }
    createElement('span', { textContent: option.name || '' }, {}, selectOptionBtn);
    selectOptionBtn.addEventListener('click', function () {
        dropdown.classList.add(EditGlobals.classNames.hiddenElement);
        dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
        placeholder.textContent = option.name || '';
        if (headerIcon && option.iconURL) {
            headerIcon.src = iconURL;
        }
        if (callback) {
            return callback(option.name);
        }
    });
}
/**
 * Function to create toggle element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param options
 * Form field options.
 *
 * @returns
 * Toggle element.
 */
function renderToggle(parentElement, options) {
    if (!parentElement) {
        return;
    }
    const lang = options.lang, value = options.value, title = options.title || options.name, langKey = options.langKey;
    if (options.isNested) {
        const labeledToggleWrapper = createElement('div', {
            className: EditGlobals.classNames.labeledToggleWrapper
        }, {}, parentElement);
        parentElement = labeledToggleWrapper;
    }
    const toggleContainer = createElement('button', {
        className: EditGlobals.classNames.toggleContainer,
        type: 'button',
        role: 'switch',
        ariaChecked: false,
        ariaLabel: langKey ? lang.accessibility[langKey][options.name] : ''
    }, {}, parentElement);
    if (title) {
        renderText(options.isNested ? parentElement : toggleContainer, { title });
    }
    if (options.enabledOnOffLabels) {
        renderText(toggleContainer, {
            title: lang.off,
            className: EditGlobals.classNames.toggleLabels
        });
    }
    const toggle = createElement('label', {
        className: EditGlobals.classNames.toggleWrapper +
            ' ' + (options.className || '')
    }, {}, toggleContainer);
    const input = renderCheckbox(toggle, value), callbackFn = options.onchange;
    callbackFn && toggleContainer.addEventListener('click', (e) => {
        callbackFn(!input.checked);
        input.checked = !input.checked;
        toggleContainer.setAttribute('aria-checked', input.checked);
        e.stopPropagation();
    });
    const slider = createElement('span', {
        className: EditGlobals.classNames.toggleSlider
    }, {}, toggle);
    callbackFn && slider.addEventListener('click', (e) => {
        e.preventDefault();
    });
    if (options.enabledOnOffLabels) {
        renderText(toggleContainer, {
            title: lang.on,
            className: EditGlobals.classNames.toggleLabels
        });
    }
    return toggleContainer;
}
/**
 * Function to create text element.
 *
 * @param parentElement
 * The element to which the new element should be appended
 *
 * @param text
 * Text to be displayed
 *
 * @param callback
 * Callback function to be fired on the click
 *
 * @returns text Element
 */
function renderText(parentElement, options) {
    let textElem;
    const { title: text, className, isLabel } = options;
    if (parentElement) {
        const labelFor = isLabel ? { htmlFor: text } : {};
        textElem = createElement(isLabel ? 'label' : 'div', {
            className: EditGlobals.classNames.labelText + ' ' + (className || ''),
            textContent: text,
            ...labelFor
        }, {}, parentElement);
    }
    return textElem;
}
/**
 * Function to create Icon element.
 *
 * @param parentElement
 * The element to which the new element should be appended.
 *
 * @param icon
 * Icon URL
 *
 * @param callback
 * Callback function
 *
 * @returns
 * Icon Element
 */
function renderIcon(parentElement, options) {
    const { icon, callback } = options;
    if (!parentElement) {
        return;
    }
    const iconElem = createElement('div', {
        onclick: callback,
        className: options.className || ''
    }, {}, parentElement);
    iconElem.style['background-image'] = 'url(' + icon + ')';
    const mousedown = options.mousedown;
    const click = options.click;
    if (mousedown) {
        iconElem.onmousedown = function () {
            mousedown.apply(this, arguments);
        };
    }
    if (click) {
        iconElem.addEventListener('click', function () {
            click.apply(this, arguments);
        });
    }
    return iconElem;
}
/**
 * Function to create input element.
 *
 * @param parentElement
 * the element to which the new element should be appended
 *
 * @param options
 * Form field options
 *
 * @returns
 * Input Element
 */
function renderInput(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const input = createElement('input', {
        type: 'text',
        onclick: options.callback,
        id: options.id || '',
        name: options.name || '',
        value: ((defined(options.value) &&
            options.value.toString().replace(/\"/g, '')) || '')
    }, {}, parentElement);
    const onchange = options.onchange;
    if (onchange) {
        input.addEventListener('change', function (e) {
            onchange(e.target.value);
        });
    }
    return input;
}
/**
 * Function to create textarea element.
 *
 * @param parentElement
 * The element to which the new element should be appended
 *
 * @param options
 * Form field options
 *
 * @returns
 * textarea Element
 */
function renderTextarea(parentElement, options) {
    if (!parentElement) {
        return;
    }
    if (options.name) {
        renderText(parentElement, { title: options.name, isLabel: true });
    }
    const textarea = createElement('textarea', {
        id: options.id,
        name: options.name,
        value: options.value || ''
    }, {}, parentElement);
    const onchange = options.onchange;
    if (onchange) {
        textarea.addEventListener('change', function (e) {
            onchange(e.target.value);
        });
    }
    return textarea;
}
/**
 * Function to render the input of type checkbox.
 *
 * @param parentElement
 * An element to which render the checkbox to
 *
 * @param checked
 * Whether the checkbox should be checked or not.
 *
 * @returns
 * The checkbox element
 */
function renderCheckbox(parentElement, checked) {
    let input;
    if (parentElement) {
        input = createElement('input', {
            type: 'checkbox',
            checked: !!checked
        }, {}, parentElement);
    }
    return input;
}
/**
 * Function to create button element.
 *
 * @param parentElement
 * the element to which the new element should be appended
 *
 * @param options
 * Button field options
 *
 * @returns
 * Button Element
 */
function renderButton(parentElement, options) {
    if (!parentElement) {
        return;
    }
    const button = createElement('button', {
        className: (EditGlobals.classNames.button + ' ' +
            (options.className || '')),
        onclick: options.callback,
        textContent: options.text
    }, options.style || {}, parentElement);
    if (options.icon) {
        button.style['background-image'] =
            'url(' + options.icon + ')';
    }
    return button;
}
/**
 * Get the renderer function based on the type of the element to render.
 *
 * @param type
 * Type of the element to render
 *
 * @returns
 * function to render a specific element
 */
function getRendererFunction(type) {
    return {
        select: renderSelect,
        toggle: renderToggle,
        text: renderText,
        collapse: renderCollapseHeader,
        icon: renderIcon,
        contextButton: renderContextButton,
        input: renderInput,
        textarea: renderTextarea,
        checkbox: renderCheckbox,
        button: renderButton
    }[type];
}
const EditRenderer = {
    renderSelect,
    renderToggle,
    renderText,
    renderCollapseHeader,
    renderIcon,
    renderContextButton,
    renderInput,
    renderTextarea,
    renderCheckbox,
    renderButton,
    getRendererFunction
};
export default EditRenderer;
