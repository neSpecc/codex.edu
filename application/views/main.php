<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="language" content="<?= I18n::$lang ?>">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:site_name" content="<?= $GLOBALS['SITE_NAME'] ?>" />

    <title><?= $title ? $title : $GLOBALS['SITE_NAME'] . ': ' . $GLOBALS['SITE_SLOGAN'] ?></title>

    <base href="/" />

    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700&subset=cyrillic" rel="stylesheet">


    <link rel="stylesheet" type="text/css" media="all" href="/public/build/bundle.css?v=<?= filemtime('public/build/bundle.css'); ?>">
    <link rel="icon" type="image/png" href="/favicon.png">

    <script src="/public/build/bundle.js?v=<?= filemtime('public/build/bundle.js'); ?>"></script>

</head>
<body>

    <div class="branding" id="brandingSection" style="background: #202840">

        <div class="branding-content center-col">

            <a id="changeBrandingButton" class="fl_r branding-content__change-button">
                <i class="icon-camera"></i>
                Изменить обложку
            </a>

        </div>

    </div>

    <div class="center-col">

        <div class="grid-cols-wrapper">

            <? /* Left */ ?>
            <div class="grid-col grid-col--left">

                <?= View::factory('templates/components/aside')->render(); ?>

            </div>

            <? /* Main block for page */ ?>
            <div class="grid-content">
                <?= $content ?>
            </div>

        </div>

    </div>

    <? /* Scripts */ ?>

    <script src="/public/extensions/codex.special/codex-special.v.1.0.2.min.js?v=2"></script>

    <script>

        window.csrf = '<?= Security::token(); ?>';

        codex.docReady(function() {

            var changeBrandingButton = document.getElementById('changeBrandingButton'),
                brandingSection = document.getElementById('brandingSection');

            changeBrandingButton.addEventListener('click', function() {

                codex.transport.init({
                    url : '/file/transport/',
                    accept : 'image/*',
                    beforeSend : function() {


                    },
                    success : function(result) {

                        var data = JSON.parse(result);
                        console.log(data);

                        if ( data.success ) {


                        }

                    },
                    error : function() {

                        brandingCover.src = '';

                    }
                })

            });

        });

    </script>

    <? /* end Scripts */ ?>


    <? if ( Kohana::$environment === Kohana::PRODUCTION ): ?>

        <!-- Yandex.Metrika counter -->

        <!-- /Yandex.Metrika counter -->

    <? endif; ?>

</body>
</html>
