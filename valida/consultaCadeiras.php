<?php
include_once "../../../../controller/config/database.php";

// Faz a consulta no banco de dados para recuperar todos os IDs de cadeiras cadastrados
$query = "SELECT id_cadeira FROM assentos";
$resultado = mysqli_query($conexao, $query);

// Cria uma lista com todos os IDs de cadeiras cadastrados
$idsCadastrados = array();
while ($row = mysqli_fetch_assoc($resultado)) {
  $idsCadastrados[] = $row["id_cadeira"];
}

// Retorna a lista de IDs de cadeiras cadastrados como JSON
echo json_encode($idsCadastrados);
?>
