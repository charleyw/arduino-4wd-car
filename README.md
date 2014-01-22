Arduino 4WD car application
-------------------
This repo include an android app(using cordova), and an arduino control program.

#### Device used:
* Arduino UNO or Arduino nano
* Arduino hc-06 bluetooth board
* L298 Dual Full Bridge Driver
* Galaxy S3

#### Tech used:
* Cordova
* Bluetooth plugin for Cordova from [don/BluetoothSerial](https://github.com/don/BluetoothSerial)
* jQuery and jQuery mobile
* virtualjoystick.js from [jeromeetienne/virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
* karma, jasmin, jquery-jasmine for test

## How to setup android side
* Before setup please insure you have install cordova
* clone repo and setup project
		
		$ git clone https://github.com/charleyw/arduino-cordova.git
		$ cordova platform add android
		$ cordova plugin add https://github.com/don/BluetoothSerial.git
		$ cordova build

* Install app to your moblie phone(android)

		$ cordova run
		
## How to setup arduino side

* Install the __motor.ino__ to arduino device with arduino IDE.
* Connect PIN **12**, **11** to **I1**, **I2**(l298n driving board) and PIN **9**, **8** to **I3**, **I4**

## How to play

* Open bluetooth in android device, need pair with your bluetooth board on arduino before you start
* Open the android app, select single mode.
* Select the your arduino bluetooth in the selector, and connect.
* After connected, touch the screen, you will know how to play.


© 2014 Wang Chao. This code is distributed under the MIT license.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/charleyw/arduino-cordova/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

