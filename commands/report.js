const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
    
        if (cmd == prefix + 'report'){
           let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
           if(!rUser) return message.channel.send("Couldn't find this user. Check the name and try again.")
           let reason = args.join(" ").slice(22);
    
           let reportEmbed = new Discord.RichEmbed()
           .setDescription("Reports")
           .setColor("#a00022")
           .addField("Reported User", message.mentions.users.first())
           .addField("Reported by", message.author)
           .addField("Channel", message.channel)
           .addField("time", message.createdAt)
           .addField("Reason", reason)
    
           let reportschannel = message.guild.channels.find('name', "reports");
           if (!reportschannel) return message.channel.send("Couldn't find reports channel.")
    
           message.delete(1);
           reportschannel.send(reportEmbed);
    
           return;
    
    }
    });


}

module.exports.help = {
    name: "report"
}