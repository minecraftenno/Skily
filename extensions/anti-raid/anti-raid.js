// A ne surtout pas toucher
const Discord = require("discord.js");

// Paramètres
const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} }); // Enlever tout la ligne apres "Discord.Client" si vous ne voulez pas que votre bot s'affiche en mode mobile
const prefix = "Prefix de votre bot";
const botname = "Nom de votre bot"
const botid = `L'id de votre bot`
const token = "Token de votre bot";
const supportserver = "Le serveur support de votre bot" // Si vous n'en avez pas, merci de mettre votre site !

// Envoie un message dès que le bot est bien allumé
client.on("ready", () => {
    console.log("L'extension à bien été mise au bot " + client.user.username + " !");
});

// is_url function start
function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(regexp.test(str)) {
      return true;
    } else {
      return false;
    }
    
  }

  
// STOP

client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      if (regex.exec(message.content)) 
          await message.channel.send(
            "Désolé, mais le créateur de " + message.guild.name +" à désactiver les liens sur ce serveur"
          );
    }
    
if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    // Verifie si le message envoyé à un lien à l'interieur
    if(is_url(message.content) === true) {
        // Supprime le message en question
        message.delete()
        // Previent que vous avez activé le mode "antiraid"
        return message.channel.send("Désolé, mais le créateur de " + message.guild.name +" à désactiver les liens sur ce serveur.")
      }
    }
      
    //    La commande [PREFIX]help anti-raid
    if(message.content.startsWith(prefix + 'help anti-raid')) {
        const helpclear = new Discord.MessageEmbed()
          .setColor('#00B2B2')
          .setTitle(`**L'extension "anti-raid"**`)
          .setDescription(
            `Cette extension permet de protèger vos serveurs. Ce mode comprend : un anti-lien, un anti-spam, un raidmode etc...`,
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
    
});

client.login(token)
