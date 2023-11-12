// Variable para mostrar en el contenedor la cantidad de productos en el carrito
let numberofunits;

// obtenemos el evento click al precionar el botón del menú
let iconMenuBars = document.querySelector('.icon-menuBars');

// obtenemos el contenedor del menú para haceerlo visible
let main_menu=document.querySelector('.nav');

//extraemos el contenedor con clase circular-background__content el cual mostraremos los N productos
numberofunits = document.querySelector('.circular-background__content');

//variable que servira para almacenar la suma del campo price de la API
let precioTotal=0.0;

// Arreglo de ID de productos esta servira para almacenar los ID para luego rrecorerlos y hacer peticion por ID a la API
const carritoId = [];

// arreglo para almacenar la informacion de cada producto del carrito de compras
let ArrayCarrito = [];

//Función que procesa la API
function fetchAPI(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.log(error);
      });
}

// Cargamos las solicitudes al iniciar la página web
document.addEventListener('DOMContentLoaded', () => {
    const urls = [
      "https://fakestoreapi.com/products/category/women's clothing",
      "https://fakestoreapi.com/products/category/men's clothing",
      "https://fakestoreapi.com/products/category/electronics",
      "https://fakestoreapi.com/products/category/jewelery",
      "https://fakestoreapi.com/products/categories"
    ];
  
    Promise.all(urls.map(fetchAPI))
      .then(results => {
        //Obtenemos los productos que son para damas
        let areadamas = results[0];

        //Obtenemos los productos que son para caballeros
        let areacaballeros = results[1];

        //Obtenemos los productos que son Electrodomésticos
        let areaelectrodomesticos = results[2];

        //Obtenemos los productos que son Electrodomésticos
        let areajoyeria = results[3];
        
        //La primera petición a la API se mostrara en el contenedor section__content--damas
        let section__damas = document.querySelector('.section__content--damas');

        //La segunda petición a la API se mostrara en el contenedor section__content--caballeros
        let section__caballeros = document.querySelector('.section__content--caballeros');
    
        //La tercera petición a la API se mostrara en el contenedor section__content--Electrodomésticos
        let section__electrodomesticos = document.querySelector('.section__content--electrodomésticos');

        //La cuarta petición a la API se mostrara en el contenedor section__content--Electrodomésticos
        let section__joyeria = document.querySelector('.section__content--joyeria');

        //envianmos los datos de la API para mostrarlos
        crearTarjeta(areadamas,section__damas);
        crearTarjeta(areacaballeros,section__caballeros);
        crearTarjeta(areaelectrodomesticos,section__electrodomesticos);
        crearTarjeta(areajoyeria,section__joyeria);

       console.log('Todas las solicitudes se han completado');
    });

});

//función para mostrar los datos de la API como son las categorias esta se cargar al iniciar el sitio web
function crearTarjeta(datos,contendor){

    //recorremos los datos de la API
    datos.forEach((item,index) => {
       
        // solo permitimos que el bucle solo recorra 25 veces
        if(index <=50){

            //creamos los elmentos de la tarjeta
            let card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('container-flexcard');

            //Asignamos el Id de la API a la targeta creada por cada creacion de targeta 
            card.setAttribute('id',item.id);

            //creamos el contendor que tendra la imagen 
            let container__image = document.createElement('div');
                container__image.classList.add('card__image');

            //creamos el elemento img
            let img = document.createElement('img');
                img.src=item.image;  
                img.alt="imgen de prueva";
                img.setAttribute('loading', 'lazy');
                img.classList.add('image__render');

            //creamos el contenedor que tendrá la información de la tarjeta
            let container__card = document.createElement('div');
            container__card.classList.add('card__content');
            container__card.classList.add('container-flexcard');
            
            // creamos el contenedor que tendra el titulo del producto
            let container__title = document.createElement('div');
                container__title.classList.add('card__title');
                container__title.innerHTML=item.title;

            // creamos el contenedor que tendrá el precio
            let container__price = document.createElement('div');
                container__price.classList.add('card__price');
                container__price.innerHTML=item.price;
            
            // creamos el contenedor que tendrá la descripción
            let card__button = document.createElement('button');
                card__button.classList.add('card__button');
                card__button.innerHTML ="AGREGAR";

            //agregamos la etiqueta "img" a su contenedor principal "containerimagen"
            container__image.appendChild(img);

            container__card.append(container__title,container__price,card__button);

            //agregamos los elementos a la tarjeta 
            card.append(container__image,container__card);

            //agregamos la tarjeta al contenedor princiapal(section__content)
            contendor.append(card);

          //Llamamos la funcion que servira para mostrar los detalles de cada tarjeta
            container__image.addEventListener('click',e=>{
                modalDetailsID(item.id);
            });

            //Al hacer clik al botón de cada tarjeta la agregamos al carrito de compras
            card__button.addEventListener('click',e=>{
                anadirproducto(item.id);
            });
        }
    });
}

