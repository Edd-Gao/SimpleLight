# ws2812b-raspberry-pi2
library control NeoPixel WS2812B for Raspberry Pi2, Read more: http://www.thitiblog.com/blog/759

##Intro
Neopixels or WS2812 LEDs are a kind of bright colorized LEDs, but there is a problem that the Raspberry Pi runs a multi-tasking Linux operating system it doesn't have real-time control over its GPIO pins and can't easily drive NeoPixels.
We find an excellent rpi_ws281x library created by Jeremy Garff, which solved the problem. The library solves the real-time control problem by using the PWM and DMA hardware on the Raspberry Pi's processor. The PWM (pulse-width modulation) module can generate a signal with a specific duty cycle, for example to drive a servo or dim an LED.  The DMA (direct memory access) module can transfer bytes of memory between parts of the processor without using the CPU.  By using DMA to send a specific sequence of bytes to the PWM module, the NeoPixel data signal can be generated without being interrupted by the Raspberry Pi's operating system.
The great thing about Jeremy's library is that it does all the hard work of setting up PWM and DMA to drive NeoPixels.

##Software
In detail, we can easily use its C++ code function to initialize, set the color and show the light with some program:
```c++
//Initialization code
ws2812b *_ws2812b = new ws2812b(4); //4 pixel LED
_ws2812b->initHardware();
_ws2812b->clearLEDBuffer();

//Set Color
_ws2812b->setPixelColor(0,0,0,0);

//show the light
_ws2812b->show();

//delay
usleep(1000);
```
For example, by changing the color sequentially in a loop body, we can get a rainbow effect:
```c++
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
        }
```

Hardware
---
Wiring NeoPixels to work with a Raspberry Pi is quite simple. The only issue to deal with is converting the Pi's GPIO from 3.3V up to about 5V for the NeoPixel to read. (GPIO voltage must be higher than 70% of power supply)
We use a 1N4001 diode to reduce the power supply voltage slightly so the NeoPixels can read the Pi's 3.3V output, since we have only 4 NeoPixels.
The hardware is wired up as follows:

* Connect power supply ground to Raspberry Pi ground, and NeoPixel ground.
* Connect power supply 5V to 1N4001 diode anode (side without the stripe).
* Connect 1N4001 diode cathode (side with the stripe) to NeoPixel 5V.
* Connect Raspberry Pi pin 18 to NeoPixel DIN.



