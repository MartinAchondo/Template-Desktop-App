from backend.database.crud import DB_Queries as DB_SQLite
import eel

class Client(DB_SQLite):

    def __init__(self):
        super().__init__()


    def add_client(self,data):
        ans = self.sqlite_crear_dato(data,'clients_info')
        return ans

    def get_client(self,id):
        ans = self.sqlite_get_algunos_dic({'id':id},'clients_info')
        ans = ans[0]['rut']
        return ans
