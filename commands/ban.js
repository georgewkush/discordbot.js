const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    bot.on("message", async message =>{
        if(message.author.bot) return;
        if (message.channel.type == "dm") return;
    
        let prefix = botconfig.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
    
        if (cmd == prefix + 'ban'){
    
    
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!bUser) message.channel.send("can't find user!")
            let bReason = args.join(" ").slice(22);
            if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Who do you think you are?");
            if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("lul no can do bud.");
    
            let BanEmbed = new Discord.RichEmbed()
           .setDescription("~Ban~")
           .setColor("#a00022")
           .addField("Baned User", message.mentions.users.first())
           .addField("Banned by", message.author)
           .addField("Channel", message.channel)
           .addField("time", message.createdAt)
           .addField("Reason", bReason)
    
           let BanChannel = message.guild.channels.find('name', "logs");
           if(!BanChannel) return message.channel.send("Can't Find Channel")
    
           message.guild.member(bUser).ban(bReason)
           message.delete(2);
           BanChannel.send(BanEmbed)
    
           return;
    
        }
    });
    

}

module.exports.help = {
    name: "ban"
}