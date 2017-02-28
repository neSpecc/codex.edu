<!--
<form action="/p/<?= $page->id ?>/<?= $page->uri ?>/add-comment" id="comment_form" method="POST">

    <img class="comment-form__photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>">

    <?= Form::hidden('csrf', Security::token()); ?>
    <input class="comment-form__submit-button" id="add_comment_button" type="submit" value="Оправить" />

    <div class="constrain">
        <textarea class="comment-form__text" required id="add_comment_textarea" name="comment_text" rows="1" placeholder="Ваш комментарий..."></textarea>
    </div>

    <input type="hidden" name="parent_id" value="<?= isset($parent_id) ? $parent_id : '0' ?>" id="parent_id"/>
    <input type="hidden" name="root_id" value="<?= isset($root_id) ? $root_id : '0' ?>" id="root_id"/>

    <? /*
    <span class="add_answer_to" id="add_answer_to"></span>
    <span class="cancel_answer hide" id="cancel_answer" name="cancel_answer"><i class="icon-cancel"></i></span>
    */ ?>

</form>
-->
<?
    $parent_id = isset($parent_id) ? $parent_id : '0';
    $root_id = isset($root_id) ? $root_id : '0';
?>

<img class="comment-form__photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>">

<div class="constrain">
    <textarea class="comment-form__text" data-parentId="<?= $parent_id ?>" data-rootId="<?= $root_id ?>"
    data-sendCommentAction="/p/<?= $page->id ?>/<?= $page->uri ?>/add-comment" required rows="1" placeholder="Ваш комментарий..."></textarea>
</div>
