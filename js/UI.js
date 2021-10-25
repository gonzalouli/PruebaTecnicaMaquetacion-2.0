 
let listaPlatos =[]

class UI{
    constructor(){
        this.platosCarta = []
    }

    crearCarta(){
        fetch('https://raw.githubusercontent.com/gonzalouli/PruebaTecnicaMaquetacion/main/js/productos.json')
        .then(response => response.json())
        .then(productos => {
            const form = document.querySelector('.carta');
            const grid = document.createElement('div');
            
            //console.log(productos)
            this.platosCarta = productos;
            
            grid.classList.add('container')
            

            productos.forEach( (producto)=>
            {
                const card = document.createElement('div');
                card.classList.add('card','plato', "mt-5",'mb-5')
                const cardbody = document.createElement('div');
                cardbody.classList.add('card-body','mx-auto')
                let image = document.createElement('img')
                image.classList.add('producto','card-img-top')
                image.setAttribute('src',`../img/platos/${producto.img}`)
                image.setAttribute('alt',`${producto.id}`)
                image.draggable=true;
                image.addEventListener('dragstart', drag )
                const titulo = document.createElement('h4');
                titulo.classList.add('card-title');
                titulo.textContent =`${producto.nombre}`
                const params = document.createElement('lu')
                params.innerHTML =
                `
                            <li class="card-text" id="${producto.nombre}-descr">${producto.descripcion}</li>
                            <li class="card-text" id="${producto.nombre}-cont">${producto.contenido}</li>
                            <li class="card-text" id="${producto.nombre}-precio">Precio: ${producto.precio} €</li>
                `
                const boton = document.createElement('button')
                boton.classList.add('btn','btn-primary', 'mt-3', 'agregar')
                boton.value = `${producto.id}`
                boton.textContent ="Agregar al carrito"
    
                cardbody.appendChild(image)
                cardbody.appendChild(titulo)
                cardbody.appendChild(params)
                cardbody.appendChild(boton)
                card.appendChild(cardbody)

                
                grid.appendChild(card)

            })


            
            form.appendChild(grid)
        })
        .catch(error => console.error(error))

    }

}


function drag(ev){

    console.log("draggando")
    console.log(ev)
    ev.dataTransfer.setData("img", ev.target.id);
}


document.addEventListener("DOMContentLoaded", ()=>
{
    const ui = new UI(); //carga de articulos

    ui.crearCarta()

    // const targetDrag = document.querySelectorAll('.producto')

    // targetDrag.forEach( target => {
    //     console.log(target)
    //     target.addEventListener("dragstart", (ev)=>{
    //         ev.preventDefault();
    //         console.log(ev.target.alt)
    //         ev.dataTransfer.setData(`${target.alt}`, target.alt);
    //     })
    // } )

    const botones = document.querySelectorAll('#agregar')
    
    botones.forEach( boton => {
        boton.addEventListener("click", e =>
        {
            e.preventDefault();
            listaPlatos.push(e.target.value)
        } )
    })

    const carritodragover = document.querySelector('#btncompras')

    carritodragover.addEventListener("drop", ev=>{ 
        ev.preventDefault();
        console.log(ev.target)
        listaPlatos.push(ev.target.value)
        const data = ev.dataTransfer.getData("producto");
        ev.target.appendChild(document.getElementById(data));

        const carrito = document.querySelector("#en-carrito")
        const fila = document.createElement("tr");
        
        const infoImg = document.createElement("th")
        const infoNombre = document.createElement("th")
        const infoPrecio = document.createElement("th")
        const infoCantidad = document.createElement("th")

        
        

    })




 

    const botoncarrito = document.querySelector('#btncompras')

        botoncarrito.addEventListener('click', ()=>{
        const tabla = document.querySelector('#itemsSelected')
        if(tabla.classList.contains("ocultar")){
            // tabla.style.display ="block"
            tabla.classList.remove("ocultar")
        }
        else{
            // tabla.style.display ="none"
            tabla.classList.add("ocultar")

        }
    })


})









// productos.forEach( (producto)=>
//             {
//                 const card = document.createElement('div');
//                 card.classList.add('card','plato', "mt-5",'mb-5')
//                 const cardbody = document.createElement('div');
//                 cardbody.classList.add('card-body','mx-auto')
//                 let image = document.createElement('img')
//                 image.classList.add('producto','card-img-top')
//                 image.setAttribute('src',`../img/platos/${producto.img}`)
//                 image.setAttribute('alt',`${producto.id}`)
//                 image.draggable=true;
//                 const titulo = document.createElement('h4');
//                 titulo.classList.add('card-title');
//                 titulo.textContent =`${producto.nombre}`
//                 const params = document.createElement('lu')
//                 params.innerHTML =
//                 `
//                             <li class="card-text" id="${producto.nombre}-descr">${producto.descripcion}</li>
//                             <li class="card-text" id="${producto.nombre}-cont">${producto.contenido}</li>
//                             <li class="card-text" id="${producto.nombre}-precio">Precio: ${producto.precio} €</li>
//                 `
//                 const boton = document.createElement('button')
//                 boton.classList.add('btn','btn-primary', 'mt-3', 'agregar')
//                 boton.value = `${producto.id}`
//                 boton.textContent ="Agregar al carrito"
     
//                 cardbody.appendChild(image)
//                 cardbody.appendChild(titulo)
//                 cardbody.appendChild(params)
//                 cardbody.appendChild(boton)
//                 card.appendChild(cardbody)

                
//                 grid.appendChild(card)

//             })