//Buscamos al elemento con clase modal 
let containermodal = document.querySelector('.modal');

//Función para mostrar la informacion de cada tarjeta
function modalDetailsID(id){

    // Elementos del modal el cual serán representados los datos
    let container_modal__text = document.querySelector('.container-modal__text');
    let modal__imagen = document.querySelector('.modal__imagen');
    let modal__price = document.querySelector('.container-modal__price');
    let modal__category= document.querySelector('.container-modal__category');
    let modal__name_product= document.querySelector('.container-modal__name-producto');
    
    
    //Enviamos el id para realizar la busqueda de la bebida
    fetchAPI(`https://fakestoreapi.com/products/${id}`)
    .then(data => {

        //Mostramos el modal al precionar cada tarjeta
        containermodal.style.display="block";

        //Eliminamos el scroll al tener activo el modal 
         document.body.style.overflow = 'hidden';

        //asignamos la informacion a los elementos HTML
        modal__imagen.src=data.image;
        container_modal__text.innerHTML=data.description;
        modal__price.innerHTML=data.price;
        modal__name_product.innerHTML=data.title;
        modal__category.innerHTML=data.category;

    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.log(error);
    });
}

//elemento que permite cerrar el modal
let cerrarmodal = document.querySelectorAll('.close__icon');

// Modal para mostrar los detalles del software
let containermodalsofware = document.querySelector('.modal-detallesoftware');

cerrarmodal.forEach(indice =>{

    //Evento para cerrar el modal que permite observar todos los detalle del producto buscado por ID
    indice.addEventListener('click',e=>{

        //escondemos el modal al precionar el Icono de cerrar
        containermodal.style.display="none";

        //escondemos el modal que muestra el detalle del software
        containermodalsofware.style.display="none"; 
        
        //Reestablecemos el estado de el scroll a auto esto para bolver a mostrarlo
        document.body.style.overflow = 'auto';
    });

});

//mostramos el menu para dispositivo mobiles
iconMenuBars.addEventListener('click',e=>{
    main_menu.classList.toggle('show-menu');
});

//contenedor para mostrar el mensaje si el arreglo esta vacío
let message_cart = document.querySelector('.cart__message');

//Agregamso el producto al carrito mediante su ID creando un arreglo llamado carritoId
function anadirproducto(idproducto) {
    
    // verificamos si el id ya existe en el array
    let productoExistente = carritoId.find((p) => p === idproducto);

    //si el ID no existe en el arreglo se ingresa
    if (!productoExistente) {

      // si el objeto no existe, lo agregamos al array
      carritoId.push(idproducto);

      //Eliminamos el menjase del contenedor message_cart
      message_cart.innerHTML="";

      //mostramos la cantidad de productos que existen segun el carrito de compra
      numberofunits.innerHTML = carritoId.length;
    }
}

//contenedor que contiene toda la información del carrito como header,content y footer del carrito
let container_carrito = document.querySelector('.container-cart');

// contenedor padre en el que se mostraran las tarjetas del carrito
let cart__contentainer = document.querySelector('.cart__container');

//definimos al elemento que queremos realizar clic para mostrar el carrito de compras
let BtnmostrarCarrito=document.querySelector(".button-cart");

//al realizar clic sobre este elemento cerraremos el carrito de compras
let cerrarCarrito = document.querySelector('.cart__icon-close');

