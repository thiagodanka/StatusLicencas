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
liVal = 13
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


//================================ API

function getUrl() {

    fetch('http://localhost:3000/users')
        .then((response) => {
            if (!response.ok) throw new Error('Erro ao executar requisição ' + response.status)
            response.json()
                .then((data) => {     

                    //================================ Percorrendo API para localizar quantos usuarios onlines em cada setor

                    data.map((item) => {
                        if (item.setor == "Suporte") {
                            usersSuporte = usersSuporte + 1
                        }
                        if (item.setor == "Faturamento") {
                            usersFaturamento = usersFaturamento + 1
                        }
                        if (item.setor == "Validacao") {
                            usersValidacao = usersValidacao + 1
                        }
                        if (item.setor == "Cobranca") {
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

                    userCobOff.innerHTML = liCob - usersCobranca  
                    userSupOff.innerHTML = liSup - usersSuporte
                    userFatOff.innerHTML = liFat - usersFaturamento
                    userValOff.innerHTML = liVal - usersValidacao
                    userTotOff.innerHTML = liTot - onTot
                    let aviso = `<img src="warn.svg"><span class="tooltiptext">Está ultrapassando o limite,PALHAÇO </span>`

                    if(liCob - usersCobranca < 0 ){
                        userCobOff.classList.add("negativo")
                        warnCobOff.innerHTML = aviso                        
                    }
                    if(liSup - usersSuporte < 0 ){
                        userSupOff.classList.add("negativo")
                        warnSupOff.innerHTML = aviso                        
                    }
                    if(liFat - usersFaturamento < 0 ){
                        userFatOff.classList.add("negativo")
                        warnFatOff.innerHTML = aviso                        
                    }
                    if(liVal - usersValidacao < 0 ){
                        userValOff.classList.add("negativo")
                        warnValOff.innerHTML = aviso                        
                    }
                    
                })
        }).catch((error) => {
            console.error(error.message)
        })
}
getUrl()
