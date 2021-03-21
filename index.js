// Les paramètres

const Discord = require("discord.js");
const Client = new Discord.Client;
const prefix = "le prefix de votre bot";
const botname = "Le nom de votre bot"
const statut = `Le statut du bot`
const botid = `L'id du bot`
const token = "Le token du bot" 
const supportserver = "Le support du bot" // Si vous n'en avez pas, merci de mettre votre site !
const statuttype = "" // Liste des activities : COMPETING, LISTENING, PLAYING, WATCHING

// Envoie un message dès que le bot est bien allumé
Client.on("ready", () => {
    console.log("Bot allumé !");
});

Client.on("ready", () => {
    Client.user.setActivity(statut, { type: statuttype });
    });

// Les embeds
const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(botname + ' - Liste des commandes')
	.setURL(supportserver)
	.setDescription('**😆 Commandes fun:**\n`' + prefix + 'naruto`,`' + prefix + 'tamere`,`' + prefix + 'say`\n\n**👮‍♂️Commandes modération :**\n`' + prefix + 'clear`,`' + prefix + 'ban`,`' + prefix + 'kick`\n\n**⚠️Commandes informatifs :**\n`' + prefix + 'ping`, `' + prefix + 'invite`, `' + prefix + 'avatar`, `' + prefix + 'gifavatar`, `' + prefix + 'prefix`, `' + prefix + 'support`')
	.setThumbnail('https://cdn.discordapp.com/emojis/813501311031050290.png?v=1')
	.setImage('https://media1.tenor.com/images/e7ab03bac23eb9b3f5bd67ba27ca7b08/tenor.gif?itemid=18158245')
	.setTimestamp()
	.setFooter(botname + ' - Bot discord modération et fun !', 'https://cdn.discordapp.com/emojis/781666474611834921.png?v=1');


// Les commandes
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

// Commande [PREFIX]ping
    if(message.content == prefix + "ping"){
        message.channel.send(`🏓Le ping du bot est de ${Date.now()-message.createdTimestamp}ms. Le ping de l'API est de ${Math.round(Client.ws.ping)}ms`);
    }
// Commande [PREFIX]kick
    if(message.content == prefix + "kick"){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.channel.send("Ce membre n'existe pas ou personne n'as été mentionné.");
      }
      else {
        if(mention.kickable){
          mention.kick
          message.channel.send(mention.displayName + " a été kick avec succès !");
        }
        else {
          message.channel.send("Vous ne pouvez pas bannir " + mention.displayName + " .")
        }
      }
    }
// Commande [PREFIX]help
    if(message.content == prefix + "help"){
        message.channel.send(helpEmbed);
    }
// Commande [PREFIX]stat
    if(message.content == prefix + "stat"){
        message.channel.send("**" + message.author.username + "** ||qui a pour ID : " + message.author.id + "|| a posté un message")
    }  
// Commande [PREFIX]naruto
    if (message.content.startsWith(prefix + "naruto")) {

        // Liste des gifs naruto
        
          const wallpapers = [
           'https://thumbs.gfycat.com/PlainFriendlyFowl-size_restricted.gif',
           'https://media.tenor.com/images/40f3243a0c9daa331dc8726f127cb57d/tenor.gif',
           'https://media3.giphy.com/media/aQehjKK70NnPO/giphy.gif',
           'https://media4.giphy.com/media/Yv6RcuiyHYmn6/giphy.gif',
           'https://media4.giphy.com/media/JRlqKEzTDKci5JPcaL/200.gif',
           'https://i.skyrock.net/4942/94684942/pics/3317039214_1_2_N3LrHwdU.gif',
           'https://media0.giphy.com/media/6zaiXkx0jDgmQ/giphy.gif',
           // Vous pouvez en rajouter si vous voulez
          ];
          // Choisi une image random dans la liste ci-dessus.
          const response = wallpapers[Math.floor(Math.random() * wallpapers.length)];
          message.channel.send("Voici votre gif <:naruto:819256184639848448> Naruto <@" + message.author.id + "> : " + response);
         }

