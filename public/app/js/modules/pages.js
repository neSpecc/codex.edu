/**
 * Page significant methods
 */
module.exports = (function () {

    var currentItemClicked = null;

    /**
     * Opens page-writing form
     */
    var openWriting = function () {

        currentItemClicked = this;
        var targetId =currentItemClicked.dataset.id;

        document.location = '/p/writing?id=' + targetId;

    };

    /**
     * Opens page-writing form
     */
    var remove = function () {

        currentItemClicked = this;
        var targetId    =currentItemClicked.dataset.id;

        if (!window.confirm('Подтвердите удаление страницы')) {

            return;

        }

        codex.ajax.call({
            url : '/p/' + targetId + '/delete',
            success: ajaxResponses.delete
        });

    };

    var newChild = function () {

        currentItemClicked = this;
        var targetId =currentItemClicked.dataset.id;

        document.location = '/p/writing?parent=' + targetId;

    };

    var addToMenu = function () {

        currentItemClicked = this;
        var targetId =currentItemClicked.dataset.id;

        codex.ajax.call({
            url : '/p/' + targetId + '/promote?list=menu',
            success: ajaxResponses.promote
        });

    };

    var addToNews = function () {

        currentItemClicked = this;
        var targetId =currentItemClicked.dataset.id;

        codex.ajax.call({
            url : '/p/' + targetId + '/promote?list=news',
            success: ajaxResponses.promote
        });

    };

    var ajaxResponses = {

        getResponse: function (response) {

            try {

                response = JSON.parse(response);

            } catch(e) {

                return {
                    success: 0,
                    message: 'Произошла ошибка, попробуйте позже'
                };

            }

            return response;

        },

        delete: function (response) {

            response = ajaxResponses.getResponse(response);

            if (response.success) {

                window.location.replace(response.redirect);
                return;

            }

            codex.alerts.show(response.message);

        },

        promote: function (response) {

            response = ajaxResponses.getResponse(response);

            if (response.success) {

                if (response.menu) {

                    console.log(response.menu);
                    ajaxResponses.replaceMenu(response.menu);

                }

                /**
                 * TODO: сделать замену текста кнопки
                 **/

                codex.alerts.show(response.message);

                return;

            }

            codex.alerts.show(response.message);

        },

        replaceMenu: function (menu) {

            var oldMenu = document.getElementById('menu'),
                newMenu = codex.core.parseHTML(menu)[0];

            codex.core.replace(oldMenu, newMenu);

        }

    };



    return {
        openWriting: openWriting,
        newChild: newChild,
        addToMenu: addToMenu,
        addToNews: addToNews,
        remove : remove
    };

}());