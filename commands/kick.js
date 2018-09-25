const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
    
        if (cmd == prefix + 'kick'){
    
    
            let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!kUser) message.channel.send("can't find user!")
            let kReason = args.join(" ").slice(22);
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Who do you think you are?");
            if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("lul no can do bud.");
    
            let KickEmbed = new Discord.RichEmbed()
           .setDescription("~Kick~")
           .setColor("#a00022")
           .addField("Kicked User", message.mentions.users.first())
           .addField("Kicked by", message.author)
           .addField("Channel", message.channel)
           .addField("time", message.createdAt)
           .addField("Reason", kReason)
    
           let kickChannel = message.guild.channels.find('name', "logs");
           if(!kickChannel) return message.channel.send("Can't Find Channel")
    
           message.guild.member(kUser).kick(kReason)
           message.delete(2);
           kickChannel.send(KickEmbed)
    
           return;
    
        }
    });

}

module.exports.help = {
    name: "kick"
}