// La commande [PREFIX]clear
         if (!message.content.startsWith(prefix) || message.author.bot) return;

         const args = message.content
           .toLowerCase()
           .slice(prefix.length)
           .trim()
           .split(/\s+/);
         const [command, input] = args;
       
         if (command === 'clear') {
           if (!message.member.hasPermission('MANAGE_MESSAGES')) {
             return message.channel
               .send(
                 "Désolé, mais vous devez avoir la permission `manage_messages`/`Gérer les messages`!",
               );
           }
       
           if (isNaN(input)) {
             return message.channel
               .send('Merci d\'écrire le nombre de messages à supprimer.')
               .then((sent) => {
                 setTimeout(() => {
                   sent.delete();
                 }, 2500);
               });
           }
       
           if (Number(input) < 0) {
             return message.channel
               .send('Entrer un nombre valide. (1 -> 100)')
               .then((sent) => {
                 setTimeout(() => {
                   sent.delete();
                 }, 2500);
               });
           }
       
           // Supprime les messages
           const amount = Number(input) > 100
             ? 101
             : Number(input) + 1;
       
           message.channel.bulkDelete(amount, true)
           .then((_message) => {
             message.channel
               .send(`Le bot a supprimé \`${_message.size - 1}\` messages 🧹`)
               .then((sent) => {
                 setTimeout(() => {
                   sent.delete();
                 }, 2500);
               });
           });
         }
    //    La commande [PREFIX]help clear
         if (command === 'help' && input === 'clear') {
           const helpclear = new Discord.MessageEmbed()
             .setColor('#00B2B2')
             .setTitle(`**Infos sur la commande ${prefix}clear**`)
             .setDescription(
               `Cette commande permet de supprimer des messages. Voici la syntaxe à suivre : \`${prefix}clear 5\`.`,
             )
             .setImage(
                `https://cdn.discordapp.com/emojis/753299199553962024.gif?v=1`
             )
             .setFooter(
               `Demandé par ${message.author.tag}`,
               message.author.displayAvatarURL(),
             )
             .setTimestamp();
       
           message.channel.send(helpclear);
         }
    //    La commande [PREFIX]help naruto
         if (command === 'help' && input === 'naruto') {
            const helpclear = new Discord.MessageEmbed()
              .setColor('#00B2B2')
              .setTitle(`**Infos sur la commande ${prefix}naruto**`)
              .setDescription(
                `Cette commande permet d'envoyer des gifs de Naruto.`,
              )
              .setImage(
                 `https://thumbs.gfycat.com/ElegantHalfBlackmamba-max-1mb.gif`
              )
              .setFooter(
                `Demandé par ${message.author.tag}`,
                message.author.displayAvatarURL(),
              )
              .setTimestamp();
        
            message.channel.send(helpclear);
          }

          if (command === 'help' && input === 'tamere') {
            const helptamere = new Discord.MessageEmbed()
              .setColor('#00B2B2')
              .setTitle(`**Infos sur la commande ${prefix}tamere**`)
              .setDescription(
                `Cette commande permet d'envoyer des blagues sur les mères.`,
              )
              .setImage(
                 `https://media1.tenor.com/images/637c51249474316ff5f4dc908a7fcbf9/tenor.gif?itemid=10711117`
              )
              .setFooter(
                `Demandé par ${message.author.tag}`,
                message.author.displayAvatarURL(),
              )
              .setTimestamp();
        
            message.channel.send(helptamere);
          }
              //    La commande [PREFIX]help ban
         if (command === 'help' && input === 'ban') {
            const helpclear = new Discord.MessageEmbed()
              .setColor('#00B2B2')
              .setTitle(`**Infos sur la commande ${prefix}ban**`)
              .setDescription(
                `Cette commande permet de bannir des personnes. Voici la syntaxe à suivre : ${prefix}ban __membre à ban__.`,
              )
              .setImage(
                 `https://cdn.discordapp.com/emojis/747907312022454344.gif?v=1`
              )
              .setFooter(
                `Demandé par ${message.author.tag}`,
                message.author.displayAvatarURL(),
              )
              .setTimestamp();
        
            message.channel.send(helpclear);
          }
