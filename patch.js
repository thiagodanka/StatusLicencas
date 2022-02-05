function PatchUrl() {

    function Patch() { 
        let i = getRandomIntInclusive(1,27)
            let setores = ["Cobranca", "Faturamento", "Suporte", "Validacao"]         
            function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            let rand = getRandomIntInclusive(0, 3)    
            console.log(rand)   
                fetch(`http://localhost:3000/users/${i}`, {                    
                    method: 'PATCH',
                    body: JSON.stringify({
                        setor: setores[rand]
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(json => {})
            
        }
        Patch()
        setInterval(Patch, 5000)
    }   
    PatchUrl()    
   