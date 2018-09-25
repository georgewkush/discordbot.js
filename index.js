const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }  

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded`);
      bot.commands.set(props.help.name,props);
    });
})


bot.on("ready", async () =>{
    console.log('Online!');
    bot.user.setActivity(" Keeping The Peace!", {type: 'STREAMING'})
    return;
});



bot.on("guildMemberAdd", function(member)
{
    member.send("Welcome to the server! Make sure to check out the rules.");

});
//////////////////////PING////////////////////
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
//////////////////////REPORT////////////////////
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
//////////////////////TEMP MUTE////////////////////////
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
     .addField("Time Muted", MReason)

     let MuteChannel = message.guild.channels.find('name', "logs");
     if(!MuteChannel) return message.channel.send("Can't Find Channel");

     let role = message.guild.roles.find('name', "Timeout Chair");
     let mutetime = args[1];
     if (!mutetime) return message.reply("Please Specify a time.")

     await (MUser.addRole(role));
     message.reply(`${MUser} has been muted for ${ms(ms(mutetime))}`);

     setTimeout(function(){
      MUser.removeRole(MUser);
      message.channel.send(`${MUser} has been unmuted!`);
    }, ms(mutetime));

     await message.delete(2);
     MuteChannel.send(MuteEmbed)

     return;

      }
  });
////////////////////////////Server Info/////////////////////
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
/////////////////////////////////KICK////////////////////////////
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
////////////////////////////BOT INFO////////////////////////
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
////////////////////////////////BAN///////////////////////
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
/////////////////////////!creator//////////////////
bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd == prefix + 'creator'){

    let CUser = message.mentions.members.first();
    let crole = message.guild.roles.find('name', "Possible Content Creator");
    let appchannel = message.guild.channels.find('name', "applications");

    let appEmbed = new Discord.RichEmbed()
        .setDescription("Content Creator Application")
        .setColor('#e400ff')
        .addField("Applicant Name", CUser)


    
    CUser.addRole(crole).catch(console.error);
    message.reply("Thank you for applying! A staff member will be with you shortly.");

    message.delete(1);
    appchannel.send(appEmbed)



  }
});
//////////////////////////!script//////////////////////////
bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd == prefix + 'script'){

    let SUser = message.mentions.members.first();
    let Srole = message.guild.roles.find('name', "Possible Tech Geek");
    let appchannel = message.guild.channels.find('name', "applications");

    let appEmbed = new Discord.RichEmbed()
        .setDescription("Tech Geek Application")
        .setColor('#04a87b')
        .addField("Applicant Name", SUser)

    SUser.addRole(Srole).catch(console.error);
    message.reply("Thank you for applying! A staff member will be with you shortly.");

    message.delete(1);
    appchannel.send(appEmbed)



  }
});
/////////////////////////////CLEAR/////////////////////////////
bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd == prefix + 'clear'){

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Oh no boy watchu doin.");
    if(!args[0]) return message.channel.send("Daddy George please specify a number.");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
  }
});

/////////////////////////////!HELP/////////////////////////////////////

bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd == prefix + 'help'){
    let HelpEmbed = new Discord.RichEmbed()
     .setDescription("COMMANDS")
     .setColor("#00fff6")
     .addField("!ping", "Replies with pong. Just a test to make sure the bot is working")
     .addField("!report", "Makes a report about a discord user. Usage: !report (@name) (Reason)")
     .addField("!serverinfo", "Displays some information about the server")
     .addField("!botinfo", "Displays some information about the discord bot")
     .addField("!creator", "Allows you to apply to be a creator. PLEASE ONLY USE THIS COMMAND IN THE APPLICATIONS CHAT")
     .addField("!script", "Allows you to apply to be a tech geek. PLEASE ONLY USE THIS COMMAND IN THE APPLICATIONS CHAT")

     message.channel.send(HelpEmbed);
     message.delete(1);



  }
});

///////////////////////////////!adminhelp////////////////////////////////////
bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
if (cmd == prefix + 'adminhelp'){
  let AHelpEmbed = new Discord.RichEmbed()
   .setDescription("COMMANDS")
   .setColor("#00fff6")
   .addField("!ban", "Bans user. Please only use this instead of banning them through discord. Usage: !ban (@name) (reason)")
   .addField("!tempmute", "Temporarily mutes a user through text and through voice. This should be used after warning. Usage: !tempmute (@name) (time/s/m/h")
   .addField("!kick", "Kicks user. Please only use this instead of kicking them through discord. Usage: !kick (@name) (reason)")
   .addField("!clear", "No one should be using this as I only have perms to.")
   .addField("!warn", "Warns a user. Use this before going forth with any further with punishments. Usage: !warn (@name) (reason)")
   
   let InfoChannel = message.guild.channels.find('name', "admin-info");
   InfoChannel.send(AHelpEmbed);
   message.delete(1);
  }
});
////////////////////////////////WARN//////////////////////////////////
bot.on("message", async message =>{
  if(message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd == prefix + 'warn'){


      let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!wUser) message.channel.send("can't find user!")
      let wReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Who do you think you are?");
      if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("lul no can do bud.");

      let WarnEmbed = new Discord.RichEmbed()
     .setDescription("~Warn~")
     .setColor("#a00022")
     .addField("User Warned", message.mentions.users.first())
     .addField("Warned by", message.author)
     .addField("Channel", message.channel)
     .addField("time", message.createdAt)
     .addField("Reason", wReason)

     

     let BanChannel = message.guild.channels.find('name', "logs");
     if(!BanChannel) return message.channel.send("Can't Find Channel")

    
     message.delete(2);
     BanChannel.send(WarnEmbed)
     message.channel.send((message.mentions.users.first()) + "Hey you've been warned for " + (wReason) + ". I suggest you stop or there will be further punishments!")
     

     return;
  }
});

bot.login(botconfig.token);