// Contenedor en donde se mostrara el precio total de la compra
let precioTotalcart = document.querySelector('.cart__footer-subtotal-number');

//variable productoEncontrado nos permite validar que en los arreglos si no existan datos duplicados 
let productoEncontrado;

//mostramos el carrito de compras
BtnmostrarCarrito.addEventListener('click',e=>{
    
    if(main_menu.classList.contains('show-menu')){
       
        main_menu.classList.toggle('show-menu');
    }

    //escondemos el carrito de compra
    container_carrito.style.display="block";

    //Eliminamos el scroll al tener activo el modal 
    document.body.style.overflow = 'hidden';

    //validamso si el carrito esta vacío
    if(carritoId.length>0){

        //recorremos el arreglo para enviar el id a la API
        carritoId.forEach((index,posicion) =>{
           
            //Enviamos el id para realizar la busqueda de la bebida
            fetchAPI(`https://fakestoreapi.com/products/${index}`)
            .then(data => {

                //creamos un objeto el cual tendra datos del producto para poder actualizar las unidades y precioTotal
                const compra={
                    id:data.id,
                    unidades: 1,
                    precioUnitario:data.price,
                    precioTotal:data.price
                };

                // Buscar el objeto con el ID proporcionado en el parametro data.id en el arreglo ArrayCarrito
                productoEncontrado = ArrayCarrito.find((producto) => producto.id === data.id);

                //si no se encuentra el ID lo ingresa
                if(!productoEncontrado){
                    //agregamos el objeto al arreglo
                    ArrayCarrito.push(compra);
                }

                //ejecuta la funcion que crea cada uno de los elementos llenos con la información
                mostrarcarrito(data,posicion);

            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.log(error);
            });
        });
    }
    else{
        messageCartEmpty();
    }
});


