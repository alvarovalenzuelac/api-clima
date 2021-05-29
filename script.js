$(document).ready(function(){
    const api_key = "41a2e267e0a54b25319c7c8e48703a96"
    $("#boton-texto").on("click",function(){
        texto_input = $(this).parent().children("input").val()
        console.log(texto_input.split(","));
        console.log(texto_input.split(",").length);
        if(texto_input==""){
            navigator.geolocation.getCurrentPosition(function(location){
                $.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=es&appid=${api_key}&units=metric`,function(data){
                    $("section").html(`
                    <p>${data.name} : ${data.weather[0].description}</p>
                    <p>Temperatura : ${data.main.temp}</p>
                    <p>Coordenadas : ${data.coord.lat} , ${data.coord.lon}</p>
                    `)
                })
            })
            
        }else if(texto_input.split(",").length==1){
            
            $.get(`http://api.openweathermap.org/data/2.5/weather?q=${texto_input}&lang=es&appid=${api_key}&units=metric`,function(data){
                console.log(data);
            $("section").html(`
            <p>${data.name} : ${data.weather[0].description}</p>
            <p>Pais : ${data.sys.country}</p>
            <p>Temperatura : ${data.main.temp}</p>
            <p>Coordenadas : ${data.coord.lat} , ${data.coord.lon}</p>
            `)
            })
        }else if(texto_input.split(",").length>1){
            
            nombre_pais = texto_input.split(",")[1]
            $.get(`https://restcountries.eu/rest/v2/name/${nombre_pais}`,function(data){
                console.log(data[0].alpha2Code);
                $.get(`http://api.openweathermap.org/data/2.5/weather?q=${texto_input},${data[0].alpha2Code}&lang=es&appid=${api_key}&units=metric`,function(data){
                console.log(data);
                $("section").html(`
                <p>${data.name} : ${data.weather[0].description}</p>
                <p>Pais : ${data.sys.country}</p>
                <p>Temperatura : ${data.main.temp}</p>
                <p>Coordenadas : ${data.coord.lat} , ${data.coord.lon}</p>
                `)
            })
            })
        }
    })
});