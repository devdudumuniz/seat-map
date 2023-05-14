
//--------------- PASSO A PASSO -----------------------

// Função que realiza a requisição AJAX
      // percorre todas as cadeiras

function consultaCadeiras() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const idsCadastrados = JSON.parse(this.responseText);
      // console.log(idsCadastrados); Adiciona este console.log para verificar a resposta

      document.querySelectorAll(".cadeira").forEach((cadeira) => {
        const id = cadeira.id;

        // verifica se a cadeira está cadastrada
        if (idsCadastrados.includes(id)) {
          cadeira.classList.add("ocupada");
          cadeira.classList.remove("livre");
          cadeira.onclick = null;
          cadeira.querySelector('p').textContent = '';
          cadeira.querySelector('p').classList.add('fa', 'fa-ban');          
        }
      });
    }
  };
  xhttp.open(
    "GET",
    "../../assets/libraries/onibus/valida/consultaCadeiras.php",
    true
  );
  xhttp.send();
}

consultaCadeiras();




//--------------- PASSO A PASSO -----------------------
// variável para armazenar os IDs das cadeiras selecionadas
// verifica se a cadeira está ocupada
// verifica se o ID da cadeira já foi selecionado antes
// adiciona o ID da cadeira às cadeiras selecionadas
// cria a nova linha com o valor do ID como valor do input
// adiciona a nova linha à tabela
// atribui um evento de clique ao botão de excluir para remover a linha correspondente da tabela
// função para alterar as classes do assento dependendo do seu estado atual (selecionado ou não)
// variável para armazenar os IDs das cadeiras selecionadas
// variável para armazenar os IDs das cadeiras selecionadas
// variável para armazenar os IDs das cadeiras selecionadas
// função para alterar as classes do assento dependendo do seu estado atual (selecionado ou não)
function toggleAssentoClasses(idAssento) {
  var assento = document.getElementById(idAssento);
  assento.classList.toggle('livre');
  assento.classList.toggle('liberado');
}

// variável para armazenar os IDs das cadeiras selecionadas
var cadeirasSelecionadas = [];

document.querySelectorAll(".cadeira").forEach(cadeira => {
  cadeira.addEventListener("click", function() {

    // verifica se a cadeira está ocupada
    if (this.classList.contains("ocupada")) {
      alert("Essa cadeira já está ocupada!");
      return;
    }

    // verifica se o limite de cadeiras selecionadas foi atingido
    if (cadeirasSelecionadas.length >= 6) {
      alert("Limite de assentos atingido (6)");
      return;
    }

    var idCadeira = this.id;

    // verifica se o ID da cadeira já foi selecionado antes
    if (cadeirasSelecionadas.includes(idCadeira)) {
      alert("Essa cadeira já foi selecionada!");
      return;
    }

    // adiciona o ID da cadeira às cadeiras selecionadas
    cadeirasSelecionadas.push(idCadeira);

    // cria a nova linha com o valor do ID como valor do input
    var novaLinha = "<tr class='border-bottom'><th scope='row'>" + cadeirasSelecionadas.length + "</th><td class='d-flex justify-content-center'><div class='rounded color-assento d-flex justify-content-center'><i class='text-white m-auto fas fa-check'></i></div></td><td>Assento <b>" + idCadeira + "</b></td><td><input name='cadeirasSelecionadas[]' class='cadeiraSelecionada' type='text' value='" + idCadeira + "'></td><td><div class='rounded excluir-assento d-flex justify-content-center remover-linha'><i class='text-white m-auto fas fa-times'></i></div></td></tr>";


    // adiciona a nova linha à tabela
    document.querySelector("tbody.table-assentos").innerHTML += novaLinha;

    // atribui um evento de clique ao botão de excluir para remover a linha correspondente da tabela
    document.querySelectorAll(".remover-linha").forEach(botao => {
      botao.addEventListener("click", function() {
        var linha = this.closest("tr");
        var idAssento = linha.querySelector(".cadeiraSelecionada").value;
        cadeirasSelecionadas.splice(cadeirasSelecionadas.indexOf(idAssento), 1);
        linha.remove();
        toggleAssentoClasses(idAssento);
      });
    });

    // alterna a classe das cadeiras
    this.classList.toggle('livre');
    this.classList.toggle('liberado');
    
    document.querySelector('.reservar').classList.remove('esconder');
  });
});
