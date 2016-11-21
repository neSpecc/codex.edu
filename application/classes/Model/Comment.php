<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Comment extends Model_preDispatch
{
    public $id;
    public $author;
    public $text;
    public $page_id;
    public $root_id;
    public $parent_id;
    public $parent_comment;
    public $dt_create;
    public $is_removed;

    public function __construct($id = 0)
    {
        if ($id) return self::get($id);

        return false;
    }

    /**
     * Возвращает комментарий с указанным id из БД.
     * Иначе возвращает пустой комментарий с id = 0.
     */
    public static function get($id = 0)
    {
        $comment_row = Dao_Comments::select()
            ->where('id', '=', $id)
            ->limit(1)
            ->cached(Date::MINUTE * 5, 'comment:' . $id)
            ->execute();

        $model = new Model_Comment();

        return $model->fillByRow($comment_row);
    }

    /**
     * Добавляет комментарий в БД.
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Comments::insert()
            ->set('user_id',   $this->author['id'])
            ->set('text',      $this->text)
            ->set('page_id',   $this->page_id)
            ->set('root_id',   $this->root_id)
            ->set('parent_id', $this->parent_comment['id'])
            ->clearcache('comments_page:' . $this->page_id)
            ->execute();

        if ($this->root_id == 0) {

            Dao_Comments::update()
                ->where('id', '=', $idAndRowAffected)
                ->set('root_id', $idAndRowAffected)
                ->execute();
        }

        return $idAndRowAffected;
    }

    public static function getCommentsByPageId($page_id)
    {
        $comment_rows = Dao_Comments::select()
            ->where('page_id', '=', $page_id)
            ->where('is_removed', '=', 0)
            ->order_by('root_id', 'ASC')
            ->cached(Date::MINUTE * 5, 'comments_page:' . $page_id)
            ->execute();

        return self::rowsToModels($comment_rows, true);
    }

    /**
     * Возвращает модель родительского комментария из массива к конкретному комментарию
     *
     * @var $all_comment массив комментариев, где проводится поиск
     * @var $comment     комментарий, для которого необходимо найти родителя
     */
    private static function getParentForCommentFromCommentsArray($all_comment, $comment)
    {
        $parent = array();

        foreach ($all_comment as $parent_row) {

            if ($comment['parent_id'] == $parent_row['id']) {

                $parent = new Model_Comment;

                return $parent->fillByRow($parent_row);
            }
        }

        return false;
    }

    /**
     * Заполняет объект строкой из БД.
     */
    private function fillByRow($comment_row)
    {
        if (!empty($comment_row['id'])) {

            $this->id         = $comment_row['id'];
            $this->author     = new Model_User($comment_row['user_id']);
            $this->text       = $comment_row['text'];
            $this->page_id    = $comment_row['page_id'];
            $this->root_id    = $comment_row['root_id'];
            $this->parent_id  = $comment_row['parent_id'];
            $this->dt_create  = $comment_row['dt_create'];
            $this->is_removed = $comment_row['is_removed'];
        }

        return $this;
    }

    /**
     * Возвращает массив моделей комментариев
     *
     * @var $comment_rows
     * @var $add_parent (boolean) добавлять ли в модели информацию о родительских комментариях
     */
    private static function rowsToModels($comment_rows, $add_parent = false)
    {
        $comments = array();

        if ($comment_rows) {

            foreach ($comment_rows as $comment_row) {

                $comment = new Model_Comment();

                $comment->fillByRow($comment_row);

                /* добавление информации о родительском комментарии */
                if ($add_parent) {

                    $parent = array();
                    $parent = self::getParentForCommentFromCommentsArray($comment_rows, $comment_row);
                    $comment->parent_comment = $parent;
                }

                array_push($comments, $comment);
            }
        }

        return $comments;
    }

    /**
     * Получаем массив моделей подкомментариев
     */
    public function getSubcomments()
    {
        $subcomments = Dao_Comments::select()
            ->where('parent_id', '=', $this->id)
            ->where('is_removed', '=', 0)
            ->order_by('id', 'ASC')
            ->execute();

        return self::rowsToModels($subcomments);
    }

    /**
     * Удаляет комментарий и все его подкомментарии
     */
    public function delete($with_subcomments = false)
    {
        /* удалить сам комментарий */
        Dao_Comments::update()
            ->where('id', '=', $this->id)
            ->set('is_removed', 1)
            ->clearcache('comments_page:' . $this->page_id)
            ->execute();

        /* удалить подкомментарии */
        if ($with_subcomments) {

            $subcomments = $this->getSubcomments();

            foreach ($subcomments as $subcomment) {

                $subcomment->delete(true);
            }
        }
    }
}
