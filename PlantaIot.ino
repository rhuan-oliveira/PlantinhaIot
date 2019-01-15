// PlantinhaIot
// (c) Copyright 2018 rhuan.dev@gmail.com
// Released under GPL v3
// https://github.com/lif3code/PlantinhaIot


int sensorAguaPin = A0; //porta do sensor

void setup() {
  delay(1000);
  pinMode(sensorAguaPin, INPUT); //difinindo a porta como entrada    
  Serial.begin(9600); //inicializando a comunicação serial
  Serial.println("Olá!");
  delay(4000);
  Serial.println("Eu sou Plantinha. A PlantaIot!!!");
  delay(4000);
}

void loop() {
  //lendo valor no sensor
  int valor_analogico = analogRead(sensorAguaPin); 

  //comparando valor do sensor
  if (valor_analogico > 900 && valor_analogico < 1023) {
    Serial.println("Ei, você vai me matar de sede???");    
    delay(1000);
  } else if (valor_analogico > 750 && valor_analogico < 900) {
    Serial.println("Estou com sede, você poderia me regar??");    
    delay(1000);
  } else if (valor_analogico > 600 && valor_analogico < 750) {
    Serial.println("Que tal me regar e conversar um pouco?");    
    delay(1000);
  } else if (valor_analogico > 350 && valor_analogico < 600) {
    Serial.println("Estou bem, agora você pode apreciar minha beleza!");
    delay(1000);    
  } else if (valor_analogico > 0 && valor_analogico < 350) {
    Serial.println("Maravilha água fresca!");
    delay(1000);      
    }  
}

