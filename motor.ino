#include <TimerOne.h>

int timeDone = -1;

int ea = 6; 
int i1 = 12;
int i2 = 11;

int eb = 10;
int i3 = 9;
int i4 = 8;


void setup() {
  pinMode(ea, OUTPUT);
  pinMode(eb, OUTPUT);
  pinMode(i1, OUTPUT);
  pinMode(i2, OUTPUT);
  pinMode(i3, OUTPUT);
  pinMode(i4, OUTPUT);

  // put your setup code here, to run once:

  Timer1.initialize(500000);
  Timer1.attachInterrupt(timeIsr);
  Serial.begin(9600);
}

void loop() {
  if(timeDone == 1){
    timeDone = 2;
    processCommand();
    timeDone = -1;
  }
}

void timeIsr() {
  if(timeDone == -1){
    timeDone = 1;  
  }
}

void processCommand(){
  int leftSpeed  = 0;
  int rightSpeed = 0;
  if(Serial.available()){
    leftSpeed = Serial.parseInt();
    char delimiter = Serial.read();
    rightSpeed = Serial.parseInt();
    char terminator = Serial.read();
  }

  Serial.print("left: ");
  Serial.println(leftSpeed);
  Serial.print("right: ");
  Serial.println(rightSpeed);
  long time = millis();
  setSpeed(leftSpeed, rightSpeed);
  long time1 = millis();
  Serial.println(time1 - time);

}

void setSpeed(int left, int right){
  analogWrite(ea, abs(left));
  analogWrite(eb, abs(right));
  if(left > 0 ){
    leftForward();
  }else if (left < 0){
    leftBackward();
  }else{
    leftStop();
  }
  if(right > 0 ){
    rightForward();
  }else if (right < 0){
    rightBackward();
  }else{
    rightStop();
  }

}

void forward() {
  leftForward();
  rightForward();  
}

void backward() {
  leftBackward();
  rightBackward();  
}

void left() {
  leftBackward();
  rightForward();  
}

void right() {
  leftForward();
  rightBackward();  
}

void leftForward() {
  digitalWrite(i1, HIGH);
  digitalWrite(i2, LOW);
}

void leftBackward() {
  digitalWrite(i2, HIGH);
  digitalWrite(i1, LOW);
}

void rightForward() {
  digitalWrite(i3, HIGH);
  digitalWrite(i4, LOW);
}

void rightBackward() {
  digitalWrite(i4, HIGH);
  digitalWrite(i3, LOW);
}

void leftStop(){
  digitalWrite(i1, LOW);
  digitalWrite(i2, LOW);
}

void rightStop(){
  digitalWrite(i3, LOW);
  digitalWrite(i4, LOW);
}