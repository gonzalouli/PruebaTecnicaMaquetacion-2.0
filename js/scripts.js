
const now = moment().format('yyyy-MM-DD')

document.addEventListener('DOMContentLoaded', ()=>{

    const fechaMin = document.querySelector('#date-imput');
    const formulario = document.querySelector('#form')
    const enviar= document.querySelector('#enviar')

    fechaMin.setAttribute('min', now);


    formulario.addEventListener('submit', (e)=>{
        e.preventDefault();

        const hour = document.querySelectorAll('#hour')
        const nombreimput = document.querySelectorAll('#name-imput').value
        const apellidoimput = document.querySelectorAll('#apellido-imput').value
        const emailimpuit = document.querySelectorAll('#email-imput').value
        const fechaimput = document.querySelectorAll('#date-imput').value

        if(nombreimput==='' || apellidoimput==='' || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(emailimpuit)) || fechaimput<now  )
        {
            mostrarAlerta("Por favor, introduce los datos correctamente","error")
            return
        }

        let error=true;
        hour.forEach( (item )=>{
            if(item.checked===true){
                error=false
            }
        })
        if(error){
            mostrarAlerta("Seleccione una hora por favor","error")
            return;
        }else
            mostrarAlerta("Mensaje enviado, contactaremos con usted proximamente","success")

    } )




    

} )


function mostrarAlerta(mensaje,tipo){


    const hayAlerta = document.querySelector('.alert')

    if(!hayAlerta){
        const alerta = document.createElement('div')
        alerta.innerHTML = `
        <span class="alerta">${mensaje}</span>
        `
        if(tipo=="error")
            alerta.classList.add('alert', 'alert-danger','mt-3')  
        else
            alerta.classList.add('alert', 'alert-success','mt-3')  
        
        const formulario = document.querySelector('#idform')
    
        formulario.appendChild(alerta)
    
        setTimeout( ()=>{
            alerta.remove()
        },3000)

    }


}

