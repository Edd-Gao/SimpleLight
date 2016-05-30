/* Standard C++ includes */
#include <stdlib.h>
#include <iostream>

/*
  Include directly the different
  headers from cppconn/ and mysql_driver.h + mysql_util.h
  (and mysql_connection.h). This will reduce your build time!
*/
#include "mysql_connection.h"

#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

#include "ws2812b.h"

using namespace std;

static double red, blue, green;
static sql::SQLString visualEffect;

bool update_data(sql::Statement *stmt, sql::ResultSet *res){
  res = stmt->executeQuery("select * from light_settings where num=0"); // replace with your statement
  while (res->next()) {
    red = int(256 * res->getDouble("red"));
    green = int(256 * res->getDouble("green"));
    blue = int(256 * res->getDouble("blue"));
    visualEffect = res->getString("visualEffect");
#ifdef DEBUG
    cout << "red_value: " << red << "\n";
    cout << "green_value: " << green << "\n";
    cout << "blue_value: " << blue << "\n";
    cout << "visualEffect: " << visualEffect << "\n";
#endif
  }
}

int main(void)
{
try {

  int tmp;
  sql::Driver *driver;
  sql::Connection *con;
  sql::Statement *stmt;
  sql::ResultSet *res;



  ws2812b *_ws2812b = new ws2812b(4); //1 pixel LED
  _ws2812b->initHardware();
  _ws2812b->clearLEDBuffer();

  /* Create a connection */
  driver = get_driver_instance();
  con = driver->connect("tcp://127.0.0.1:3306", "root", "123456");
  /* Connect to the MySQL test database */
  con->setSchema("lightcontrol");

  stmt = con->createStatement();
  update_data(stmt, res);

  while(true) {
      if( visualEffect == "feature1"){
        for( int i=0 ; i<=255 ; i++){
          for( int j=0 ; j<4 ;j++) {
            tmp = (i + j) & 255;

            if (tmp < 85) {
              _ws2812b->setPixelColor(j, tmp * 3, 255 - tmp * 3, 0);
            } else if (tmp < 170) {
              tmp -= 85;
              _ws2812b->setPixelColor(j, 255 - tmp * 3, 0, tmp * 3);
            } else {
              tmp -= 170;
              _ws2812b->setPixelColor(j, 0, tmp * 3, 255 - tmp * 3);
            }
          }
          _ws2812b->show();
          update_data(stmt,res);
          if(visualEffect != "feature1") break;
          //usleep(200);
        }
      }else if(visualEffect == "feature2"){
        for( int i=0 ; i<256*5 ; i++){
          for( int j=0 ; j<4 ;j++) {
            tmp = (i*20+j)&255;

            if (tmp < 85) {
              _ws2812b->setPixelColor(j, tmp * 3, 255 - tmp * 3, 0);
              _ws2812b->show();
            } else if (tmp < 170) {
              tmp -= 85;
              _ws2812b->setPixelColor(j, 255 - tmp * 3, 0, tmp * 3);
              _ws2812b->show();
            } else {
              tmp -= 170;
              _ws2812b->setPixelColor(j, 0, tmp * 3, 255 - tmp * 3);
              _ws2812b->show();
            }
          }
          //_ws2812b->show();
          update_data(stmt,res);
          if(visualEffect != "feature2") break;
          usleep(8000);
        }
      }else if(visualEffect == "feature3"){
        for( int i=0 ; i<=255 ; i++) {
          for (int q = 0; q < 4; q++) {
            for (int j = 0; j < 4; j += 3) {
              tmp = (i+j) % 255;

              if (tmp < 85) {
                _ws2812b->setPixelColor((j+q) % 4, tmp * 20, 255 - tmp * 20, 0);

              } else if (tmp < 170) {
                tmp -= 85;
                _ws2812b->setPixelColor((j+q) % 4, 255 - tmp * 20, 0, tmp * 20);

              } else {
                tmp -= 170;
                _ws2812b->setPixelColor((j+q) % 4, 0, tmp * 20, 255 - tmp * 20);

              }
            }
            _ws2812b->show();
            usleep(20000);
            for(int i=0;i<4;i++){
              _ws2812b->setPixelColor((i+q) % 4,0,0,0);
            }
            usleep(8000);

          }
          update_data(stmt, res);
          if(visualEffect != "feature3") break;
        }

      }else if(visualEffect == "feature4"){
        update_data(stmt,res);
        for (int i = 0; i < 4; i++) {
          _ws2812b->setPixelColor(i, red, green, blue);
        }
        _ws2812b->show();
        usleep(100000);
      }

  }
  delete res;
  delete stmt;
  delete con;
  delete _ws2812b;

} catch (sql::SQLException &e) {
  cout << "# ERR: SQLException in " << __FILE__;
  cout << "(" << __FUNCTION__ << ") on line "  << __LINE__ << endl;
  cout << "# ERR: " << e.what();
  cout << " (MySQL error code: " << e.getErrorCode();
  cout << ", SQLState: " << e.getSQLState() << " )" << endl;
}

cout << endl;

return EXIT_SUCCESS;
}
