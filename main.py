import eel
import backend.functions as fn
import config.config as cf
import codecs
import os
import backend.database.base as db

class Main():

    def __init__(self):
        self.eel = eel
        self.eel.init('frontend')

    def start_app(self):
        self.start_database()
        self.eel.start('index.html')

    def start_database(self):
        db.start()


class Functions():

    def __init__(self):
        pass

    def pass_html(self,path):
        path = os.path.join(os.getcwd(),'frontend',path,path+'.html')
        with codecs.open(path,'r','utf-8') as file:
            html = file.read()
        return html

    def hideConsole(self):
        cf.hideConsole

    def verify_keys(self):
        if cf.verify_keys():
            return True
        else:
            password = input('Ingrese Clave: ')
            if cf.new_key(password):
                return True
        return False


if __name__=='__main__':
    
    func = Functions()
    eel.expose(func.pass_html)
    
    app = Main()   
    app.start_app()