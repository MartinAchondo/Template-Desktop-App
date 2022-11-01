
$('document').ready(async ()=>{

    $('.nav-item').click(async function(){
        let page_obj = new Pages(this.id);
        await page_obj.askPage();
    });
})

class Pages {
    
    constructor(page){
        Pages.deleteActive();
        this.page = page;
        this.container = document.querySelector('.container');
    }

    async askPage(){
        window.api.send('pass_html',this.page);
        window.api.receive('ans_pass_html', async(html_data)=>{
            this.changePage(await html_data)   
        })
    }

    async changePage(html_data){
        this.container.innerHTML = html_data;
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


