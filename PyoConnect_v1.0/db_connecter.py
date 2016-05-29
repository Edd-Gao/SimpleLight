import MySQLdb


class DBConnecter(object):
    def __init__(self):
        self.cursor = 0
        self.db = 0

    def init(self):
        self.db = MySQLdb.connect("localhost", "root", "123456", "lightcontrol")
        self.cursor = self.db.cursor()
        return

    def get_color(self):
        self.cursor.execute("select * from light_settings where num=0")
        data = self.cursor.fetchone()
        color = {"green": int(data[0] * 256), "blue": int(data[1] * 256), "red": int(data[2] * 256)}
        return color

    def insert_visual_effect(self, visualeffect):
        # print "update light_settings set action = '" + action + "' where num=0"
        self.cursor.execute("update light_settings set visualEffect = '" + visualeffect + "' where num = 0")
        self.db.commit()
        # self.cursor.execute("insert into light_settings(num, action) values('1', 'double')")
        return

    def get_visual_effect(self):
        self.cursor.execute("select * from light_settings where num=0")
        data = self.cursor.fetchone()
        action = data[3]
        return action
