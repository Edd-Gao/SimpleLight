Myo Connector Intro
===
The armband controlling part uses Myo as the input device. Myo lets us wirelessly control technology with gestures and motion. Generally it uses EMG signal and IMU as the original data. Then the gestures and motions are identified. There are some interfaces for developers that can be easily control the armband. The connection part on Linux is based on python. There is a Python library and some methods. For example, myo.getPose() will return the pose that Myo detected.  
In our project, there are three files that use python to make the Myo control.

1. common.py definea the library and interfaces
 
2. test.pyoc. The main logic for Myo control

3. mobile_control. Stored the data into mysql database.
