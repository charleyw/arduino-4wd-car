const int buffSize = 10;
char serialData[buffSize];
int readCount;
char command[buffSize];
char extraData[buffSize];

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
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  parseCommand();
  if ( strcmp (command,"w") == 0)              // if 'H' was received
  {
    forward();
  } else if( strcmp (command,"s") == 0) {
    backward();
  } else if( strcmp (command,"a") == 0) {
    left();
  } else if( strcmp (command,"d") == 0) {
    right();
  } else if( strcmp (command,"z") == 0) {
    analogWrite(ea, atoi(extraData));
  }
  memset(command, 0, sizeof(command));
  memset(extraData, 0, sizeof(extraData));
  delay(100);                    // wait 100ms for next reading
}

void parseCommand(){
  if(Serial.available()){
    readCount = -1;
    readCount = Serial.readBytesUntil('\n', serialData, buffSize);
    if(readCount > 0){
      strcpy(command,strtok(serialData,":"));
      strcpy(extraData,strtok(NULL,":"));
    }
//    Serial.print("Command: ");
//    Serial.println(command);
//    Serial.print("Extra Data: ");
//    Serial.println(extraData);
    memset(serialData, 0, sizeof(serialData));
    Serial.flush();
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

void stopEngine() {
  digitalWrite(i1, LOW);
  digitalWrite(i2, LOW);
  digitalWrite(i3, LOW);
  digitalWrite(i4, LOW);
}
