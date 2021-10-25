 
let listaPlatos =[]

let obj = {
    id:0,  
    img:"",
    nombre:"",
    precio: "",
    cantidad:0
}

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
                obj.id = producto.id
                obj.nombre=producto.nombre;
                obj.img=producto.img;
                obj.precio=producto.precio;
                obj.cantidad = 1;

                const card = document.createElement('div');
                card.classList.add('card','plato', "mt-5",'mb-5')
                const cardbody = document.createElement('div');
                cardbody.classList.add('card-body','mx-auto')
                let image = document.createElement('img')
                image.classList.add('producto','card-img-top')
                image.setAttribute('src',`../img/platos/${producto.img}`)
                image.setAttribute('alt',`${producto.id}`)
                image.draggable=true;
                image.alt=JSON.stringify(obj)
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

                obj=limpiarObj()

            })

            
            form.appendChild(grid)
        })
        .catch(error => console.error(error))

    }

}


function drag(ev){

    console.log("draggando")
    console.log(ev.target.alt)
    ev.dataTransfer.setData("img", ev.target.alt);
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
    carritodragover.addEventListener('dragover', (ev) =>{
        ev.preventDefault();
    } )

    carritodragover.addEventListener("drop", ev=>{ 
        ev.preventDefault();
        //console.log(ev.target)
        const data = ev.dataTransfer.getData("img");
        // console.log(data,"aqui esta en string")
        const obj = JSON.parse(data)
        let encontrado=false;
        // console.log(obj)
        listaPlatos.forEach( (item)=>{
            if(item.id==obj.id){
                item.cantidad+=1
                encontrado=true;
            }
        })

        if(!encontrado)
            listaPlatos.push(obj)

        putInList();

    })

    const vaciarCarrito = document.querySelector('#vaciar-carrito')
    vaciarCarrito.addEventListener('click', ()=>{
        listaPlatos=[];
        putInList()
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

function putInList(){
    limpiarList()
    const enCarrito = document.querySelector('#en-carrito')
    listaPlatos.forEach( obj =>{
        const row = document.createElement("tr")

        row.innerHTML = `
        <th><img with=80 height=80 src="../img/platos/${obj.img}"></img></th>
        <th>${obj.nombre}</th>
        <th>${obj.precio}</th>
        <th>${obj.cantidad}</th>
        `
        enCarrito.appendChild(row)
        
        }
    )
}

function limpiarList(){
    const enCarrito = document.querySelector('#en-carrito')
    while(enCarrito.firstChild)
        enCarrito.removeChild(enCarrito.firstChild)
}


function limpiarObj(){
    return {
        imagen:"",
        nombre:"",
        precio: ""
    }
}






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

