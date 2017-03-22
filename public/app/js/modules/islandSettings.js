/**
* Dropdown menu module
* @author: @ndawn
*/

module.exports = (function () {

    /**
     * Menu block cache
     * @type {Element|null}
     */
    var menuHolder = null;

    /**
     * Activated menus
     * @type {Array}
     */
    var activated = [];

    /**
     * CSS class names
     * @type {Object}
     */
    var CSS = {
        menu   : 'island-settings__menu',
        item   : 'island-settings__item',
        showed : 'island-settings__menu--showed'

    };

    /**
     * Wait to hide menu after mouseout
     * @type {TimeoutID}
     */
    var blurTimeout = null;

    /**
     * Initialization
     * @param  {Object} settings  - initial settings
     */
    var init = function (settings) {

        var menuTogglers = document.querySelectorAll(settings.selector);

        if (!menuTogglers.length) {

            codex.core.log('Elements %o was not found', 'islandSettings', 'log', settings.selector);
            return;

        }

        /**
         * Save initial object
         */
        activated.push(settings);

        for (var i = menuTogglers.length - 1; i >= 0; i--) {

            /** Save initial selector to specify menu type */
            menuTogglers[i].dataset.selector = settings.selector;

            /** Add event listener */
            menuTogglers[i].addEventListener('mouseover', menuTogglerHovered, false);
            menuTogglers[i].addEventListener('mouseout',  menuTogglerBlurred, false);

        }

    };

    /**
     * Return menu parametres by initial selector
     * @param {string}  initialSelector  - selector passed in init() method
     * @return {Object}
     */
    var getMenuParams = function (initialSelector) {

        return activated.filter(compareSelector, initialSelector).pop();

    };

    /**
     * Find settings object by selector
     *
     * @param  {Object}  obj    passed object with 'selector' key
     * @this   {String}         selector to compare with
     *
     * @return {Boolean}        true if passed selector same as looking for
     */
    var compareSelector = function (obj) {

        return obj.selector == this;

    };

    /**
     * @private
     *
     * Island circled-icon mouseover handler
     *
     * @param {Event} event     mouseover-event
     */
    var menuTogglerHovered = function () {

        var menuToggler = this,
            menuParams;

        /** Clear blur waiting */
        if ( blurTimeout ) {

            window.clearTimeout(blurTimeout);

        }

        if (!menuHolder) {

            menuHolder = createMenu();

        }

        /** Preven mouseover handling multiple times */
        if ( menuHolder.dataset.opened == 'true' ) {

            return;

        }

        menuHolder.dataset.opened = true;

        /**
         * Get current menu params
         * @type {Object}
         */
        menuParams = getMenuParams(menuToggler.dataset.selector);
        console.assert(menuParams.items, 'Menu items missed');

        fillMenu(menuParams.items, menuToggler);

        show(this);

    };

    /**
     * Cursor moved out from toggler
     * Need to hide menu
     */
    var menuTogglerBlurred = function () {

        if ( blurTimeout ) {

            window.clearTimeout(blurTimeout);

        }

        blurTimeout = window.setTimeout(function () {

            hide();

        }, 200);

    };

    /**
     * Fills menu with items
     * @param  {Array}   items     list of menu items
     * @param  {Element} toggler   islan menu icon with data-attributes
     */
    var fillMenu = function (items, toggler) {

        var i,
            itemData,
            itemElement;

        menuHolder.innerHTML = '';

        for (i = 0; !!(itemData = items[i]); i++) {

            itemElement = createItem(itemData);

            /** Pass all parametres stored in icon's dataset to the item's dataset */
            for (var attr in toggler.dataset) {

                itemElement.dataset[attr] = toggler.dataset[attr];

            }

            menuHolder.appendChild(itemElement);

        }

    };

    /**
    * @private
    * Creates an option block
    * @param {Object}   item          - menu item data
    * @param {String}   item.title    - title
    * @param {Function} item.handler  - click handler
    *
    * @return {Element} menu item with click handler
    */
    var createItem = function ( item ) {

        var itemEl = document.createElement('LI');

        itemEl.classList.add(CSS.item);

        console.assert(item.title, 'islandSettings: item title is missed');
        console.assert(typeof item.handler == 'function', 'islandSettings: item handler is not a function');

        itemEl.textContent = item.title;
        itemEl.addEventListener('click', item.handler);

        return itemEl;

    };

    /**
    * @private
    * Creates the dropdown menu
    */
    var createMenu = function () {

        var block = document.createElement('UL');

        block.classList.add(CSS.menu);

        return block;

    };

    /**
    * Hides the menu
    */
    var hide = function () {

        if (!menuHolder) {

            return;

        }

        menuHolder.remove();
        menuHolder = null;

    };

    /**
    * Appends a menu to the container
    * @param {Element} container - where to append menu
    */
    var show = function (container) {

        container.appendChild(menuHolder);

        /** Timeout need to fire CSS fadein-animation after appending */
        window.setTimeout(function () {

            menuHolder.classList.add(CSS.showed);

        }, 50);

    };

    return {
        init: init
    };

})();
