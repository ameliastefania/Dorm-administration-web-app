
const useLSItem  = () => {
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    // var LSNull = {
    //     'nume': null,
    //     'prenume':null,
    //     "adresaEmail":null,
    //     "pwdIntrodusa":null,
    //     "accessToken":null,
    //     "id_student":null,
    //     "id_admin_camin":null,
    //     "rol":null,
    //     "esteCandidat":null,
    //     "Votat":null,
    //     "camin_administrat":null
    // }

    return localStorageItem
    // if (localStorageItem) {
    //     return localStorageItem
    // } 
    // return LSNull;
}
export default useLSItem;