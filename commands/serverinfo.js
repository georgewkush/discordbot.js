const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
    
        if (cmd == prefix + 'serverinfo'){
            let sicon = message.guild.iconURL;
            let serverembed = new Discord.RichEmbed()
            .setDescription("Server Information")
            .setColor("#0061ff")
            .setThumbnail(sicon)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("You Joined", message.member.joinedAt)
            .addField("Total Members", message.guild.memberCount);
    
            return message.channel.send(serverembed);
        }
    });

}

module.exports.help = {
    name: "serverinfo"
}
