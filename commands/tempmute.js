const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    
    bot.on("message", async message =>{
    if(message.author.bot) return;
    if (message.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd == prefix + 'tempmute'){


        let MUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!MUser) message.channel.send("can't find user!")
        let MReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Who do you think you are?");
        if(MUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("lul no can do bud.");

        let MuteEmbed = new Discord.RichEmbed()
       .setDescription("~Mute~")
       .setColor("#a00022")
       .addField("Muted User", message.mentions.users.first())
       .addField("Muted by", message.author)
       .addField("Channel", message.channel)
       .addField("time", message.createdAt)
       .addField("Reason", Reason)

       let MuteChannel = message.guild.channels.find('name', "logs");
       if(!MuteChannel) return message.channel.send("Can't Find Channel");

       let role = message.guild.roles.find('name', "Timeout Chair");
       let mutetime = args[1];
       if (!mutetime) return message.reply("Please Specify a time.")

       await (MUser.addRole(role,id));
       message.reply(`<@${MUser}> has been muted for ${ms(ms(mutetime))}`);

       setTimeout(function(){
        tomute.removeRole(MUser.id);
        message.channel.send(`<@${MUser.id}> has been unmuted!`);
      }, ms(mutetime));

       message.delete(2);
       MuteChannel.send(MuteEmbed)

       return;

        }
    });
}
module.exports.help = {
    name: "tempmute"
} 
