// Les paramètres

const Discord = require("discord.js");
const Client = new Discord.Client;
const prefix = "le prefix de votre bot";
const botname = "Le nom de votre bot"
const website = "Le site du bot"
const statut = `Le statut du bot`
const botid = `L'id du bot`
const token = "Le token du bot"

// Envoie un message dès que le bot est bien allumé
Client.on("ready", () => {
    console.log("Bot allumé !");
});

Client.on("ready", () => {
    Client.user.setActivity(statut, { type: "PLAYING" });
    });

// Les embeds

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(botname + ' - Liste des commandes')
	.setURL(website)
	.setDescription('**😆 Commandes fun:**\n`' + prefix + 'naruto`,`' + prefix + 'tamere`\n\n**👮‍♂️Commandes modération :**\n`' + prefix + 'clear`,`' + prefix + 'ban`\n\n**⚠️Commandes informatifs :**\n`' + prefix + 'ping`, `' + prefix + 'invite`')
	.setThumbnail('https://cdn.discordapp.com/attachments/818846408530460695/818870621178036274/defaultimage.png')
	.setImage('https://cdn.discordapp.com/attachments/818846408530460695/818871160019615815/embedimage.png')
	.setTimestamp()
	.setFooter(botname + ' - Bot discord modération et fun !', 'https://cdn.discordapp.com/attachments/818846408530460695/818870621178036274/defaultimage.png');


// Les commandes
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

// Commande [PREFIX]ping
    if(message.content == prefix + "ping"){
        message.channel.send(`🏓Le ping du bot est de ${Date.now()-message.createdTimestamp}ms. Le ping de l'API est de ${Math.round(Client.ws.ping)}ms`);
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
                  message.channel.send("Voici votre blague (ou peut être réalité 👀) <@" + message.author.id + "> : \n" + response);
                 }
      
});

Client.login(token);
