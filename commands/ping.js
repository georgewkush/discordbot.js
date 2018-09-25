const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);    

    if (cmd == prefix + 'ping'){
                return message.channel.send("Pong!");
            
          
        }
    });
}

          
      
         
module.exports.help = {
    name: "Ping"
}