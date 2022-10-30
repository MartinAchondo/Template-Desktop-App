$('document').ready(()=>{

    $('#home').click(function(){
        let inicio_obj = new Pages(this.id);
    });

    eel.expose(changer)
    function changer(){
        $('h1').html('soooooooos')
    }

})

class Pages {
    
    constructor(page){
        Pages.deleteActive();
        this.page = page;
        this.container = document.querySelector('.container');
        this.changePage();
    }

    async changePage(){
        this.container.innerHTML = await eel.pass_html(this.page)();
        let script = document.createElement('script');
        script.src = `${this.page}/${this.page}.js`;
        script.classList.add('active');
        document.body.appendChild(script);
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href =`${this.page}/${this.page}.css` 
        link.classList.add('active');
        document.body.appendChild(link);
    }

    static deleteActive(){
        $('.active').each(function(){
            this.parentNode.removeChild(this)
        })
    }


}

