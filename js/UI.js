 
let listaPlatos =[]

class UI{
    constructor(){
        this.platosCarta = []
        fetch('https://raw.githubusercontent.com/gonzalouli/PruebaTecnicaMaquetacion/main/js/productos.json')
        .then(response => response.json())
        .then(data => this.mostrarArticulos(data))
        
    }

    
    mostrarArticulos(productos){
        const form = document.querySelector('.carta');
        const grid = document.createElement('div');
        
        //console.log(this.productos)
        this.platosCarta = productos;
        console.log(this.platosCarta)
        
        grid.classList.add('container')
        productos.forEach( (producto)=>
        {
            const card = document.createElement('div');
            card.classList.add('card', "mt-5",'mb-5')
            card.innerHTML =
            `
                <div class="card-body mx-auto">
                    <img class="card-img-top producto" id="plato" alt="${producto.id}" draggable="true" src="../img/platos/${producto.img}"  >
                    <h4 class="card-title">${producto.nombre}</h5>
                    <lu>
                        <li class="card-text" id="productos">${producto.descripcion}</li>
                        <li class="card-text" id="contenido">${producto.contenido}</li>
                        <li class="card-text" id="contenido">Precio: ${producto.precio} €</li>
                    </lu>
                    <button class="btn btn-primary mt-3" id="agregar" value="${producto.id}"> Agregar al carrito</button>
                </div>
            `
            grid.appendChild(card)

        })
        
        form.appendChild(grid)
    }

}


function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev){
    ev.preventDefault();
    const data = ev.dataTransfer.getData("producto");
    ev.target.appendChild(document.getElementById(data));
    const carrito = document.querySelector()
}

function drag(ev){
    console.log("draggando")
    console.log(ev.target.alt)
    ev.dataTransfer.setData("producto", ev.target.alt);
}


document.addEventListener("DOMContentLoaded", ()=>
{
    const ui = new UI(); //carga de articulos


    const targetDrag = document.querySelectorAll('#plato')
    console.log(targetDrag)

    targetDrag.forEach( target => {
        console.log(target)
        target.addEventListener("dragstart", (ev)=>{
            ev.preventDefault();
            console.log(ev.target.alt)
            ev.dataTransfer.setData(`${target.alt}`, target.alt);
        })
    } )

    const botones = document.querySelectorAll('#agregar')
    
    botones.forEach( boton => {
        boton.addEventListener("click", e =>
        {
            e.preventDefault();
            listaPlatos.push(e.target.value)
        } )
    })
 

})

