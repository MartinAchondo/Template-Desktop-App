
eel.expose(window_message)
function window_message(texto,tipo){

    if (texto == true) {
      texto = 'true';
    }else if (texto==false){
      texto = 'false';
    };
  
    options = {
        type: 'none',
        buttons: ['Ok'],
        defaultId: 0,
        title: 'Mensaje',
        message: texto    
    };
    window.api.send("mensaje_toMain",options);
    // error, info, warning
  };
