<?php

include "0Controller/SquidController.php";

$pokemons = $squid->getPokemonsOfUser(1);

echo "<script>window.pokemonsOfUser = " . json_encode($pokemons) . "</script>"

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="sprite_Pokemon/3.png" />
    <title>POKEMON</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <link rel="stylesheet" id='mapCSSLINK' href="">
</head>

<body>
    <div id="GameArea">
        <div id="perso">
            <div id="spritePerso"></div>
        </div>
        <section id="buildingDIV">
        </section>
    </div>
    <div id="pokemonTab">
        <div id="pokemonList">
            <div class="pokemonCase"></div>
            <div class="pokemonCase"></div>
            <div class="pokemonCase"></div>
            <div class="pokemonCase"></div>
            <div class="pokemonCase"></div>
            <div class="pokemonCase"></div>
        </div>
    </div>
</body>

</html>