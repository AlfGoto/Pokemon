<?php


class Model{
    private $pdo;
    public function __construct(){
        $this->pdo = new PDO('mysql:host=localhost;dbname=pokemon', 'alfred', 'code');
    }
    public function getPokemonsOfUser($id){
        return true;
    }
}