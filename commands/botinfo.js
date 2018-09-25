const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);;
    
        if(cmd == prefix + 'botinfo'){
            let botembed = new Discord.RichEmbed()
            .setDescription("Bot Information")
            .setColor("#bf00ff")
            .addField("Nova Bot 2.0", "Hello, I am a bot created my one and only dad George W. Kush.")
    
            return message.channel.send(botembed);
        }
    });

}

module.exports.help = {
    name: "botinfo"
}