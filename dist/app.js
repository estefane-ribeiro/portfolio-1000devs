// Menu Mobile
const btnMobile = document.querySelector(".mobile");
const header = document.querySelector("#header");
function handleClickBtnMobile() {
    if (header?.classList.contains("mobile") && btnMobile) {
        btnMobile.classList.remove("active");
        btnMobile.textContent = "☰";
        header?.classList.remove("mobile");
        header?.classList.add("container");
        return;
    }
    else {
        if (btnMobile) {
            btnMobile.classList.add("active");
            btnMobile.textContent = "X";
        }
        header?.classList.add("mobile");
        header?.classList.remove("container");
    }
    console.log("click");
}
btnMobile?.addEventListener("click", handleClickBtnMobile);
// Dark-Mode
const btnMode = document.getElementById("modo-dark");
function handleClikMode() {
    document.body.classList.toggle("dark-mode");
    btnMode?.classList.toggle("active"); // ajustar o on / of do botão dark-mode
    const span = btnMode?.querySelector("span");
    if (btnMode?.classList.contains("active") && span) {
        span.textContent = "☀️";
    }
    else {
        if (span)
            span.textContent = "🌙";
    }
}
btnMode?.addEventListener("click", handleClikMode);
// Manipula a visibilidade do botão ir ao topo
const btnTop = document.querySelector(".top");
function handleScrollend() {
    if (window.scrollY > 600) {
        btnTop?.classList.add("active");
    }
    else {
        btnTop?.classList.remove("active");
    }
}
window.addEventListener("scrollend", handleScrollend);
// abrir / fechar modal habilidades
const btnAddStack = document.querySelector(".addStack");
const btnmodalStack = document.querySelector(".modal-habilidade");
const btnClosedModalStack = document.querySelector(".modal-habilidade .closed");
function handleAddStack() {
    btnmodalStack?.classList.add("active");
}
function fecharModal() {
    btnmodalStack?.classList.remove("active");
}
btnAddStack?.addEventListener("click", handleAddStack);
btnClosedModalStack?.addEventListener("click", fecharModal);
// seleciona os campos necessários para adiionar nova habilidade
const sectionStacks = document.querySelector(".stacks");
const form = document.querySelector(".modal-habilidade form");
const stackList = document.querySelector(".stackList div");
const btnSubmitStack = document.querySelector(".modal-habilidade button");
const inputImg = document.querySelector(".modal-habilidade #icone");
const inputStack = document.querySelector(".modal-habilidade #habilidade");
const inputDescription = document.querySelector(".modal-habilidade #descricao");
// função que cria minha habilidade nova
function criarStack() {
    if (!inputStack?.value.trim() ||
        !inputImg?.value.trim() ||
        !inputDescription?.value.trim()) {
        window.alert("Dados incorretos!"); // mostra um alerta se os dados forem nulos
        return null;
    }
    const arquivoImagem = inputImg.files?.[0];
    if (!arquivoImagem)
        return null;
    const divContainer = document.createElement("div");
    divContainer.classList.add("stack");
    const divInfo = document.createElement("div");
    const icone = document.createElement("img");
    icone.src = URL.createObjectURL(arquivoImagem);
    icone.alt = inputStack.value;
    const p = document.createElement("p");
    p.textContent = inputStack.value;
    const span = document.createElement("span");
    span.textContent = inputDescription.value;
    divInfo.prepend(p);
    divInfo.prepend(icone);
    divContainer.appendChild(span);
    divContainer.prepend(divInfo);
    console.log(divContainer);
    return [divContainer, icone];
}
// adiciona minha habilidade na section habilidades
function addNewStack(event) {
    event.preventDefault();
    const newStack = criarStack();
    const stack = newStack?.[0];
    const icone = newStack?.[1];
    if (!stack || !icone)
        return;
    sectionStacks?.appendChild(stack);
    // adicionar habilidade na minha stackList
    stackList?.appendChild(icone.cloneNode(true));
    fecharModal();
    form?.reset();
}
form?.addEventListener("submit", addNewStack);
// manipula visibilidade da modal projetos
const modalProjects = document.querySelector(".modal-projetos");
const btnAddProject = document.querySelector(".addProject");
const btnClosedModalProject = document.querySelector(".modal-projetos .closed");
const formProject = document.querySelector(".modal-projetos form");
function handleAddProject() {
    modalProjects?.classList.add("active");
}
function fecharModalProject() {
    modalProjects?.classList.remove("active");
    formProject?.reset();
}
btnAddProject?.addEventListener("click", handleAddProject);
btnClosedModalProject?.addEventListener("click", fecharModalProject);
// campos de modal projetos
const inputNomeProject = document.getElementById("project");
const inputImageProject = document.getElementById("imgProject");
const inputDescricaoProject = document.getElementById("descricaoProject");
const listTecksProject = document.querySelector(".newTecks");
const btnNewTeckProject = document.querySelector("#newTeck");
let contador = 0;
// adiciona novo campo para adicionar icone da tech
const containerTechs = document.querySelector(".container-techs");
// remove todos os inputs, o botão e zera o contador
function limparCampos() {
    if (listTecksProject)
        listTecksProject.innerHTML = "";
    containerTechs?.querySelector("button.btn-fechar")?.remove();
    contador = 0;
}
// função que adiiona na minha modal novos inputs de file para adiccionar as tecks
function newField() {
    contador++; // esse contador é incrementado cada vez que adiciono um novo campo de file
    const newInput = document.createElement("input");
    newInput.id = `icone-tec${contador}`;
    newInput.type = "file";
    newInput.accept = "image/*";
    listTecksProject?.appendChild(newInput);
    // cria o botão "Apagar Campos" apenas se ainda não existir
    if (containerTechs && !containerTechs.querySelector("button.btn-fechar")) {
        const btnFechar = document.createElement("button");
        btnFechar.classList.add("btn-fechar");
        btnFechar.textContent = "x Apagar Campos";
        btnFechar.type = "button";
        btnFechar.addEventListener("click", limparCampos);
        containerTechs.appendChild(btnFechar);
    }
}
btnNewTeckProject?.addEventListener("click", newField);
// função que cria minha habilidade nova
function criarProject() {
    if (!inputNomeProject?.value.trim() ||
        !inputImageProject?.value.trim() ||
        !inputDescricaoProject?.value.trim()) {
        window.alert("Dados incorretos!"); // mostra um alerta se os dados forem nulos
        return null;
    }
    const arquivoImagem = inputImageProject?.files?.[0]; // pega a imagem real
    if (!arquivoImagem)
        return null;
    const divContainer = document.createElement("div");
    divContainer.classList.add("projeto");
    const divInfo = document.createElement("div");
    divInfo.classList.add("projeto-info");
    // cria a capa do projeto
    const icone = document.createElement("img");
    icone.src = URL.createObjectURL(arquivoImagem); // cria um caminho temporário para acessar a imagem
    icone.alt = inputNomeProject?.value;
    icone.classList.add("image-project");
    // cria titulo
    const h3 = document.createElement("h3");
    h3.textContent = inputNomeProject?.value;
    // cria descricao
    const p = document.createElement("p");
    p.textContent = inputDescricaoProject.value;
    // cria div techs
    const divTechs = document.createElement("div");
    divTechs.classList.add("techs");
    // verifica quantos campos de tecks criamos para pegar todos os icones
    for (let i = 1; i <= contador; i++) {
        const input = document.getElementById(`icone-tec${i}`);
        const arquivoTech = input?.files?.[0];
        if (!arquivoTech)
            continue;
        const img = document.createElement("img");
        img.src = URL.createObjectURL(arquivoTech); // cria caminho temporário para acessar a imagem
        // adição nos respectivos pais
        const span = document.createElement("span");
        span.appendChild(img);
        divTechs.appendChild(span);
    }
    // adição nos respectivos pais
    divInfo.appendChild(h3);
    divInfo.appendChild(p);
    divInfo.appendChild(divTechs);
    divContainer.appendChild(divInfo);
    divContainer.prepend(icone);
    return divContainer;
}
// pega o container de projetos
const projectContainer = document.querySelector(".project-container");
// adiciona o projeto na tela e fecha a modal
function handleNewProject(event) {
    event.preventDefault();
    const newProject = criarProject();
    if (!newProject)
        return null;
    projectContainer?.appendChild(newProject);
    fecharModalProject();
    formProject?.reset();
}
formProject?.addEventListener("submit", handleNewProject);
export {};
//# sourceMappingURL=app.js.map