// La commande [PREFIX]ban
            if (message.content.startsWith(`${prefix}ban`)) {
              const args = message.content.slice(prefix.length).trim().split(' ');
              const command = args.shift().toLowerCase();
              if (!args.length) {
                return message.channel.send(`Veuillez entrer le nom de la personne à bannir !`);
              }
                let member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.channel.send(`:wave: ${member.displayName} à bien été banni.`);
                }).catch(() => {
                    if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
                        message.reply("Vous devez avoir la permission `BAN_MEMBERS`");
                    } else if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
                        message.reply("Vous ne pouvez pas bannir cette personne.");
                    }
                })
                
            }
            // La commande [PREFIX]invite
            if (message.content.startsWith(`${prefix}invite`)) {
                const inviteembed = new Discord.MessageEmbed()
                  .setColor('#00B2B2')
                  .setTitle(`**Invitation**`)
                  .setDescription(
                    `Voici mon lien d'invitation : https://discord.com/oauth2/authorize?client_id=` + botid + `&scope=bot&permissions=2046258423`,
                  )
                  .setImage(
                     `https://cdn.discordapp.com/emojis/739437486467579966.gif?v=1`
                  )
                  .setFooter(
                    `Demandé par ${message.author.tag}`,
                    message.author.displayAvatarURL(),
                  )
                  .setTimestamp();
            
                  message.author.send(inviteembed);
                  message.channel.send(`Je vous ai envoyé mon lien d'invitation en message privé ${message.author} !`)
              }

              if (message.content.startsWith(`${prefix}getbot`)) {
                const inviteembed = new Discord.MessageEmbed()
                  .setColor('#00B2B2')
                  .setTitle(`**Invitation**`)
                  .setDescription(
                    `Voici mon lien d'invitation : https://discord.com/oauth2/authorize?client_id=` + botid + `&scope=bot&permissions=2046258423`,
                  )
                  .setImage(
                     `https://cdn.discordapp.com/emojis/739437486467579966.gif?v=1`
                  )
                  .setFooter(
                    `Demandé par ${message.author.tag}`,
                    message.author.displayAvatarURL(),
                  )
                  .setTimestamp();
            
                  message.channel.send(inviteembed);
              }
