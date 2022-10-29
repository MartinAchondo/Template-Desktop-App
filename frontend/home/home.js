
$('document').ready(async ()=>{

    let client = {'rut':102837}
    let text = await eel.create_and_return(client)();
    $('#h6').html(text)

})