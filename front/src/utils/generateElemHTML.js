export function creareDivDateInvalide() {

    let divDateInvalide = document.createElement("div");
    divDateInvalide.id = "idDivDateInvalide"
    divDateInvalide.className = "flex align-items-center justify-content-center";
    document.body.appendChild(divDateInvalide);   
    return divDateInvalide;
}

export function creareParagrafDateInvalide() {
       
    let invalidInfo = document.createElement("p");
    invalidInfo.id ="idPInvalidInfo"
    invalidInfo.innerText = "Credentiale incorecte!Adresa de mail sau parola sunt eronate!";
    invalidInfo.style.color = "red";
    return invalidInfo
 }

 export function divGraficPrezentaVot() {

    let divPrezVot = document.createElement("div");
    divPrezVot.id = "divPrezVot"
    // divPrezVot.className = "flex align-items-center justify-content-center";
    divPrezVot.className = "justify-content-around";
    document.body.appendChild(divPrezVot);   
    return divPrezVot;
}

 export function paragrafGraficPrezentaVot() {
       
    let titluGrafic = document.createElement("p");
    titluGrafic.id ="paragrafPrezVot"
    titluGrafic.innerText = "Situatia prezentei la vot a studentilor";
    titluGrafic.style.color = "black";
    titluGrafic.style.fontWeight = "bold";
    return titluGrafic
 }

 export function divProcentajStud() {

    let divProcentajStud = document.createElement("div");
    divProcentajStud.id = "divProcentajStud"
    // divPrezVot.className = "flex align-items-center justify-content-center";
    divProcentajStud.className = "justify-content-around";
    document.body.appendChild(divProcentajStud);   
    return divProcentajStud;
}

 export function paragrafProcentajStud() {
       
    let titluGrafic = document.createElement("p");
    titluGrafic.id ="paragrafProcentajStud"
    titluGrafic.innerText = "Procentajul studentilor grupati pe facultate";
    titluGrafic.style.color = "black";
    titluGrafic.style.fontWeight = "bold";
    return titluGrafic
 }


