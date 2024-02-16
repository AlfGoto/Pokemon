<?php


class Model
{
    private $pdo;
    public function __construct()
    {
        $this->pdo = new PDO('mysql:host=localhost;dbname=pokemon', 'alfred', 'code');
    }
    public function getPokemonsOfUser($id)
    {
        $query = $this->pdo->prepare('SELECT idPok1, idPok2, idPok3, idPok4, idPok5, idPok6 FROM user WHERE id LIKE :id');
        $query->bindValue(':id', $id);
        $query->execute();
        return $query->fetchAll()[0];
    }
    public function getPokemonWithId($id){
        $query = $this->pdo->prepare('SELECT * FROM Existing_Pokemon WHERE id LIKE :id');
        $query->bindValue(':id', $id);
        $query->execute();
        return $query->fetchAll();
    }
    public function healPokemonWithId($id){
        $query = $this->pdo->prepare('UPDATE Existing_Pokemon SET hp=maxhp WHERE id LIKE :id');
        $query->bindValue(':id', $id);
        $query->execute();
    }
}
