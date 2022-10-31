import eel
import backend.functions as fn
import admin.config as cf
import codecs
import os
import backend.database.base as db

class Main():

    def __init__(self):
        self.eel = eel
        self.window = 'dev-electron'
        self.eel.init('frontend')

    def start_app(self):
        self.start_database()
        ans = self.verify_keys()
        if ans:
            self.hideConsole()
            self.start_window()

    def start_window(self):
        if self.window == 'eel':
            self.eel.start('index.html')
        elif self.window == 'dev-electron':
            self.eel.start('index.html', mode='custom', cmdline_args=['node_modules/electron/dist/electron.exe', '.'])
        elif self.window == 'production':
            self.eel.start('index.html', mode='custom', cmdline_args=['app/window/gestor-dominga.exe', '.'])

    def start_database(self):
        self.db = db
        self.db.start()

    def hideConsole(self):
        cf.hideConsole()
    
    def verify_keys(self):
        if cf.verify_keys():
            return True
        else:
            password = input('Ingrese Clave: ')
            if cf.new_key(password):
                return True
        return False


class Functions_Pipe():

    @staticmethod
    @eel.expose
    def pass_html(path):
        path = os.path.join(os.getcwd(),'frontend',path,path+'.html')
        with codecs.open(path,'r','utf-8') as file:
            html = file.read()
        return html

    @staticmethod
    @eel.expose
    def create_and_return(data):
        client = fn.Client()
        ans = client.add_client(data)
        ans2 = client.get_client(1)
        eel.window_message('Elemento creado')
        return ans2


if __name__=='__main__':
    app = Main()
    app.start_app()