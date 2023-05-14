<?php
include_once "../../../../controller/config/database.php";

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $id_usua = 1;
    $cadeiras = implode(',', $_POST['cadeirasSelecionadas']);
    $cadeiras_array = explode(',', $cadeiras);

    // Verifica se as cadeiras selecionadas foram enviadas corretamente
    if (!isset($cadeiras_array) || empty($cadeiras_array)) {
        echo "Erro: nenhuma cadeira selecionada";
        exit();
    }

    // Verifica se todas as cadeiras são números inteiros
    foreach ($cadeiras_array as $cadeira) {
        if (!is_numeric($cadeira) || !ctype_digit($cadeira)) {
            echo "Erro: cadeira inválida";
            exit();
        }
    }

    // Converte o array de cadeiras em uma string para utilizar na query
    $cadeirasString = implode(",", $cadeiras_array);

    // Verifica se as cadeiras já estão cadastradas na tabela
    $sql = "SELECT id_cadeira, COUNT(*) AS total FROM assentos WHERE id_cadeira IN ($cadeirasString) GROUP BY id_cadeira";

    $result = $conexao->query($sql);

    if ($result) {
        $cadeirasCadastradas = [];
        while ($row = $result->fetch_assoc()) {
            $cadeirasCadastradas[$row["id_cadeira"]] = $row["total"];
        }

        $cadeirasNaoCadastradas = [];
        foreach ($cadeiras_array as $cadeira) {
            if (!isset($cadeirasCadastradas[$cadeira])) {
                $cadeirasNaoCadastradas[] = $cadeira;
            }
        }

        if (count($cadeirasNaoCadastradas) == 0) {
            // Todas as cadeiras já estão cadastradas na tabela
            echo "Erro: uma ou mais cadeiras já estão cadastradas";
        } else {
            // Insere as cadeiras na tabela
            $stmt = $conexao->prepare("INSERT INTO assentos (id_usua, id_cadeira) VALUES (?, ?)");

            $cadeirasUnicas = array_unique($cadeirasNaoCadastradas);

            foreach ($cadeirasUnicas as $cadeira) {
                $stmt->bind_param("ii", $id_usua, $cadeira);
                $stmt->execute();
            }

            // Verifica se as cadeiras foram inseridas com sucesso
            if ($stmt->affected_rows > 0) {
                header("location: ../../../../view/public/blog-single.php?v=true");
                echo "Cadeiras inseridas com sucesso";
            } else {
                echo "Erro ao inserir cadeiras";
            }

            // Fecha a conexão
            $stmt->close();
        }
    } else {
        echo "Erro ao executar a query: " . $conexao->error;
    }

    // Fecha a conexão
    $conexao->close();
}
