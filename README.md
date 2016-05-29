Simple Light Project
===
Programmer: Gao Changyu, Qian Jiayan, Yang Xuerui
Hardware
---
The hardware is quite simple. We got 4 adafruit neopixel(ws2812b) led and connect them serially. The data in port is connected to pin 18, vcc and gnd are connected directly to raspberry pi.
Setup software for raspberry pi 2B
---
The project is configured for raspberry pi 2B. Before running the code, you need to install some dependencies.
1. Install the newest raspbian image to a SD card. In our case, we use raspbian jessie.
2. Connect the raspberry pi to the Internet with a cable. Log into the board with ssh.
3. follow the instruction in (http://www.fernandocosentino.net/pyoconnect/) to install dependencies for PyoConnect 1.0.
4. In the terminal, run the following commands to install other dependencies.  
```bash
$ sudo apt-get update
$ sudo apt-get install git cmake nodejs mysql-server-5.5 libmysqlcppconn-dev python-mysqldb
-y
```
when asked the root password of mysql, use 123456.
5. configure the database:
```bash
$ mysql -uroot -p
mysql> create database lightcontrol
mysql> use lightcontrol
mysql> source ~/light_control_project/sql/database.sql
```
6. get the source code:
```bash
$ cd ~
$ git clone https://github.com/gaochangyu/SimpleLight.git
```
7. make the ws2812b_controller:
```bash
$ cd ~/light_control_project/ws2812b_controller/
$ cmake .
$ make
```

Run the software
---
run the ws2812b controller:
```bash
$ sudo ~/light_control_project/ws2812b_controller/ws2812b_raspberry_pi2
```
run the webpage server:
```bash
$ nodejs ~/light_control_project/server/SimpleLight.nodejs
```
run the Myo Connect adapter:
```bash
$ nodejs ~/light_control_project/PyoConnect_v1.0/light_control.pyoc
```

Enjoy it!
---
Connect raspberry pi to a router, then you can access the webpage at http://ip_of_raspberry_pi:3000. You should be able to change the light color of the leds through a palette (in mode one).  
Myo connect is also supported. you can use double click gesture to change the visual effect.
* mode 1: Change the led color with the web palette.
* mode 2: Rainbow Effect.
* mode 3: Flash Effect.
* mode 4: Flashing Rainbow Effect.


 
