
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));




class ChatGPTClass {
    queue = [];
    optionsGPT = {model: "gpt-3.5-turbo-0301"};
    openai = undefined;

    constructor() {
        this.init().then();
    }
    handleConsulta = async (req, res) => {
        const { consulta } = req.body;
        const respuesta = await this.handleMsgChatGPT(consulta);
        res.json({ respuesta: respuesta.text });
      };

/**
 * Esta Funciona Inicializada
 * */
init = async () => {
    const { ChatGPTAPI} = await import("chatgpt");
    this.openai = new ChatGPTAPI(
        {
            apiKey: process.env.OPENAI_API_KEY
        }
    )
}

/**
 * Manejar los mensajes 
 * su funcion es enviar el mensaje a whatsapp
 * @param {*} ctx
 */

handleMsgChatGPT = async (body)=> {
    const interaccionChatGPT = await this.openai.sendMessage(body, {
        conversationId: !this.queue.length
        ? undefined
        :this.queue[this.queue.length - 1].conversationId,
        parentMemssageId: !this.queue.length
        ? undefined
        :this.queue[this.queue[this.queue.length -1]].id
    });
this.queue.push(interaccionChatGPT);
return interaccionChatGPT
};
}
module.exports = ChatGPTClass