// Creamos los elementos necesarios para mostrar los datos del carrito
function mostrarcarrito(dataAPI,posicion) {

    //recorremos al arreglo ArrayCarrito para extraer la cantidad de productos que compra el cliente
   let unidadesArray=ArrayCarrito.find((producto)=>producto.id===dataAPI.id);

    //contador variable servira incrementar de 1 en 1 cada producto al precionar los iconos
    let contador=1;

    // Extraer el campo "precio" de cada registro
    const precio = dataAPI.price;

    //guardamos el precio en la variable precioTotal y se suma en cada iteración
    precioTotal+=precio;
    
    // Creamos el contenedor que sera la tarjeta para mostrar los datos de la API
    let cart__content = document.createElement('div');
        cart__content.classList.add('cart__content', 'cart__inline-flex');
        
        //Asignamos el Id de la API a la targeta de cada producto creada en el carrito 
        cart__content.setAttribute('id',dataAPI.id);

    // Creamos el contenedor de la imagen
    let container_image = document.createElement('div');
        container_image.classList.add('cart__product-image');

    // Creamos la etiqueta img
    let image = document.createElement('img');
        image.classList.add('image__render');
        image.setAttribute('alt', 'Cargando la imagen del carrito...');
        image.setAttribute('loading', 'lazy');
        image.src=dataAPI.image;

    //creamos el contendor de detalles 
    let container_detalles = document.createElement('div');
        container_detalles.classList.add('cart__product-details');

    //creamos el contenedor que poseera el nombre del producto
    let name_product = document.createElement('div');
        name_product.classList.add('card__name-product');
        name_product.innerHTML=dataAPI.title;

    //creamos el contenedor que tendra el precio del producto
    let price_product = document.createElement('div');
        price_product.classList.add('card__price-product');
        price_product.innerHTML = dataAPI.price;

    //creamos el botón para poder eliminar el producto del carrito
    let button_remove = document.createElement('button');
        button_remove.classList.add('card__button-remove');
        button_remove.innerHTML="Remover";

    //creamos el contenedor para mostrar las unidades de cada producto
    let container_units = document.createElement('div');
        container_units.classList.add('cart__product-units');

    let input_text = document.createElement('input');
        input_text.type = 'text';
        input_text.value = unidadesArray.unidades;
        input_text.classList.add('cart__input-text');

    //creamos el elemento i para el icono de incremento
    let iconplus = document.createElement('i');
        iconplus.classList.add('fa-solid','fa-plus','cart__icon-product');

    //creamos el elemento i para el icono de decremento
    let iconminus = document.createElement('i');
        iconminus.classList.add('fa-solid','fa-minus','cart__icon-product');

    //agregamos la imagen a su contenedor (container_image)
    container_image.appendChild(image);

    //agregamos los elementos hijos al contenedor container_detalles
    container_detalles.append(name_product,price_product,button_remove);

    //agregamos los elementos que forman parte del contenedor container_units
    container_units.append(input_text,iconplus,iconminus);
    
    //Agregamos los elementos hijos a la tarjeta
    cart__content.append(container_image,container_detalles,container_units);

    //agregamos la tarjeta al contenedor principal
    cart__contentainer.appendChild(cart__content);

    //Mostramos el precio total de todas las compras en el contenedor subtotal
    precioTotalcart.innerHTML=parseFloat(precioTotal).toFixed(2);

    //obtenemos el valor de campo text del producto
    let valorTextActualizado;
    
    //variable contendra el valor total de N productos * precio
    let costoTotalUnidad;

    //costo unitario del producto
    let costoUnitario;

    iconplus.addEventListener('click',e=>{

        //extraemos el valor del input tex actual
        valorTextActualizado=parseInt(input_text.value)+contador;

        //validamos que el campo text de cada producto no quede a cero
        if(valorTextActualizado===0){
            valorTextActualizado=1;
        }

        //la variable costoUnitario almacena el costo unitario para poder descontarlo al actualizar los N productos
        costoUnitario=parseFloat(dataAPI.price);

        //se calcula la cantidad de productos por el costo unitario
        costoTotalUnidad = costoUnitario * valorTextActualizado;

        //asignamos el nuevo valor al texbox con clase cart__input-text
        input_text.value = valorTextActualizado.toString();
     
        //enviamos los datos necesarios para actualizar la cantidad de producto por cada Id
        ActualizarCarrito(dataAPI.id,valorTextActualizado,dataAPI.price,costoTotalUnidad);
    });

    iconminus.addEventListener('click',e=>{

        //extraemos el valor del input tex actual
        valorTextActualizado = parseInt(input_text.value)-contador;

        //validamos que el campo text de cada producto no quede a cero
        if(valorTextActualizado===0){
            valorTextActualizado=1;
        }

        //la variable costoUnitario almacena el costo unitario para poder descontarlo al actualizar los N productos
        costoUnitario=parseFloat(dataAPI.price);

        //se calcula la cantidad de productos por el costo unitario
        costoTotalUnidad = costoTotalUnidad - costoUnitario;

        //Asignamos la cantidad de producto al texbox
        input_text.value = valorTextActualizado.toString();

        let costominimo=parseInt(input_text.value);

        if(costominimo===1){
            costoTotalUnidad=costoUnitario;
        }
        //enviamos los datos necesarios para actualizar la cantidad de producto por cada Id
        ActualizarCarrito(dataAPI.id,valorTextActualizado,dataAPI.price,costoTotalUnidad);
    });

    //Realiza el calculo total del carrito
    totalAPagar();

    //funcion que elimina el producto del carrito
    eliminarProductoCarrito();
}

function ActualizarCarrito(idproducto,cantidad,preciounidtario,total){

   // Buscar el objeto con el ID proporcionado en el parametro idproducto 
     productoEncontrado = ArrayCarrito.find((producto) => producto.id === idproducto);
 
    if (productoEncontrado) {
        // Si se encontró el objeto, actualizar los campos deseados del arreglo del carrito 
        productoEncontrado.id = idproducto;
        productoEncontrado.unidades = cantidad;
        productoEncontrado.precioUnitario = preciounidtario;
        productoEncontrado.precioTotal =total;
    }

    //Realiza el calculo total del carrito
    totalAPagar();
}

