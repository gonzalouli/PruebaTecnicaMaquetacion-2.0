class Carrito{

    constructor(){
        this.carrito = []; //carrito de tuplas, id-cant
    }

    giveCarrito(){
        return this.carrito;
    }

    isEmpty(){
        this.carrito.length==0 ? true : false;
    }  

    popItem(id, cant=1){

        this.carrito.forEach( (item) =>{
            if(item.id === id && item.cant>cant){
                item.cant -=cant;
            }
        })
    }

    pushItem(id, cant=1)
    {
        let finded = false;

        finded = this.carrito.find( item => {
            item.id==id ? item.cant+=cant : null;
        }
        )
        
        if(!finded){
            this.carrito.push({id,cant})
        }

    }

}