<?php

include'0Model/SquidModel.php';

class controller{
    private $model;
    public function __construct(){
        $this->model = new Model();
    }
    public function getPokemonsOfUser($id){
        return $this->model->getPokemonsOfUser($id);
    }
}



$squid = new controller();