//Cerramos el carrito al realizar click a este elemento cerrarCarrito
cerrarCarrito.addEventListener('click',e=>{
    //escondemos el carrito de compra
    container_carrito.style.display="none";

    //Reestablecemos el estado de el scroll a auto esto para bolver a mostrarlo
    document.body.style.overflow = 'auto';

    if(carritoId.length!=0){
        //Limpiamos el contenedor que muestra los productos del carrito para que no se repitan los datos al abrirlo
        cart__contentainer.textContent = "";
    }
});

//Función para eliminar un producto del carrito
function eliminarProductoCarrito(){

    //recorremos todos los elementos que posean la clase card__button-remove
   let deletecartproduct = document.querySelectorAll('.card__button-remove');

    //recorremos los botones remove
    deletecartproduct.forEach((elementos,indice) =>{

        //escuchamos el evento clik al boton remove
        elementos.addEventListener('click' , e=>{

            //eliminamos el contenedor padre del botón que fue presionado
            const cardContainer = elementos.closest('.cart__content');
            cardContainer.remove();

            //Obtenemos el ID del contenedor que posee la clase cart__content ya que es el mismo del id del producto
            let id = cardContainer.id;

            //buscamos el indice en el arreglo carritoId mediante el id del producto esto para poder eliminarlo del carrito  
            let indexID=carritoId.indexOf(parseInt(id));

            //eliminamos el id del arreglo
            carritoId.splice(indexID,1);
            console.log(ArrayCarrito);

            //buscamos el indice en el arreglo ArrayCarrito mediante el id del producto esto para poder eliminarlo del carrito  
            let indexArrayCarrito=ArrayCarrito.findIndex(objeto => objeto.id === parseInt(id));

            //eliminamos el id del arreglo llamado ArrayCarrito
            ArrayCarrito.splice(indexArrayCarrito,1);

            //mostramos la cantidad de productos que existen segun el carrito de compra en el contenedor
            numberofunits.innerHTML = carritoId.length;

            //Realiza el calculo total del carrito
            totalAPagar();

            //cuando el arreglo llamado carritoId este vacio entra en el IF
            if(carritoId.length===0){

                //mostramos la cantidad de productos que existen segun el carrito de compra en el contenedor
                numberofunits.innerHTML = carritoId.length;
                messageCartEmpty();
            }
    
            //detenemos el evento al realizar el primer click
            e.stopImmediatePropagation();
        });
          
    });
}

//funcion que realiza el calculo total por la compra 
function totalAPagar(){
    //recorremos el arreglo de objeto ArrayCarrito para obtener la suma de todos los campos llamado PrecioTotal
    let totalPagar=ArrayCarrito.reduce((total,elemento)=>{
        return total + parseFloat(elemento.precioTotal);
    },0);

    //Mostramos el precio total de todas las compras en el contenedor subtotal
    precioTotalcart.innerHTML=parseFloat(totalPagar).toFixed(2);
}

//Funcion que nos muestra el mensaje si el carrito esta vacio
function messageCartEmpty(){
    message_cart.innerHTML='Tu carrito esta vacío';
}

// Obrtenemos todos los enlaces 
let modaldetalleSoftware = document.querySelectorAll('.nav__li'); 

modaldetalleSoftware.forEach((elemento,indice) =>{

    elemento.addEventListener("click",e=>{

        if(modaldetalleSoftware.length - 1 == indice){
            containermodalsofware.style.display="block"; 
        }
    });
});



/**Carrusel de pueba */

const cajapadre = document.querySelector(".carrusel__contenedorimagen");
let primerHijo = cajapadre.firstElementChild;

// Función para clonar el primer hijo y añadirlo al final del contenedor
function clonarPrimerElemento() {
    primerHijo = cajapadre.firstElementChild;
    cajapadre.appendChild(primerHijo.cloneNode(true));
}

// Función para eliminar el primer hijo del contenedor
function eliminarPrimerElemento() {
    primerHijo = cajapadre.firstElementChild;
    cajapadre.removeChild(primerHijo);
}

// Repetir la animación cada 8 segundos (igual al tiempo de duración de la animación)
setInterval(() => {
  clonarPrimerElemento();
  eliminarPrimerElemento();
}, 3000);

