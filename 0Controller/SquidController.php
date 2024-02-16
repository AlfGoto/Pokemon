<?php

$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/0Model/SquidModel.php";
include $path;

class controller
{
    private $model;
    public function __construct()
    {
        $this->model = new Model();
    }
    public function getPokemonsOfUser($id)
    {
        return $this->model->getPokemonsOfUser($id);
    }
    public function getPokemonWithId($id)
    {
        return json_encode($this->model->getPokemonWithId($id));
    }
    public function healPokemonWithId($id)
    {
        $this->model->healPokemonWithId($id);
    }
}



$squid = new controller();
