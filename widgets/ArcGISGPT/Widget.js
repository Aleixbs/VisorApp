///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/dom','dojo/_base/declare', 'jimu/BaseWidget'],
  function(dom,declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: "jimu-widget-chat-gpt",

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',

      //methods to communication with app container:

      gisGPT: function () {
        const API_KEY = "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";
        const API_URL = "https://api.openai.com/v1/chat/completions";

        //Cómo actua el chat
        this.messages = [
          {
            role: "system",
            content:
              "Eres un asistente financiero experto en el mercado español que trabaja en Bizify, responde de fomra concisa y segura todas las preguntas de los usuarios relacionadas con temas financieros",
          },
        ];

        //Ejecutar la llamada y devolver respuesta
          const inputbox = dom.byId("user-input");    //dom.byId
          var content = dom.byId("user-input").value;

          //Consulta usuario
          this.messages.push({
            role: "user",
            content: `Información sobre ${content}`,
          });

          const chatUsuario = dom.byId("chat");
          chatUsuario.className = 'chat-style'
          chatUsuario.innerHTML = `<span id="negrita">Usuario:</span> ${content}`;

          this.respuesta = document.getElementById('respuesta')

          inputbox.value = "";

          //Parametros llamada a la API quizas implementación en config.json
          var params = {
            model: "gpt-3.5-turbo",
            messages: this.messages,
            temperature: 0.5,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            // "stop": ["You:"],
          };

          axios
            .post(API_URL, params, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
              },
            })
            .then((response) => {
              console.log(response);

              //Respuesta del chat
              const chat_response = response.data.choices[0].message.content;

              this.respuesta.className = 'respuesta-style' 
              this.respuesta.innerHTML = `<span id="negrita">BizifyGPT:</span> ${chat_response}`;    // cuidado con el nodo al que haces innerHTML 

              inputbox.focus();

              //Rol para que recoja todo el historial de mensajes
              this.messages.push({ role: "assistant", content: chat_response });

              console.log(messages);
            })
            .catch((error) => {
              console.log(error);
              console.log(error.response.data.error);
            });
        }

        //Botón acción
      //   const form = document.getElementById("activador");  //data-dojo-attach-event al botón 
      //   form.addEventListener("click", enviarMensaje);
      // },

      // postCreate: function() {
      //   this.inherited(arguments);
      //   console.log('postCreate');
      // },

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

      // onOpen: function(){
      //   console.log('onOpen');
      // },

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:
    });
  });