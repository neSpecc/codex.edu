<?php defined('SYSPATH') or die('No direct script access.');

class Model_Settings extends Model_preDispatch
{
    /**
     * Settings для сохранение глобальных переменных с настройками сайта.
     *
     * @var $name  имя переменной
     * @var $value значение переменной
     * @var $label метка (для объединения переменных в группы)
     */
    public $name;
    public $value;
    public $label;

    const BRANDING_KEY = 'branding';

    public function __construct($name = null)
    {
        if (!$name) return;

        self::get($name);
    }

    public static function getAll()
    {
        $parameterRow = Dao_Settings::select()
            ->cached(Date::MINUTE * 30, 'settings')
            ->execute();

        $siteSettings = [];

        foreach ($parameterRow as $item => $info) {
            $key    = Arr::get($info, 'name');
            $value  = Arr::get($info, 'value');

            if (!$key && !$value) continue;

            $siteSettings[$key] = $value;
        }

        return $siteSettings;

    }

    private function get($name = null)
    {
        $parameterRow = Dao_Settings::select()
            ->where('name', '=', $name)
            ->limit(1)
            ->cached(Date::MINUTE * 30, 'settings:' . $name)
            ->execute();

        return self::fillByRow($parameterRow);
    }

    private function fillByRow($parameterRow)
    {
        if (!empty($parameterRow)) {

            foreach ($parameterRow as $field => $value) {

                if (property_exists($this, $field)) {

                    $this->$field = $value;
                }
            }
        }

        return $this;
    }

    public function insert()
    {
        $parameterRow = Dao_Settings::insert()
            ->set('name',  $this->name)
            ->set('value', $this->value)
            ->set('label', $this->label)
            ->execute();

        if ($parameterRow) return $this;

        return false;
    }

    public function update()
    {
        $parameterRow = Dao_Settings::update()
            ->where('name', '=', $this->name)
            ->set('value', $this->value)
            ->set('label', $this->label)
            ->clearcache('settings:' . $this->name)
            ->execute();

        if ($parameterRow) return $this;

        return false;
    }

    public function delete()
    {
        return Dao_Settings::delete()->where('name', '=', $this->name)->execute();
    }


    /**
     * Returns vars array by label
     *
     * @return array[key] = value
     */
    public static function getListByLabel($label = null)
    {
        $parameterRows = Dao_Settings::select('name');

        if ($label) {

            $parameterRows->where('label', '=', $label);
        }

        $parameterRows = $parameterRows->execute();

        $paramList = array();

        if ($parameterRows) {

            foreach ($parameterRows as $row) {

                $param = new Model_Settings($row['name']);

                $paramList[$param->name] = $param->value;
            }
        }

        return $paramList;
    }

    public function newBranding($filename)
    {
        $branding = new Model_Settings(self::BRANDING_KEY);
        $branding->value = $filename;

        if ($branding->name) {

            $branding->update();

        } else {

            $branding->name = self::BRANDING_KEY;
            $branding->insert();

        }

        return $branding->value;
    }
}