// La commande [PREFIX]help kick
              if (command === 'help' && input === 'kick') {
                const helpkick = new Discord.MessageEmbed()
                  .setColor('#00B2B2')
                  .setTitle(`**Infos sur la commande ${prefix}kick**`)
                  .setDescription(
                    `Cette commande permet de kick des personnes. Voici la syntaxe à suivre : ${prefix}kick __membre à kick__.`,
                  )
                  .setImage(
                     `https://cdn.discordapp.com/emojis/755533155775021117.gif?v=1`
                  )
                  .setFooter(
                    `Demandé par ${message.author.tag}`,
                    message.author.displayAvatarURL(),
                  )
                  .setTimestamp();
            
                message.channel.send(helpkick);
              }
              // La commande [PREFIX]help ping
              if (command === 'help' && input === 'ping') {
                const helpkick = new Discord.MessageEmbed()
                  .setColor('#00B2B2')
                  .setTitle(`**Infos sur la commande ${prefix}ping**`)
                  .setDescription(
                    `Cette commande permet de verifier la latence (ou ping) du bot et de l'API de Discord.`,
                  )
                  .setImage(
                     `https://cdn.discordapp.com/attachments/819885794872393728/819970142565040208/2859b7c99f56fe22827916c529ccac86.png`
                  )
                  .setFooter(
                    `Demandé par ${message.author.tag}`,
                    message.author.displayAvatarURL(),
                  )
                  .setTimestamp();
            
                message.channel.send(helpkick);
              }
              
              // La commande [PREFIX]tamere
              if (message.content.startsWith(prefix + "tamere")) {

                // Liste des blagues
                
                  const tamere = [
                   'Ta mère a tellement mauvaise haleine qu\'on a l\'impression qu\'elle a l\'anus derrière les dents.',
                   'Ta mère est tellement moche que quand on demande à son chien si il la connaît, il dit non.',
                   'Ta mère est tellement vieille que quand un policier lui demande sa carte d\'identité, elle tend une pierre.',
                   'Ta mère elle est tellement ridée que même Jeanne Calment la prend pour sa grand-mère.',
                   'Ta mère est tellement grosse qu\'elle utilise des autocars comme patins à roulettes.',
                   'Ta mère est tellement grosse qu\'on peut même pas mettre son poids dans une variable type double.',
                   'Ta mère est tellement bête qu\'elle met un timbre sur son écran d\'ordinateur pour envoyer un e-mail.',
                   // Vous pouvez en rajouter si vous voulez
                  ];
                  // Choisi une blague random dans la liste ci-dessus.
                  const response = tamere[Math.floor(Math.random() * tamere.length)];
                  message.channel.send("Voici votre blague <@" + message.author.id + "> : \n" + response);
                 
              }
              if (message.content.startsWith(prefix + 'avatar')) {
                let user = message.mentions.users.first();
                if(!user) user = message.author;
                let color = message.member.displayHexColor;
                if (color == '#000000') color = message.member.hoistRole.hexColor;
                const embed = new Discord.MessageEmbed()
                                .setImage("https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".png")
                                .setColor(color)
                 message.channel.send({embed});
              }
              if (message.content.startsWith(prefix + 'gifavatar')) {
                let user = message.mentions.users.first();
                if(!user) user = message.author;
                let color = message.member.displayHexColor;
                if (color == '#000000') color = message.member.hoistRole.hexColor;
                const embed = new Discord.MessageEmbed()
                                .setImage("https://cdn.discordapp.com/avatars/"+user.id+"/"+user.avatar+".gif")
                                .setColor(color)
                 message.channel.send({embed});
              }
              // La commande [PREFIX]prefix
              if (message.content.startsWith(prefix + "prefix")) {
                message.channel.send("Mon prefix est : `" + prefix + "`.")
              }
              // La commande [PREFIX]say <message>
              if(message.content.startsWith(prefix + "say")) {
                let sendMessage = message.content.substring(4);

                let sendChannel = Client.channels.cache.get(message.channel.id);
        
                sendChannel.send("**<@" + message.author.id + ">** : " + sendMessage)
                message.delete();
              }
              // La commande [PREFIX]support
                if(message.content.startsWith(prefix + "support")) {
                  const supportembed = new Discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setTitle('Support de ' + botname)
                  .setURL(supportserver)
                  .setDescription('Voici le serveur support de ' + botname + " : " + supportserver)
                  .setThumbnail('https://cdn.discordapp.com/emojis/790005127700152340.png?v=1')
                  .setTimestamp()
                  .setFooter('', 'https://cdn.discordapp.com/emojis/781666474611834921.png?v=1');
                message.channel.send(supportembed)
              }
  if(message.content.startsWith(prefix + "serverinfo")) {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(`**${message.author.username}**, vous devez avoir la permission "\`MANAGE_GUILD\`" !`)
    } else {
      
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name)
    .setColor(3447003)
    .setDescription(`Créateur : ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
    .setThumbnail(message.guild.iconURL())
    .addField('Nombre de membres :', `${message.guild.memberCount}`, true)
    .addField('Considéré AFK au bout de :', `${message.guild.afkTimeout / 60} minutes`, true)
    .addField('Serveur en :', message.guild.region, true)
    .addField('Créer le :', message.guild.createdAt.toLocaleString(), true)
    .setTimestamp()
    .setFooter(Client.user.username, Client.user.avatarURL);
  
    message.channel.send({embed});
    };

  }
	
	
      
});

Client.login(token);
