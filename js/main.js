//================================ Dark/Light Mod
let darklight = document.querySelector('.darkLight')
let htmlc = document.querySelector('html')

darklight.addEventListener("click", () => {
    darklight.classList.toggle('dark')
    htmlc.classList.toggle('light')
})

// cob: 601c7af7caae590031ea0d3d
// suporte: 601c7af7caae590031ea0d3e  601c7af7caae590031ea0d3f
// execução: 617963af2e18cf09771eab83
// faturamento: 601da345e2a01a685018fc27
// validacao: 601c7af7caae590031ea0d40   605ca3835e26961b0673a139

//================================ Coluna Licenças

let licCob = document.querySelector('.cobranca .licenca')
let licSup = document.querySelector('.suporte .licenca')
let licFat = document.querySelector('.faturamento .licenca')
let licVal = document.querySelector('.validacao .licenca')
let licTot = document.querySelector('.total .licenca')

//================================ Coluna Online

let userCobOn = document.querySelector('.cobranca .online')
let userSupOn = document.querySelector('.suporte .online')
let userFatOn = document.querySelector('.faturamento .online')
let userValOn = document.querySelector('.validacao .online')
let userTotOn = document.querySelector('.total .online')

//================================ Coluna OffLine

let userCobOff = document.querySelector('.cobranca .offline #off')
let userSupOff = document.querySelector('.suporte .offline #off')
let userFatOff = document.querySelector('.faturamento .offline #off')
let userValOff = document.querySelector('.validacao .offline #off')
let warnCobOff = document.querySelector('.cobranca .offline .warn')
let warnSupOff = document.querySelector('.suporte .offline .warn')
let warnFatOff = document.querySelector('.faturamento .offline .warn')
let warnValOff = document.querySelector('.validacao .offline .warn')
let userTotOff = document.querySelector('.total .offline')


//================================ Quantidade de linceças Statica (Somente para teste)

liCob = 3
liFat = 1
liSup = 10
liVal = 12
liTot = liCob + liFat + liSup + liVal;


//================================ Preenchimento de quantidade de licenças

licCob.innerHTML = liCob
licFat.innerHTML = liFat
licSup.innerHTML = liSup
licVal.innerHTML = liVal
licTot.innerHTML = `<p>${liTot}</p>`

//================================ Variavel para calcular usuarios online

let usersSuporte = 0
let usersFaturamento = 0
let usersValidacao = 0
let usersCobranca = 0
let onTot = 0
let offcob = 0
let offfat = 0
let offsup = 0
let offval = 0

//================================ API

function getUrl() {

    const option = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    }

    const headers = {
        "Access-Control-Allow-Origin": "Content-type"
    }

    fetch('http://10.253.0.149:8080/users', option)
        .then((response) => {
            if (!response.ok) throw new Error('Erro ao executar requisição ' + response.status)
            response.json()
                .then((res) => {

                    data = res[0].data
                    console.log(data)

                    //================================ Percorrendo API para localizar quantos usuarios onlines em cada setor
                    function limpar() {
                        usersSuporte = 0
                        usersFaturamento = 0
                        usersValidacao = 0
                        usersCobranca = 0
                    }
                    limpar()
                    data.map((item) => {

                        if (
                            (item.campaigns[0].idEquipe == "601c7af7caae590031ea0d3e") ||

                            (item.campaigns[0].idEquipe == "601c7af7caae590031ea0d3f")
                        ) {
                            usersSuporte = usersSuporte + 1
                        }

                        if (item.campaigns[0].idEquipe == "601da345e2a01a685018fc27") {
                            usersFaturamento = usersFaturamento + 1
                        }
                        if (
                            (item.campaigns[0].idEquipe == "601c7af7caae590031ea0d40") ||
                            (item.campaigns[0].idEquipe == "605ca3835e26961b0673a139") ||
                            (item.campaigns[0].idEquipe == "617963af2e18cf09771eab83")
                        ) {
                            usersValidacao = usersValidacao + 1
                        }
                        if (item.campaigns[0].idEquipe == "601c7af7caae590031ea0d3d") {
                            usersCobranca = usersCobranca + 1
                        }
                    })



                    //================================ Preenchendo a quantidade de usuarios Online  

                    onTot = usersCobranca + usersFaturamento + usersSuporte + usersValidacao
                    userCobOn.innerHTML = usersCobranca
                    userSupOn.innerHTML = usersSuporte
                    userFatOn.innerHTML = usersFaturamento
                    userValOn.innerHTML = usersValidacao
                    userTotOn.innerHTML = `<p> ${onTot} </p>`

                    offcob = liCob - usersCobranca
                    offfat = liFat - usersFaturamento
                    offsup = liSup - usersSuporte
                    offval = liVal - usersValidacao
                    userCobOff.innerHTML = offcob
                    userSupOff.innerHTML = offsup
                    userFatOff.innerHTML = offfat
                    userValOff.innerHTML = offval
                    userTotOff.innerHTML = liTot - onTot

                    let aviso = `<img src="warn.svg"><span class="tooltiptext">Está ultrapassando o limite. </span>`
                    let a = ""
                    if (liCob - usersCobranca < 0) {
                        userCobOff.classList.add("negativo")
                        warnCobOff.innerHTML = aviso
                    } else {
                        userCobOff.classList.remove("negativo")
                        warnCobOff.innerHTML = a
                    }
                    if (liSup - usersSuporte < 0) {
                        userSupOff.classList.add("negativo")
                        warnSupOff.innerHTML = aviso
                    } else {
                        userSupOff.classList.remove("negativo")
                        warnSupOff.innerHTML = a
                    }
                    if (liFat - usersFaturamento < 0) {
                        userFatOff.classList.add("negativo")
                        warnFatOff.innerHTML = aviso
                    } else {
                        userFatOff.classList.remove("negativo")
                        warnFatOff.innerHTML = a
                    }
                    if (liVal - usersValidacao < 0) {
                        userValOff.classList.add("negativo")
                        warnValOff.innerHTML = aviso
                    } else {
                        userValOff.classList.remove("negativo")
                        warnValOff.innerHTML = a
                    }

                })
        }).catch((error) => {
            console.error(error.message)
        })
}
getUrl()

setInterval(getUrl, 1000);
