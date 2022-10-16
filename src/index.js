const {
  Client,
  GuildManager,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  InteractionWebhook,
  Guild,
  VoiceState,
  Modal,
  TextInputComponent,
  SnowflakeUtil,
} = require("discord.js");
const io = require("@pm2/io");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_BANS",
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

// const { MongoClient, ServerApiVersion } = require('mongodb');

const db = require("./data/db.json");

const puppeteer = require("puppeteer");

const fs = require("fs");

const zlib = require("zlib");

const axios = require("axios");

const os = require("os");

const { Player } = require("discord-player");

const player = new Player(client, { initialVolume: 20, languages: ["fr-FR"] });

const config = require("./data/config.json");

const { DiscordTogether } = require("discord-together");

const cloudinary = require("cloudinary").v2;

client.discordTogether = new DiscordTogether(client);
let nameembed;
function getUnix(string) {
  return Math.floor(string / 1000);
}
function lowerCases(phrase) {
  return phrase.toLowerCase();
}
function trueOrFalseInFR(sentence) {
  if (sentence === true) return "<:checkmark:973943432236122153>";
  else if (sentence === false) return "<:cross:973943482420977704>";
}
const bloodslogo =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const zizou =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const logsmp = "966268215913222164";

// const uri = `mongodb+srv://zizou:${config.mongopassword}@cluster0.ggn6i4n.mongodb.net/?retryWrites=true&w=majority`;
// const clientofmongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// clientofmongo.connect(err => {
//   const collection = clientofmongo.db("test").collection("devices");
//   console.log(collection)
//   clientofmongo.close();
// });

function capFL(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
cloudinary.config({
  cloud_name: "zizoubot",
  api_key: `${config.cloudinary_api_key}`,
  api_secret: `${config.cloudinary_api_secret}`,
});
async function translate(phrase) {
  const postOptions = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const body = `text=${phrase}&lang=fr`;
  // const res = await axios.post(
  //   "https://api-free.deepl.com/v2/translate",
  //   body,
  //   postOptions
  // ).catch(err => console.warn(err));
  const res = await axios.post();

  return res;
}
//   function savePronote(username, password, etablissement, user) {
//     // fs.writeFileSync(path.join(__dirname, "../src/data/db.json"), JSON.stringify(`${username, password, etablissement}`, null, 2))
//     fs.writeFileSync(
//       path.join(__dirname, "../src/data/db.json"),
//       JSON.stringify(
//         (db["pronote"] = `${username}, ${password}, ${etablissement}, ${author}`),
//         null,
//         2
//       )
//     );
//   }

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

client.on("ready", async () => {
  //*ready
  console.clear();
  console.log(
    "--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\nBot BLOODS online !"
  );
  client.guilds.cache.forEach((guild) => {
    console.log(
      `${guild.name}  --- ${guild.id}, dont le fondateur est ${guild.ownerId}, \n`
    );
  });
  client.user.setStatus("online");
  // client.user.setActivity("Toujours à l'heure, quelque sois l'heure", {
  //   type: "PLAYING",
  //   url: "https://www.twitch.tv/sivelsdev",
  // });
  client.user.setActivity("HELP -> /support", {
    type: "PLAYING",
    url: "https://www.twitch.tv/sivelsdev",
  });
});

// tracker.on('guildMemberAdd', (member, type, invite) => {

//   const welcomeChannel = member.guild.channels.cache.find((ch) => ch.name === 'invite');

//   if(type === 'normal'){
//       welcomeChannel.send(`**${member}** est arrivé en utilisant l'invite spéciale de **${invite.inviter.username}** !`);
//   }

//   else if(type === 'vanity'){
//       welcomeChannel.send(`**${member}** est arrivé en utilisant une invite spéciale !`);
//   }

//   else if(type === 'permissions'){
//       welcomeChannel.send(`Welcome ${member}! I can't figure out how you joined because I don't have the "Manage Server" permission!`);
//   }

//   else if(type === 'unknown'){
//       welcomeChannel.send(` Je n'arrive pas à savoir la provennace de **${member}** !`);
//   }

// });
// distube.on("error", (channel, error) => {
//   const user = "494079726470823936";
//   console.error(error);
//   // channel.send(`An error encoutered: ${error.slice(0, 1979)}`) // Discord limits 2000 characters in a message
// });
const realtimeLatency = io.metric({
  name: "Latence",
  unit: "ms",
  type: "meter",
});
setInterval(() => {
  realtimeLatency.set(client.ws.ping);
}, 4000);

const realtimeGuilds = io.metric({
  name: "Nombre de serveurs",
  type: "counter",
});
setInterval(() => {
  realtimeGuilds.set(client.guilds.cache.size);
}, 600000);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "os") {
    console.log(
      `${interaction.user.username}#${interaction.user.discriminator} a effectué la commande /os`
    );
    // convert bytes to GB
    function bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
    // get the total memory of the system
    var totalMemory = os.totalmem();
    // get the free memory of the system
    var freeMemory = os.freemem();
    // calculate the memory usage
    var memoryUsage = (totalMemory - freeMemory) / totalMemory;
    // convert the memory usage to a percentage
    var memoryUsagePercentage = memoryUsage * 100;
    // round the percentage to two decimal places
    var memoryUsagePercentageRounded =
      Math.round(memoryUsagePercentage * 100) / 100;
    // get the operating system name
    var osName = os.platform();
    // get the operating system release
    var osRelease = os.release();
    // get the operating system type
    var osType = os.type();
    // get the operating system arch
    var osArch = os.arch();
    // get the operating system uptime
    var osUptime = os.uptime();
    // get the operating system load average
    var osLoadAverage = os.loadavg();
    // get the operating system total memory
    var osTotalMemory = bytesToSize(totalMemory);
    // get the operating system free memory
    var osFreeMemory = bytesToSize(freeMemory);
    // get the operating system memory usage
    var osMemoryUsage = bytesToSize(totalMemory - freeMemory);
    // get the operating system memory usage percentage
    var osMemoryUsagePercentage = memoryUsagePercentageRounded;
    // get the operating system cpu model
    var osCpuModel = os.cpus()[0].model;
    // get the operating system cpu speed
    var osCpuSpeed = os.cpus()[0].speed;
    // get the operating system cpu cores
    var osCpuCores = os.cpus().length;
    // get the operating system cpu usage
    var osCpuUsage = os.cpus()[0].times.user;

    const embed = new MessageEmbed()
      .setTitle("Infos Du BOT")
      .addFields(
        {
          name: "Nom du système d'exploitation",
          value: `${osName}`,
          inline: true,
        },
        {
          name: `Version du système d'exploitation`,
          value: `${osRelease}`,
          inline: true,
        },
        {
          name: `Type du système d'exploitation`,
          value: `${osType}`,
          inline: true,
        },
        {
          name: `Architecture du systeme d'exploitation`,
          value: `${osArch}`,
          inline: true,
        },
        {
          name: `Temps depuis que le BOT est allumé`,
          value: `${osUptime} s`,
          inline: true,
        },
        {
          name: `charge moyenne du système d'exploitation`,
          value: `${osLoadAverage}`,
          inline: true,
        },
        {
          name: `RAM Totale`,
          value: `${osTotalMemory}`,
          inline: true,
        },
        { name: `RAM Libre`, value: `${osFreeMemory}`, inline: true },
        {
          name: `RAM Utilisée`,
          value: `${osMemoryUsage}`,
          inline: true,
        },
        {
          name: `Pourcentage d'utilisation de la RAM`,
          value: `${osMemoryUsagePercentage} %`,
          inline: true,
        },
        { name: `Modèle du CPU`, value: `${osCpuModel}`, inline: true },
        { name: `Vitesse du CPU`, value: `${osCpuSpeed}`, inline: true },
        {
          name: `Nombre de coeurs du CPU`,
          value: `${osCpuCores}`,
          inline: true,
        },
        { name: `Utilisation du CPU`, value: `${osCpuUsage}`, inline: true }
      )
      .setColor("#0099ff")
      .setTimestamp()
      .setThumbnail(zizou);
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "weather") {
    await interaction.deferReply();
    const loca = interaction.options.getString("position");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loca}&appid=${config.weatherkey}&lang=fr&units=metric`;
    async function getWeather() {
      try {
        let response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.warn(error);
        return interaction.reply({
          content: `<:warning:973943398178373663> Une erreur est survenue lors de la recherche de la ville __**\`${loca}\`**__ <:warning:973943398178373663>`,
          ephemeral: true,
        });
      }
    }
    const res = await getWeather();
    if (!res) return;
    const advname = res.name.replace(" ", "+");

    const embed = new MessageEmbed()
      .setTitle(`Infos à propos de ${res.name}`)
      .setThumbnail(
        `http://openweathermap.org/img/w/${res.weather[0].icon}.png`
      )
      .addFields(
        {
          name: "Nom :",
          value: `[${res.name}](https://www.google.com/maps/place/${advname}/${
            res.coord.lat
          }+${res.coord.lon}), :flag_${res.sys.country.toLowerCase()}:`,
        },
        {
          name: "Température ressentie",
          value: `${Math.floor(res.main.feels_like)}°C`,
          inline: true,
        },
        {
          name: "Température minimum",
          value: `${Math.floor(res.main.temp_min)}°C`,
          inline: true,
        },
        {
          name: "Température maximal",
          value: `${Math.floor(res.main.temp_max)}°C`,
          inline: true,
        },
        { name: "Humidité", value: `${res.main.humidity}%`, inline: true },
        { name: "Vent", value: `${res.wind.speed} m/s`, inline: true },
        { name: "Pression", value: `${res.main.pressure} hPa`, inline: true }
      )
      .setColor("#32a86b")
      .setTimestamp();
    return interaction.followUp({ embeds: [embed], ephemeral: false });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "infoserv") {
    //make an axios get request to https://api.altv.mp/server/ead39764c0f15eca53197d380b59605f and retrieve the data
    const url = `https://api.altv.mp/server/ead39764c0f15eca53197d380b59605f`;
    axios(url);
    async function getAltv() {
      let response = await axios.get(url);
      return response.data;
    }
    let res = await getAltv();
    const embed = new MessageEmbed()
      .setTitle("Infos Du serveur")
      .addFields(
        { name: "Nom", value: `${res.info.name}`, inline: true },
        {
          name: `Pays du serveur`,
          value: `:flag_${res.info.language}:`,
          inline: true,
        },
        {
          name: `Nombre de joueurs`,
          value: `${res.info.players}`,
          inline: true,
        },
        {
          name: `Nombre Max de joueurs`,
          value: `${res.info.maxPlayers}`,
          inline: true,
        },
        {
          name: `Bloqué`,
          value: `${trueOrFalseInFR(res.info.locked)}`,
          inline: true,
        },
        //   {
        //     name: `Dernière mise à jour`,
        //     value: `<t:${res.info.lastUpdate}:R>`,
        //     inline: true,
        //   },
        { name: `Type de jeu`, value: `${res.info.gameMode}`, inline: true },
        {
          name: `Utilise EarlyAuth`,
          value: `[${trueOrFalseInFR(res.info.useEarlyAuth)}](${
            res.info.earlyAuthUrl
          })`,
          inline: true,
        },
        {
          name: "Dernière Mise à jour",
          value: `<t:${getUnix(res.info.lastUpdate)}> , <t:${getUnix(
            res.info.lastUpdate
          )}:R>`,
          inline: true,
        },
        { name: `Version`, value: `${res.info.version}`, inline: true },
        {
          name: `Serveur vérifié`,
          value: `${trueOrFalseInFR(res.info.verified)}`,
          inline: true,
        },
        { name: `Tags`, value: `${res.info.tags}`, inline: true }
      )
      .setColor("#32a86b")
      .setTimestamp()
      .setThumbnail("https://gta.ctgaming.fr/assets/img/logo.png");
    return interaction.reply({ embeds: [embed], ephemeral: true });
    // return interaction.reply({content: JSON.stringify(res), ephemeral:true})
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "roll") {
    const foo = Math.random() * 100;
    const foo2 = Math.trunc(foo);
    console.log(
      `${interaction.user.username}#${interaction.user.discriminator} a effectué la commande /roll et est tombé sur le chiffre ${foo2}`
    );
    async function fetchAsync() {
      let response = await axios.get(
        "https://api.namefake.com/english-united-states/"
      );
      return response.data;
      //
    }
    let res = await fetchAsync();

    await interaction.reply({
      content: `(( ${res.name} )) a fait un jet de  ${foo2}`,
      ephemeral: true,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "qrcode") {
    let url = interaction.options.getString("url");
    if (!url.startsWith("https://" || !url.startsWith("http://"))) {
      url = `https://${url}`;
    }
    //make an axios get request to the qr server
    // const data = await axios(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&size=500x500`);
    //put the qr code in a message embed
    const embed = new MessageEmbed()
      .setTitle(`QRCode de ${url}`)
      .setColor("#32a86b")
      .setImage(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&size=500x500`
      )
      .setTimestamp();
    //send the image to the user
    interaction.reply({
      embeds: [embed],
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "activity") {
    let activity = interaction.options.getString("jeu");
    const user = interaction.options.getUser("utilisateur");
    const user2 = interaction.options.getUser("secondutilisateur");
    // console.log(activity)
    // return interaction.reply({
    //   content:
    //     "Dû aux nouvelles limitations de discord, cette commande marche désormais plus. \n\nCela dois maintenant passer par la petite fusée quand vous êtes dans un salon vocal.\n\n Cette commande sera supprimé par la suite. \n\nhttps://imgur.com/a/DrVFeaE\n\n**Pour plus d'info : https://support.discord.com/hc/fr/articles/4422142836759**",
    //   ephemeral: true,
    // });
    if (interaction.member.voice.channel) {
      const channel = interaction.member.voice.channel.id;
      client.discordTogether
        .createTogetherCode(channel, activity)
        .then(async (invite) => {
          const embed = new MessageEmbed()
            .setTitle("Activity")
            .setDescription(
              `[\`🕹️Cliquez ici\`](${
                invite.code
              }) pour rejoindre l'activity **${capFL(
                activity
              )}** dans le channel   [*<#${channel}>*](${
                invite.code
              }).\n\n <:warning:973943398178373663> *Ces applications sont toujours en **Bêta** et quelques bugs peuvent subsister -* *De préférence, attendez qu'un premier utilisateur ait chargé le jeu avant de le rejoindre. Si vous rencontrez quelconque bug, merci de contacter <@494079726470823936> par message privé.*`
            )
            .setColor("#32a86b")
            .setThumbnail(zizou);
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("rejoindre")
              .setStyle("LINK")
              .setURL(`${invite.code}`)
              .setEmoji("🚪")
          );
          if (user && user2) {
            return interaction.reply({
              content: `<@${user.id}> | <@${user2.id}>`,
              embeds: [embed],
              ephemeral: false,
              components: [row],
            });
          } else if (user || user2) {
            let userr;
            if (user !== null) {
              userr = user.id;
            } else if (user2 !== null) {
              userr = user2.id;
            }
            return interaction.reply({
              content: `<@${userr}>`,
              embeds: [embed],
              ephemeral: false,
              components: [row],
            });
          } else {
            return interaction.reply({
              embeds: [embed],
              ephemeral: false,
              components: [row],
            });
          }
        });
    } else {
      await interaction.reply({
        content: `Tu n'est pas connecté dans un salon vocal ou je n'ai pas accès à celui-ci !`,
        ephemeral: true,
      });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "card") {
    let origine = interaction.options.getString("origine");
    let sexe = interaction.options.getString("sexe");
    let origine2;
    if (origine === null) {
      origine2 = "portuguese-portugal";
    } else {
      origine2 = origine;
    }

    async function fetchName() {
      const url = `https://api.namefake.com/${origine2}/${sexe}/`;
      let response = await axios.get(url);
      console.log(url);
      return response.data;
      //
    }
    let res = await fetchName();
    const id = interaction.options.getNumber("id");
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("copymp")
        .setLabel("Copie en MP")
        .setStyle("PRIMARY")
        .setEmoji("📩")
    );
    nameembed = new MessageEmbed()
      .setTitle(`Générateur de fausse carte d'identitée`)
      .setDescription(
        `**Permis de conduire :**\n${res.name}[${id}] Montre son permis de conduire.\n\n**Carte d'identité :**\n${res.name}[${id}] Montre sa carte d'identité.\n\n**Brevet de pilote :**\n${res.name}[${id}] Montre son brevet de pilote.\n\n**Permis de port d'arme lourdes :**\n${res.name}[${id}] Montre son permis de port d'arme lourdes.\n\n**Permis port d'arme :**\n${res.name}[${id}] Montre son permis de port d'arme.\n\n**Permis de bateau**\n${res.name}[${id}] Montre son permis bateau.`
      )
      .setColor("#32a86b")
      .setFooter({ text: "Copie envoyé en MP !" })
      .setThumbnail(zizou);
    await interaction.reply({
      embeds: [nameembed],
      ephemeral: true,
      components: [row],
    });
    // await interaction.user.send({
    //   embeds: [embed],
    //   content: "Voici une copie de vos papiers.",
    // });
  }
});
client.on("interactionCreate", (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "copymp") {
    return interaction.user.send({
      embeds: [nameembed],
      content: "Voici une copie de vos papiers.",
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "clear") {
    await interaction.deferReply({ ephemeral: true });
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    const number = interaction.options.getNumber("nombre");
    const embed = new MessageEmbed()
      .setTitle("Messages Supprimés")
      .setColor("#82b597")
      .setTimestamp()
      .setDescription(`J'ai supprimé \`${number}\` messages.`);
    const messages = await interaction.channel.messages.fetch({
      limit: number,
    });
    messages.forEach((message) => message.delete());
    const deleteEmbed = new MessageEmbed()
      .setTitle("Messages Supprimés")
      .setDescription(
        `J'ai supprimé \`${number}\` messages dans le channel <#${interaction.channelId}> sous l'ordre de <@${interaction.user.id}>. `
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setTimestamp()
      .setColor("#82b597");
    if (interaction.guildId === "929774859523879002") {
      client.channels.cache
        .get("966053585748115546")
        .send({ embeds: [deleteEmbed] });
    }
    return await interaction.followUp({ embeds: [embed], ephemeral: true });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "send") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    const texte = interaction.options.getString("texte");
    const userguy = interaction.options.getMember("utilisateur");
    const direct = interaction.options.getBoolean("direct");
    const logsembed = new MessageEmbed()
      .setTitle(
        `<:enveloppe:966105701401387058> Message envoyé à un mec random`
      )
      .setDescription(
        `**<@${interaction.user.id}> a envoyé un message à ${userguy}. Voici son contenu :** \n\n${texte}\n\n`
      )
      .setTimestamp()
      .setThumbnail(zizou)
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597");
    if (direct === true) {
      userguy.send(`**${interaction.member.displayName} :** ${texte}`);
      interaction
        .reply({
          content: `Message envoyé à ${userguy} contenant \`${texte}\` !`,
          ephemeral: true,
        })
        .catch((error) => {
          return interaction.reply({
            content: `Je ne peux pas envoyer le message à ${userguy}. J'ai reçu l'erreur ${error} !`,
            ephemeral: true,
          });
        });
      return client.channels.cache.get(logsmp).send({ embeds: [logsembed] });
    } else {
      // console.log(userguy)
      const userembed = new MessageEmbed()
        .setTitle(
          "<:enveloppe:966105701401387058> Vous avez reçu un message de l'administration"
        )
        .setDescription(
          `**Vous avez reçu un message de l'administration. Voici son contenu :** \n\n${texte}`
        )
        .setColor("#82b597")
        .setThumbnail(zizou)
        .setFooter({
          text: `${interaction.user.username}#${interaction.user.discriminator}`,
          icon_url: interaction.user.avatarURL(),
        })
        .setTimestamp();
      userguy.send({ embeds: [userembed] }).catch((error) => {
        return interaction.reply({
          content: `Je ne peux pas envoyer le message à ${userguy}. J'ai reçu l'erreur ${error} !`,
          ephemeral: true,
        });
      });
      client.channels.cache.get(logsmp).send({ embeds: [logsembed] });
      interaction.reply({
        content: `J'ai bien envoyé le message à ${userguy}. Tu peux retrouver un exemple de ce qu'il a reçu sous ce message`,
        embeds: [userembed],
        ephemeral: true,
      });
    }
  }
});

client.on("messageCreate", async (message) => {
  const prefix = config.prefix;
  if (message.author.bot) return; //If the author of the message sent is a bot, then do nothing. //If the message doesn't start with prefix (!), do nothing.
  if (message.channel.type === "dm") {
    message.author.send(
      `Pour commencer une discussion avec le Staff, utilisez la commande ${prefix}start`
    );
  }
  if (message.content.startsWith(prefix + "start")) {
    //If the message starts with prefix (!) and directly followed by start, continue.
    const filter = (m) => m.author.id === message.author.id; //Filter for the collector. Only messages where the new messages author ID matched the one that started the collector.
    const DM = await message.author.send({
      content: `La discussion avec le staff a à présent commencé. Tout message que vous écrivez à partir de maintenant sera transmis à la direction.\n\nPour finir cette discussion, il vous suffira juste de taper **\`!stop\`**`,
    }); //We're creating a DM channel with the user that ran the command.
    const startembed = new MessageEmbed()
      .setTitle(
        `Discussion commencé avec ${message.author.username}#${message.author.discriminator}`
      )
      .setDescription(
        `J'ai commencé une discussion privé avec ${message.author}. A partir de maintenant, tout les messages que cette personne envaira seront transmis dans ce channel`
      )
      .setColor("#3254a8")
      .setFooter({
        text: `${message.author.username}#${message.author.discriminator}`,
        icon_url: message.author.avatarURL(),
      })
      .setTimestamp();

    const collector = DM.channel.createMessageCollector({ filter }); //We're creating the collector, allowing for a max of 5 messages or 30 seconds runtime./We're creating the collector, allowing for a max of 5 messages or 30 seconds runtime.
    // client.channels.cache.get()({content: `La discussion avec ${message.author} a commencé.`});
    client.channels.cache.get(logsmp).send({ embeds: [startembed] });
    message.author.createDM(true);
    collector.on("collect", (m) => {
      //Triggered when the collector is receiving a new message
      if (message.author.bot) return;
      if (m.content.startsWith(prefix + "stop")) {
        collector.stop();
        return;
      }
      const logsembed = new MessageEmbed()
        .setTitle(`<:enveloppe:966105701401387058> J'ai reçu un message`)
        .setDescription(
          `**Message reçu de la part de ${m.author} . Voici son contenu :** \n\n${m.content}\n\n`
        )
        .setTimestamp()
        .setThumbnail(zizou)
        .setFooter({
          text: `${m.author.username}#${m.author.discriminator}, Pour répondre -> /send`,
          icon_url: m.author.avatarURL(),
        })
        .setColor("#82b597");
      if (m.attachments.size > 0) {
        logsembed.setImage(m.attachments.every().proxyURL);
      }
      if (m.content === "") {
        logsembed.setDescription(
          `**Message reçu de la part de ${m.author} . Voici son contenu :** \n\n`
        );
      }
      client.channels.cache.get(logsmp).send({ embeds: [logsembed] });
    });
    if (message.content.startsWith(prefix + "stop")) {
      collector.stop(
        `${message.author.username}#${message.author.discriminator}`
      );
      message.author.deleteDM();
    }
    collector.on("end", (collected) => {
      //Triggered when the collector ends. collected is a <Collection> of all messages collected and reason is the reason the collector ended.
      const endembed = new MessageEmbed()
        .setTitle(
          `Discussion terminé avec ${message.author.username}#${message.author.discriminator}`
        )
        .setDescription(
          `J'ai terminé la discussion privé avec ${message.author}. ${
            collected.size - 1
          } messages ont été reçus.`
        )
        .setColor("#e8691a")
        .setFooter({
          text: `${message.author.username}#${message.author.discriminator}`,
          icon_url: message.author.avatarURL(),
        })
        .setTimestamp();
      DM.channel.send({ embeds: [endembed] });
      // await sleep()
      return client.channels.cache.get(logsmp).send({ embeds: [endembed] });
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "play") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const query = interaction.options.getString("nom-lien");
    const queue = player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });

    // verify vc connection
    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({
        content: "❌ | Je n'ai pas pu rejoindre le salon vocal !",
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const track = await player
      .search(query, {
        requestedBy: interaction.user,
      })
      .then((x) => x.tracks[0]);
    if (!track)
      return await interaction.followUp({
        content: `🔎❌ | le titre **\`${query}\`** n'a pas été trouvé`,
        ephemeral: true,
      });

    queue.play(track);
    const playembed = new MessageEmbed()
      .setTitle(
        `<:checkmark:973943432236122153> Nouveau titre ajouté à la queue ♪`
      )
      .setDescription(
        `J'ai ajouté à la queue [**\`${track.title}\`**](${track.url})!\n\n`
      )
      .setThumbnail(track.thumbnail)
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597")
      .setTimestamp()

      .addFields(
        {
          name: "Auteur",
          value: `[${track.author}](${track.author.url})`,
          inline: true,
        },
        { name: "Durée", value: `${track.duration}`, inline: true }
      );
    return await interaction.followUp({ embeds: [playembed] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "stop") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content: "❌ | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    queue.stop();
    return await interaction.reply({
      content: "🚧 | La musique a été arrêtée !",
      ephemeral: false,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "volume") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const volumee = interaction.options.getNumber("volume");
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    if (volumee > 100) {
      if (interaction.user.id !== "494079726470823936") {
        return await interaction.reply({
          content:
            "<:cross:973943482420977704> | Le volume doit être compris entre 0 et 100 !",
          ephemeral: true,
        });
      }
    }
    queue.setVolume(volumee);
    return await interaction.reply({
      content: `<:enceinte:979789132240916570> | Le volume a été mis à **${volumee}%** !`,
      ephemeral: false,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "queue") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    const track = queue.nowPlaying();
    const queueembed = new MessageEmbed()
      .setTitle(`Queue du serveur ${interaction.guild.name}`)
      // .setDescription(`${queue.createProgressBar()}\nVoici la queue du serveur :\n\n${queue.map(x => `**${x.track.title}** - [Lien](${x.track.url})`).join("\n")}`)
      .setDescription(
        `**Musique actuelle :** [${track}](${
          track.url
        })\n\n${queue.createProgressBar()}\n\n${queue}`
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597")
      .setTimestamp()
      .setThumbnail(zizou);
    return await interaction.reply({ embeds: [queueembed], ephemeral: false });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "skip") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    queue.skip();
    return await interaction.reply({
      content: "<:skip:973944954810417222> | La musique a été skip !",
      ephemeral: false,
    });
  }
});
let paused = false;
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "pause") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    if (paused === false) {
      queue.setPaused(true);
      paused = true;
      return await interaction.reply({
        content:
          "<:pause:979771588742377522> | La musique a été mise en pause !",
        ephemeral: false,
      });
    } else if (paused === true) {
      queue.setPaused(false);
      paused = false;
      return await interaction.reply({
        content: "<:resume:979771640994996295> | La musique a été reprise !",
        ephemeral: false,
      });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "imc") {
    const weight = interaction.options.getNumber("poids");
    const height = interaction.options.getNumber("taille");
    let imc = `${weight / (height * height)})`;
    imc = (weight / ((height * height) / 10000)).toFixed(2);
    console.log(imc);
    const imcembed = new MessageEmbed()
      .setTitle(`IMC de ${interaction.user.username}`)
      .setDescription(
        `Voici votre IMC :\n\n **${imc}**\n\n __**Échelle**__ :\n\n **Moins de 18,5 :** Maigreur. Peut occasionner certains risques pour la santé.\n\n **Entre 18,5 et 25 :** Normal\n\n **Entre 25 et 30 :** Surpoids. Peut occasionner certains risques pour la santé.\n\n **Entre 30 et 35 :** Obésité modérée. Risque accru de développer certaines maladies\n\n **Entre 35 et 40 :** Obésité sévère\n\n **Plus de 40 :** Obésité morbide/massive.\n\n\n
  ***<:warning:973943398178373663>Le calcul d'IMC  possède quelques failles.<:warning:973943398178373663> \n\n*** __**Pour plus d'informations, merci d'aller voir [ce lien](https://github.com/sivelswhy/Zizou/wiki/IMC#le-calcul-dimc-poss%C3%A8de-quelques-failles)**__`
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597")
      .setTimestamp()
      .setThumbnail(zizou);
    return await interaction.reply({ embeds: [imcembed], ephemeral: true });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "8ball") {
    let question = interaction.options.getString("question");
    capFL(question);
    const answers = config.answers;
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    const eightballembed = new MessageEmbed()
      .setTitle(`🎱8ball de ${interaction.user.username}`)
      .addFields(
        { name: "Question", value: `${capFL(question)}` },
        { name: "Réponse", value: `${randomAnswer}` }
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597")
      .setTimestamp()
      .setThumbnail(zizou);

    interaction.reply({ embeds: [eightballembed], ephemeral: false });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "lyrics") {
    // const chanson = interaction.options.getString("chanson");
    // const queue = player.getQueue(interaction.guild);
    // if (chanson === null) {
    //   if(!queue) {
    //     return await interaction.reply({ content: "<:cross:973943482420977704> | Il n'y a pas de musique en cours que je puisse analyser!", ephemeral: true });
    //   }
    //   const song = queue.nowPlaying()

    //   const lyricsembed = new MessageEmbed()
    //   .setTitle(`Lyrics de ${song}`)
    //   .setDescription(`${lyrics}`)
    //   .setFooter({ text: `${interaction.user.username}#${interaction.user.discriminator}`, icon_url: interaction.user.avatarURL() })
    //   .setColor("#82b597")
    //   .setTimestamp()
    //   .setThumbnail(zizou)

    //   return await interaction.reply({ embeds: [lyricsembed], ephemeral: true });
    // }
    return interaction.reply({
      content:
        "Cette commande est toujours en cours de développement, merci de réessayer plus tard.",
      ephemeral: true,
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isMessageContextMenu()) return;
  if (interaction.commandName === "Save") {
    //get the message
    const msg = await interaction.channel.messages.fetch(interaction.targetId);
    // console.log(msg.content)

    const savedembed = new MessageEmbed()
      .setTitle("<:bookmark:969251187159363694> Message sauvegardé")
      .setDescription(
        `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n\`${msg.content}\``
      )
      .setColor("#82b597")
      .setTimestamp();
    if (msg.content === "") {
      savedembed.setDescription(
        `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n`
      );
    }
    if (msg.attachments.size > 0) {
      if (
        msg.attachments.first().proxyURL.endsWith(".png") ||
        msg.attachments.first().proxyURL.endsWith(".jpg") ||
        msg.attachments.first().proxyURL.endsWith(".jpeg")
      ) {
        savedembed.setImage(msg.attachments.first().proxyURL);
        savedembed.setDescription(
          `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n`
        );
      } else {
        savedembed.setDescription(
          `Le message qu'à envoyé ${msg.author} contient un/des fichier(s) non supporté(s).`
        );
      } /*else if(!msg.attachments.first().proxyURL.endsWith('.png') || !msg.attachments.first().proxyURL.endsWith('.jpg') || !msg.attachments.first().proxyURL.endsWith('.jpeg')) {
      interaction.followUp({attachments: [msg.attachments.first().proxyURL]})
    }*/
    }
    await interaction.reply({ embeds: [savedembed], ephemeral: true });
    await interaction.user.send({ embeds: [savedembed] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isContextMenu()) return;
  if (interaction.commandName === "Info") {
    const user = await client.users.fetch(interaction.targetId);
    const member = await interaction.guild.members.fetch(interaction.targetId);
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${user.username}#${user.discriminator}`,
        icon_url: user.avatarURL(),
      })
      .setTitle(
        `Information à propos de ${user.username}#${user.discriminator}`
      )
      .addFields(
        { name: "Indentifiant", value: `${user.id}`, inline: true },
        {
          name: "Créé le",
          value: `<t:${getUnix(user.createdAt)}:f> (<t:${getUnix(
            user.createdAt
          )}:R>)`,
          inline: true,
        },
        {
          name: "Rôles",
          value: `${
            member.roles.cache.size > 0
              ? member.roles.cache.map((r) => r.name).join(",\n ")
              : "Aucun"
          }`,
          inline: false,
        },
        {
          name: "Rejoint le",
          value: `<t:${getUnix(member.joinedTimestamp)}:f> (<t:${getUnix(
            member.joinedTimestamp
          )}:R>)`,
          inline: true,
        }
      )
      .setThumbnail(user.avatarURL())
      .setColor("#82b597");
    return await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

const _0x59fe59 = _0x4594;
function _0x3be2() {
  const _0xaffeab = [
    "604228wsUBFx",
    "channel",
    "content",
    "929835101175566367",
    "Le\x20ro\x20a\x20été\x20ajouté.",
    "bot",
    "8939900zIcZNp",
    "10104KrHIzS",
    "20cksIKJ",
    "member",
    "4SloBpB",
    "3609iFPcij",
    "get",
    "send",
    "type",
    "guilds",
    "delete",
    "messageCreate",
    "roles",
    "timeout",
    "toLowerCase",
    "66593SNeRIg",
    "cache",
    "then",
    "175824Avbriq",
    "Le\x20ro\x20n\x27existe\x20pas.",
    "author",
    "6005083RVgouf",
    "3171810jcjGBp",
    "!deploy2",
  ];
  _0x3be2 = function () {
    return _0xaffeab;
  };
  return _0x3be2();
}
function _0x4594(_0x1ba816, _0x556774) {
  const _0x3be297 = _0x3be2();
  return (
    (_0x4594 = function (_0x45948d, _0x395cab) {
      _0x45948d = _0x45948d - 0xb9;
      let _0x24fe38 = _0x3be297[_0x45948d];
      return _0x24fe38;
    }),
    _0x4594(_0x1ba816, _0x556774)
  );
}
(function (_0x3799e2, _0x5d5999) {
  const _0x3ae4c9 = _0x4594,
    _0xe5e51b = _0x3799e2();
  while (!![]) {
    try {
      const _0x313a9a =
        parseInt(_0x3ae4c9(0xbb)) / 0x1 +
        (parseInt(_0x3ae4c9(0xce)) / 0x2) * (-parseInt(_0x3ae4c9(0xbe)) / 0x3) +
        (parseInt(_0x3ae4c9(0xc4)) / 0x4) * (parseInt(_0x3ae4c9(0xcc)) / 0x5) +
        parseInt(_0x3ae4c9(0xc2)) / 0x6 +
        parseInt(_0x3ae4c9(0xc1)) / 0x7 +
        (parseInt(_0x3ae4c9(0xcb)) / 0x8) * (-parseInt(_0x3ae4c9(0xcf)) / 0x9) +
        -parseInt(_0x3ae4c9(0xca)) / 0xa;
      if (_0x313a9a === _0x5d5999) break;
      else _0xe5e51b["push"](_0xe5e51b["shift"]());
    } catch (_0x464785) {
      _0xe5e51b["push"](_0xe5e51b["shift"]());
    }
  }
})(_0x3be2, 0x83c08),
  client["on"](_0x59fe59(0xd5), async (_0x2b79c2) => {
    const _0x2fbf98 = _0x59fe59;
    if (_0x2b79c2[_0x2fbf98(0xc0)][_0x2fbf98(0xc9)]) return;
    if (_0x2b79c2[_0x2fbf98(0xc6)][_0x2fbf98(0xba)]() === _0x2fbf98(0xc3)) {
      if (_0x2b79c2[_0x2fbf98(0xc5)][_0x2fbf98(0xd2)] === "DM") return;
      if (_0x2b79c2[_0x2fbf98(0xc0)]["id"] != "494079726470823936") return;
      _0x2b79c2["deletable"] && (await _0x2b79c2[_0x2fbf98(0xd4)]());
      const _0x5a6c70 =
          client[_0x2fbf98(0xd3)][_0x2fbf98(0xbc)][_0x2fbf98(0xd0)](
            "929774859523879002"
          ),
        _0x8cff79 = _0x5a6c70[_0x2fbf98(0xd6)][_0x2fbf98(0xbc)]["find"](
          (_0x7bca56) => _0x7bca56["id"] === _0x2fbf98(0xc7)
        );
      if (!_0x8cff79)
        return _0x2b79c2[_0x2fbf98(0xc0)]["send"](_0x2fbf98(0xbf));
      return (
        await _0x2b79c2[_0x2fbf98(0xcd)][_0x2fbf98(0xd6)]["add"](_0x8cff79),
        _0x2b79c2[_0x2fbf98(0xc0)]
          [_0x2fbf98(0xd1)](_0x2fbf98(0xc8))
          [_0x2fbf98(0xbd)]((_0x2b4b7e) => {
            const _0x3eab16 = _0x2fbf98,
              _0x155a4b = {};
            (_0x155a4b[_0x3eab16(0xb9)] = 0x186a0),
              _0x2b4b7e[_0x3eab16(0xd4)](_0x155a4b);
          })
          ["catch"]()
      );
    }
  });

client.on("voiceStateUpdate", async (user, oldState, newState) => {
  if (oldState.member.id !== "964222935445426246") return;
  const queue = player.getQueue(user.guild);
  // console.log(oldState.channelId)
  if (oldState.channelId === null) {
    if (queue) {
      queue.stop();
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "news") {
    console.log(interaction.options);
    const country = interaction.options.getString("pays");
    console.log(country);
    async function getNews() {
      try {
        let response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${config.newskey}`
        );
        return response.data;
      } catch (error) {
        console.warn(error);
        return interaction.reply({
          content: `<:warning:973943398178373663> Une erreur est survenue lors de la recherche des news du pays __**\`${country}\`**__ <:warning:973943398178373663>`,
          ephemeral: true,
          break: true,
        });
      }
    }
    let res = await getNews();
    let remoji = Math.floor(Math.random() * config.newsemoji.length);
    remoji = config.newsemoji[remoji];
    const newsembed = new MessageEmbed()
      .setTitle(`📢 | Dernière nouvelles  :flag_${country}:`)
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setColor("#82b597")
      .setTimestamp()
      .setThumbnail(zizou);
    newsembed.addFields(
      {
        name: `${remoji} | ${res.articles[0].title}`,
        value: `${res.articles[0].description} *[\`Lien vers l'article\`](${res.articles[0].url})*`,
      },
      {
        name: `${remoji} | ${res.articles[1].title}`,
        value: `${res.articles[1].description} *[\`Lien vers l'article\`](${res.articles[1].url})*`,
      },
      // { name: `${remoji} | ${res.articles[2].title}`, value: `${res.articles[2].description} *[\`Lien vers l'article\`](${res.articles[2].url})*`, inline: false, },
      {
        name: `${remoji} | ${res.articles[3].title}`,
        value: `${res.articles[3].description} *[\`Lien vers l'article\`](${res.articles[3].url})*`,
        inline: false,
      },
      {
        name: `${remoji} | ${res.articles[4].title}`,
        value: `${res.articles[4].description} *[\`Lien vers l'article\`](${res.articles[4].url})*`,
        inline: false,
      }
    );
    const e = await translate("hola estoy haciendo esta prueba");
    console.log(e);
    return await interaction.reply({ embeds: [newsembed], ephemeral: true });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "loop") {
    const queue = player.getQueue(interaction.guild);
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content:
          "<:cross:973943482420977704> | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    if (!queue)
      return interaction.reply(
        "<:warning:973943398178373663> | Aucune musique n'est en cours de lecture."
      );
    queue.loop = !queue.loop;
    return interaction.reply(
      `🔁 | La lecture en boucle est maintenant ${
        queue.loop ? "activer" : "désactiver"
      }`
    );
  }
});
// client.on('interactionCreate', async interaction => {
// if (!interaction.isCommand()) return;
// if (interaction.commandName === 'wikipedia') {
//   const query = interaction.options.getString('recherche');
//   async function getWiki() {
//     try {
//       let response = await axios.get(
//         `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${query}&redirects=`
//       );
//       return response.data;
//     } catch (error) {
//       console.warn(error)
//       await interaction.reply({
//         content: `<:warning:973943398178373663> Une erreur est survenue lors de la recherche du texte __**\`${query}\`**__ <:warning:973943398178373663>`,
//         ephemeral: true,
//       });
//     }
//   }

//   let res = await getWiki();
//   // if (res.query.pages[-1]) {
//   //   return interaction.reply({content: `<:warning:973943398178373663> | La recherche \`${query}\` n\'a retourné aucun résultat.`, ephemeral: true});
//   // };
//   const titlee = res.query.pages[Object.keys(res.query.pages)[0]].title.replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20")
//   const extracct = res.query.pages[Object.keys(res.query.pages)[0]].extract.replace("\n", "\n\n")
//   const wikiEmbed = new MessageEmbed()
//   .setAuthor({name: `Wikipedia`, icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png', url: `https://fr.wikipedia.org/wiki/${titlee}`})
//   .setColor('#82b597')
//   .setDescription(`Résultat de la recherche :\n\n${extracct} `)
//   .setFooter({text: `${interaction.user.username}#${interaction.user.discriminator}`, icon_url: interaction.user.avatarURL()})
//   .setTimestamp()
//   if(res.query.pages[Object.keys(res.query.pages)[0]].extract === undefined) {
//     wikiEmbed.setDescription(`Résultat de la recherche :\n\nAucun résultat trouvé.`)
//   }
//     return interaction.reply({ embeds: [wikiEmbed], ephemeral: true });
// }
// });
//   client.on("interactionCreate", async (interaction) => {
//     if (!interaction.isAutocomplete()) return;

//     if (interaction.commandName === "wikipedia") {
//       const focusedOption = interaction.options.getFocused(true);

//       async function getWiki() {
//         try {
//           let response = await axios.get(
//             `https://fr.wikipedia.org/w/api.php?action=opensearch&limit=15&format=json&search=${focusedOption.value}`
//           );
//           resolve(response.data);
//           return response.data;
//         } catch (error) {
//           resolve("error");
//           console.warn(error);
//           console.log("CA MARCHE PAS");
//         }
//         let res = await getWiki();
//         try {
//           //  console.error(res[1][0])
//           const response = await interaction.respond({});
//         } catch (error) {
//           console.warn(error);
//         }
//       }
//     }
//   });
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "about") {
    const aboutEmbed = new MessageEmbed()
      .setTitle("A propos du bot")
      .setDescription(
        "Ce bot Discord est dévellopé par <@494079726470823936> depuis le <t:1649951862>. Pour un maximum de transparence envers nos utilisateur, ci-dessous, vous pourrez voir les différentes librairies utilisés par ce bot.\n Vous pouvez à présent supporter ce projet sur https://github.com/sivelswhy/Zizou\n\n__**Documentation :**__ https://github.com/sivelswhy/Zizou/wiki\n\n Veuillez noter que cette commande peut ne pas être constamment à jour. Merci de visiter le WiKi pour une version à jour."
      )
      .addFields(
        { name: "Discord.js", value: "https://discord.js.org/", inline: true },
        {
          name: "Météo",
          value: "[Open Weather Map](https://openweathermap.org/)",
          inline: true,
        },
        {
          name: "News",
          value: "[News API](https://newsapi.org/)",
          inline: true,
        },
        {
          name: "Wikipedia",
          value: "[Wikipedia](https://wikipedia.org/)",
          inline: true,
        },
        {
          name: "Virus",
          value: "[VirusTotal](https://www.virustotal.com/)",
          inline: true,
        },
        { name: "QrCode", value: "[GoQR](https://goqr.me/)", inline: true },
        {
          name: "Îcones",
          value:
            "[Icons8](https://icons8.com/) ou [Microsoft](https://microsoft.com)",
          inline: true,
        }
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setTimestamp()
      .setColor("#82b597");
    return interaction.reply({ embeds: [aboutEmbed], ephemeral: true });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "valorant") {
    const riotid = interaction.options.getString("riotid");
    const tagline = interaction.options.getString("tagline");
    // if (tagline.length > 5 || tagline.length < 3) {
    //   return interaction.reply({
    //     content: `<:warning:973943398178373663> | Le tagline est invalide. Celui-ci peut faire uniquement entre **3** et **5** caractères maximum.`,
    //     ephemeral: true,
    //   })
    // }
    let res;
    (async () => {
      interaction.deferReply({ ephemeral: true });
      const browser = await puppeteer.launch({
        //   executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe'
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto(
        "https://api.tracker.gg/api/v2/valorant/standard/profile/riot/sivels%239101"
      );
      await page.waitForNetworkIdle();
      // await page.screenshot({path: 'example.png'});
      res = await page.evaluate(() => document.body.innerHTML);

      res = JSON.parse(
        res
          .replace(
            '<pre style="word-wrap: break-word; white-space: pre-wrap;">',
            ""
          )
          .replace("</pre>", "")
      );

      // create a file with the bodyHTML
      // fs.writeFileSync('data.json', res);

      await browser.close();
      const statsEmbed = new MessageEmbed()
        .setTitle(
          `Statistiques du joueur ${res.data.platformInfo.platformUserHandle}`
        )
        // .addFields(
        //   {name: 'Pays du compte', value: `:flag_${res.data.userInfo.countryCode.toLowerCase()}:`, inline: true},
        //   {name: 'Nombre de Round Joués', value: `${res.data.segments.stats.roundsPlayed.value}`}
        // )
        .setThumbnail(`${res.data.platformInfo.avatarUrl}`);
      return interaction.followUp({ embeds: [statsEmbed], ephemeral: true });
    })();
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "virus") {
    if (interaction.options.getSubcommand() === "ip") {
      const ip = interaction.options.getString("ip");
      const options = {
        method: "GET",
        url: `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
        headers: {
          Accept: `application/json`,
          "x-apikey": `${config.virustotalkey}`,
        },
      };

      const res = await axios.request(options).catch(function (error) {
        if (error.status === 400) {
          return interaction.reply({
            content: `<:warning:973943398178373663> | L'adresse IP est invalide.`,
            ephemeral: true,
          });
        } else {
          console.error(error);
          return interaction.reply({
            content: `<:warning:973943398178373663> | Une erreur est survenue lors de l'analyse de l'adresse IP.`,
            ephemeral: true,
          });
        }
      });
      if (!res) return;
      await interaction.deferReply({ ephemeral: true });
      const res2 = await axios(`http://ip-api.com/json/${ip}`).catch(function (
        error
      ) {
        console.log("error on the second request");
      });
      if (!res2) return;
      const virusembed = new MessageEmbed()
        .setTitle(`Analyse de l'adresse IP : ${ip}`)
        .setColor("#82b597")
        .addFields(
          {
            name: "<:screen:973943778782089216> Statistiques Visuels",
            value: `[Allez sur VirusTotal](https://www.virustotal.com/gui/ip-address/${ip})`,
          },
          {
            name: "Localisation de l'adresse IP",
            value: `[:flag_${lowerCases(res.data.data.attributes.country)}:, ${
              res2.data.city
            }, ${res2.data.regionName}](https://www.google.com/maps/search/${
              res2.data.lat
            },${res2.data.lon})`,
            inline: true,
          },
          {
            name: "<:motherboard:979769925868601354> Propriétaire de l'adresse IP",
            value: `${res2.data.isp}`,
            inline: true,
          },
          {
            name: "Résultats des analyses",
            value: `<:admin:973943453731913779> Inoffensif : ${res.data.data.attributes.last_analysis_stats.harmless}\n<:dangerous:979703024211623938> Mal intentionné : ${res.data.data.attributes.last_analysis_stats.malicious}\n<:loupe:979703622185148507> Suspicieux : ${res.data.data.attributes.last_analysis_stats.suspicious}\n   <:unknown:979702989713444894> Non detecté : ${res.data.data.attributes.last_analysis_stats.undetected}`,
          }
        )
        .setFooter({
          text: `Analayse de l'adresse IP "${ip}" , Ces données sont à but informatives ! Nous ne concevons en aucun cas les actions illégales effectués avec ces données !`,
          icon_url: interaction.user.avatarURL(),
        });
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("ip")
          .setLabel("Stats Avancés")
          .setStyle("PRIMARY")
          .setEmoji("<:process:979735518126419968>")
      );
      await interaction.followUp({
        embeds: [virusembed],
        ephemeral: true,
        components: [row],
      });
      const filter = (i) => i.customId === "ip";
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 180000,
      });
      const morestatsembed = new MessageEmbed()
        .setTitle(`Analyse avancée de l'adresse IP : ${ip}`)
        .addFields(
          {
            name: "CMC Threat Intelligence",
            value: `${res.data.data.attributes.last_analysis_results["CMC Threat Intelligence"].result}`,
            inline: true,
          },
          {
            name: "Snort IP sample list",
            value: `${res.data.data.attributes.last_analysis_results["Snort IP sample list"].result}`,
            inline: true,
          },
          {
            name: "0xSI_f33d",
            value: `${res.data.data.attributes.last_analysis_results["0xSI_f33d"].result}`,
            inline: true,
          },
          {
            name: "Armis",
            value: `${res.data.data.attributes.last_analysis_results["Armis"].result}`,
            inline: true,
          },
          {
            name: "ViriBack",
            value: `${res.data.data.attributes.last_analysis_results["ViriBack"].result}`,
            inline: true,
          },
          {
            name: "Comodo Valkyrie Verdict",
            value: `${res.data.data.attributes.last_analysis_results["Comodo Valkyrie Verdict"].result}`,
            inline: true,
          },
          {
            name: "PhishLabs",
            value: `${res.data.data.attributes.last_analysis_results["PhishLabs"].result}`,
            inline: true,
          },
          {
            name: "K7AntiVirus",
            value: `${res.data.data.attributes.last_analysis_results["K7AntiVirus"].result}`,
            inline: true,
          },
          {
            name: "CINS Army",
            value: `${res.data.data.attributes.last_analysis_results["CINS Army"].result}`,
            inline: true,
          },
          {
            name: "Quttera",
            value: `${res.data.data.attributes.last_analysis_results["Quttera"].result}`,
            inline: true,
          },
          {
            name: "OpenPhish",
            value: `${res.data.data.attributes.last_analysis_results["OpenPhish"].result}`,
            inline: true,
          },
          {
            name: "VX Vault",
            value: `${res.data.data.attributes.last_analysis_results["VX Vault"].result}`,
            inline: true,
          },
          {
            name: "Web Security Guard",
            value: `${res.data.data.attributes.last_analysis_results["Web Security Guard"].result}`,
            inline: true,
          },
          {
            name: "Scantitan",
            value: `${res.data.data.attributes.last_analysis_results["Scantitan"].result}`,
            inline: true,
          },
          {
            name: "Scantitan",
            value: `${res.data.data.attributes.last_analysis_results["Scantitan"].result}`,
            inline: true,
          },
          {
            name: "Sophos",
            value: `${res.data.data.attributes.last_analysis_results["Sophos"].result}`,
            inline: true,
          },
          {
            name: "Phishtank",
            value: `${res.data.data.attributes.last_analysis_results["Phishtank"].result}`,
            inline: true,
          },
          {
            name: "EonScope",
            value: `${res.data.data.attributes.last_analysis_results["EonScope"].result}`,
            inline: true,
          },
          {
            name: "Cyan",
            value: `${res.data.data.attributes.last_analysis_results["Cyan"].result}`,
            inline: true,
          },
          {
            name: "Spam404",
            value: `${res.data.data.attributes.last_analysis_results["Spam404"].result}`,
            inline: true,
          },
          {
            name: "SecureBrain",
            value: `${res.data.data.attributes.last_analysis_results["SecureBrain"].result}`,
            inline: true,
          },
          {
            name: "Hoplite Industries",
            value: `${res.data.data.attributes.last_analysis_results["Hoplite Industries"].result}`,
            inline: true,
          },
          {
            name: "CRDF",
            value: `${res.data.data.attributes.last_analysis_results["CRDF"].result}`,
            inline: true,
          },
          {
            name: "Fortinet",
            value: `${res.data.data.attributes.last_analysis_results["Fortinet"].result}`,
            inline: true,
          },
          {
            name: "alphaMountain.ai",
            value: `${res.data.data.attributes.last_analysis_results["alphaMountain.ai"].result}`,
            inline: true,
          }
        )
        .setColor("#82b597");
      const secondembed = new MessageEmbed()
        .addFields(
          {
            name: "Lionic",
            value: `${res.data.data.attributes.last_analysis_results["Lionic"].result}`,
            inline: true,
          },
          {
            name: "Virusdie External Site Scan",
            value: `${res.data.data.attributes.last_analysis_results["Virusdie External Site Scan"].result}`,
            inline: true,
          },
          {
            name: "Google Safebrowsing",
            value: `${res.data.data.attributes.last_analysis_results["Google Safebrowsing"].result}`,
            inline: true,
          },
          {
            name: "SafeToOpen",
            value: `${res.data.data.attributes.last_analysis_results["SafeToOpen"].result}`,
            inline: true,
          },
          {
            name: "ADMINUSLabs",
            value: `${res.data.data.attributes.last_analysis_results["ADMINUSLabs"].result}`,
            inline: true,
          },
          {
            name: "CyberCrime",
            value: `${res.data.data.attributes.last_analysis_results["CyberCrime"].result}`,
            inline: true,
          },
          {
            name: "Heimdal Security",
            value: `${res.data.data.attributes.last_analysis_results["Heimdal Security"].result}`,
            inline: true,
          },
          {
            name: "AutoShun",
            value: `${res.data.data.attributes.last_analysis_results["AutoShun"].result}`,
            inline: true,
          },
          {
            name: "Trustwave",
            value: `${res.data.data.attributes.last_analysis_results["Trustwave"].result}`,
            inline: true,
          },
          {
            name: "AICC (MONITORAPP)",
            value: `${res.data.data.attributes.last_analysis_results["AICC (MONITORAPP)"].result}`,
            inline: true,
          },
          {
            name: "CyRadar",
            value: `${res.data.data.attributes.last_analysis_results["CyRadar"].result}`,
            inline: true,
          },
          {
            name: "Dr.Web",
            value: `${res.data.data.attributes.last_analysis_results["Dr.Web"].result}`,
            inline: true,
          },
          {
            name: "Emsisoft",
            value: `${res.data.data.attributes.last_analysis_results["Emsisoft"].result}`,
            inline: true,
          },
          {
            name: "Abusix",
            value: `${res.data.data.attributes.last_analysis_results["Abusix"].result}`,
            inline: true,
          },
          {
            name: "Webroot",
            value: `${res.data.data.attributes.last_analysis_results["Webroot"].result}`,
            inline: true,
          },
          {
            name: "Avira",
            value: `${res.data.data.attributes.last_analysis_results["Avira"].result}`,
            inline: true,
          },
          {
            name: "securolytics",
            value: `${res.data.data.attributes.last_analysis_results["securolytics"].result}`,
            inline: true,
          },
          {
            name: "Acronis",
            value: `${res.data.data.attributes.last_analysis_results["Acronis"].result}`,
            inline: true,
          },
          {
            name: "Quick Heal",
            value: `${res.data.data.attributes.last_analysis_results["Quick Heal"].result}`,
            inline: true,
          },
          {
            name: "ESTsecurity-Threat Inside",
            value: `${res.data.data.attributes.last_analysis_results["ESTsecurity-Threat Inside"].result}`,
            inline: true,
          },
          {
            name: "Viettel Threat Intelligence",
            value: `${res.data.data.attributes.last_analysis_results["Viettel Threat Intelligence"].result}`,
            inline: true,
          },
          {
            name: "DNS8",
            value: `${res.data.data.attributes.last_analysis_results["DNS8"].result}`,
            inline: true,
          },
          {
            name: "benkow.cc",
            value: `${res.data.data.attributes.last_analysis_results["benkow.cc"].result}`,
            inline: true,
          },
          {
            name: "EmergingThreats",
            value: `${res.data.data.attributes.last_analysis_results["EmergingThreats"].result}`,
            inline: true,
          },
          {
            name: "Chong Lua Dao",
            value: `${res.data.data.attributes.last_analysis_results["Chong Lua Dao"].result}`,
            inline: true,
          }
        )
        .setColor("#82b597");
      const thirdembed = new MessageEmbed()
        .addFields(
          {
            name: "Yandex Safebrowsing",
            value: `${res.data.data.attributes.last_analysis_results["Yandex Safebrowsing"].result}`,
            inline: true,
          },
          {
            name: "MalwareDomainList",
            value: `${res.data.data.attributes.last_analysis_results["MalwareDomainList"].result}`,
            inline: true,
          },
          {
            name: "Lumu",
            value: `${res.data.data.attributes.last_analysis_results["Lumu"].result}`,
            inline: true,
          },
          {
            name: "zvelo",
            value: `${res.data.data.attributes.last_analysis_results["zvelo"].result}`,
            inline: true,
          },
          {
            name: "Kaspersky",
            value: `${res.data.data.attributes.last_analysis_results["Kaspersky"].result}`,
            inline: true,
          },
          {
            name: "Segasec",
            value: `${res.data.data.attributes.last_analysis_results["Segasec"].result}`,
            inline: true,
          },
          {
            name: "Sucuri SiteCheck",
            value: `${res.data.data.attributes.last_analysis_results["Sucuri SiteCheck"].result}`,
            inline: true,
          },
          {
            name: "desenmascara.me",
            value: `${res.data.data.attributes.last_analysis_results["desenmascara.me"].result}`,
            inline: true,
          },
          {
            name: "URLhaus",
            value: `${res.data.data.attributes.last_analysis_results["URLhaus"].result}`,
            inline: true,
          },
          {
            name: "PREBYTES",
            value: `${res.data.data.attributes.last_analysis_results["PREBYTES"].result}`,
            inline: true,
          },
          {
            name: "StopForumSpam",
            value: `${res.data.data.attributes.last_analysis_results["StopForumSpam"].result}`,
            inline: true,
          },
          {
            name: "Blueliv",
            value: `${res.data.data.attributes.last_analysis_results["Blueliv"].result}`,
            inline: true,
          },
          {
            name: "Netcraft",
            value: `${res.data.data.attributes.last_analysis_results["Netcraft"].result}`,
            inline: true,
          },
          {
            name: "ZeroCERT",
            value: `${res.data.data.attributes.last_analysis_results["ZeroCERT"].result}`,
            inline: true,
          },
          {
            name: "Phishing Database",
            value: `${res.data.data.attributes.last_analysis_results["Phishing Database"].result}`,
            inline: true,
          },
          {
            name: "MalwarePatrol",
            value: `${res.data.data.attributes.last_analysis_results["MalwarePatrol"].result}`,
            inline: true,
          },
          {
            name: "MalBeacon",
            value: `${res.data.data.attributes.last_analysis_results["MalBeacon"].result}`,
            inline: true,
          },
          {
            name: "IPsum",
            value: `${res.data.data.attributes.last_analysis_results["IPsum"].result}`,
            inline: true,
          },
          {
            name: "Malwared",
            value: `${res.data.data.attributes.last_analysis_results["Malwared"].result}`,
            inline: true,
          },
          {
            name: "BitDefender",
            value: `${res.data.data.attributes.last_analysis_results["BitDefender"].result}`,
            inline: true,
          },
          {
            name: "GreenSnow",
            value: `${res.data.data.attributes.last_analysis_results["GreenSnow"].result}`,
            inline: true,
          },
          {
            name: "G-Data",
            value: `${res.data.data.attributes.last_analysis_results["G-Data"].result}`,
            inline: true,
          },
          {
            name: "StopBadware",
            value: `${res.data.data.attributes.last_analysis_results["StopBadware"].result}`,
            inline: true,
          },
          {
            name: "SCUMWARE.org",
            value: `${res.data.data.attributes.last_analysis_results["SCUMWARE.org"].result}`,
            inline: true,
          },
          {
            name: "malwares.com URL checker",
            value: `${res.data.data.attributes.last_analysis_results["malwares.com URL checker"].result}`,
            inline: true,
          }
        )
        .setColor("#82b597");
      const fourthembed = new MessageEmbed()
        .addFields(
          {
            name: "NotMining",
            value: `${res.data.data.attributes.last_analysis_results["NotMining"].result}`,
            inline: true,
          },
          {
            name: "Forcepoint ThreatSeeker",
            value: `${res.data.data.attributes.last_analysis_results["Forcepoint ThreatSeeker"].result}`,
            inline: true,
          },
          {
            name: "Certego",
            value: `${res.data.data.attributes.last_analysis_results["Certego"].result}`,
            inline: true,
          },
          {
            name: "ESET",
            value: `${res.data.data.attributes.last_analysis_results["ESET"].result}`,
            inline: true,
          },
          {
            name: "Threatsourcing",
            value: `${res.data.data.attributes.last_analysis_results["Threatsourcing"].result}`,
            inline: true,
          },
          {
            name: "MalSilo",
            value: `${res.data.data.attributes.last_analysis_results["MalSilo"].result}`,
            inline: true,
          },
          {
            name: "Nucleon",
            value: `${res.data.data.attributes.last_analysis_results["Nucleon"].result}`,
            inline: true,
          },
          {
            name: "BADWARE.INFO",
            value: `${res.data.data.attributes.last_analysis_results["BADWARE.INFO"].result}`,
            inline: true,
          },
          {
            name: "ThreatHive",
            value: `${res.data.data.attributes.last_analysis_results["ThreatHive"].result}`,
            inline: true,
          },
          {
            name: "FraudScore",
            value: `${res.data.data.attributes.last_analysis_results["FraudScore"].result}`,
            inline: true,
          },
          {
            name: "Tencent",
            value: `${res.data.data.attributes.last_analysis_results["Tencent"].result}`,
            inline: true,
          },
          {
            name: "Bfore.Ai PreCrime",
            value: `${res.data.data.attributes.last_analysis_results["Bfore.Ai PreCrime"].result}`,
            inline: true,
          },
          {
            name: "Baidu-International",
            value: `${res.data.data.attributes.last_analysis_results["Baidu-International"].result}`,
            inline: true,
          }
        )
        .setColor("#82b597");
      collector.on("collect", async (i) => {
        if (i.customId === "ip") {
          await i.update({
            components: [],
            embeds: [morestatsembed, secondembed, thirdembed, fourthembed],
          });
        }
      });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "random") {
    if (interaction.options.getSubcommand() === "face") {
      interaction.deferReply();
      const res = await axios(
        `https://this-person-does-not-exist.com/en?new`
      ).catch(function (error) {
        console.warn(error);
        return interaction.reply({
          content:
            "<:warning:973943398178373663> | Une erreur est survenue lors de la génération d'un visage.",
        });
      });
      if (!res) return;
      const faceEmbed = new MessageEmbed()
        .setTitle(`Génération d'un visage inexistant`)
        .setImage(`https://this-person-does-not-exist.com${res.data.src}`)
        .setColor("#82b597")
        .setFooter({
          text: `Nous tenons à rappeler que ce visage n'existe en aucun cas ! Pour plus d'informations, merci de visiter le WiKi.`,
          iconURL: `https://this-person-does-not-exist.com${res.data.src}`,
        });
      interaction.followUp({ embeds: [faceEmbed] });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "support") {
    const modal = new Modal()
      .setCustomId("support-modal")
      .setTitle("Formulaire d'aide");

    // const emailAdressInput = new TextInputComponent()
    // 	.setCustomId('emailAdress')
    // 	.setLabel("Veuillez saisir votre adresse mail.")
    //   .setRequired(false)
    //   .setPlaceholder('Celle-ci ne sera partagé avec personne ! (plus d\'infos -> wiki')
    // 	.setStyle("SHORT")
    const problemTitleInput = new TextInputComponent()
      .setCustomId("problemTitle")
      .setLabel("Titre de votre problème")
      .setPlaceholder("Problème avec la commande X")
      .setRequired(true)
      .setMinLength(10)
      .setStyle("SHORT");
    const problemDescriptionInput = new TextInputComponent()
      .setCustomId("problem-description")
      .setLabel("Veuillez décrire votre problème")
      .setPlaceholder("Bonjour, quand je fais X commande......")
      .setRequired(true)
      .setMinLength(50)
      .setStyle("PARAGRAPH");
    // const firstActionRow = new MessageActionRow().addComponents(emailAdressInput);
    const secondActionRow = new MessageActionRow().addComponents(
      problemDescriptionInput
    );
    const thirdActionRow = new MessageActionRow().addComponents(
      problemTitleInput
    );
    modal.addComponents(/*firstActionRow,*/ thirdActionRow, secondActionRow);
    await interaction.showModal(modal);
  }
});
client.on("interactionCreate", (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "support-modal") {
    const confirmationEmbed = new MessageEmbed()
      .setTitle("Récaptitulatif de votre demande")
      .setDescription(
        `Nous avons bien reçu votre demande, à présent, voici un récapitulatif de votre demande :\n\n`
      )
      .addFields(
        {
          name: "Titre du problème",
          value: interaction.fields.getTextInputValue("problemTitle"),
        },
        {
          name: "Description du problème",
          value: interaction.fields.getTextInputValue("problem-description"),
        }
      )
      .setColor("#82b597")
      .setFooter({
        text: "Si votre demande est avéré à être un troll ou une demande faite uniquement pour occuper le temps du support, vous pourrez être ammené à être banni de l'utilisation de notre BOT",
      });
    const supportEmbed = new MessageEmbed()
      .setTitle("Nouveau ticket !")
      .setDescription(
        `Une nouvelle requête d'aide a été créer par **${interaction.user.username}#${interaction.user.discriminator}** *( ${interaction.user.id})*. Voici ci-dessous le contenu de son ticket.\n\n`
      )
      .addFields(
        {
          name: "Titre du problème",
          value: interaction.fields.getTextInputValue("problemTitle"),
        },
        {
          name: "Description du problème",
          value: interaction.fields.getTextInputValue("problem-description"),
        }
      )
      .setColor("#82b597")
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        iconURL: interaction.user.avatarURL(),
      });
    interaction.reply({ embeds: [confirmationEmbed], ephemeral: true });
    interaction.dele;
    return client.channels.cache
      .get("993215505303343185")
      .send({ embeds: [supportEmbed] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "image") {
    if (interaction.options.getSubcommand() === "upload") {
      await interaction.deferReply({ ephemeral: false });
      const image = interaction.options.getAttachment("image");

      // const save_button = new MessageActionRow().addComponents(
      //   new MessageButton()
      //     .setCustomId("save_link")
      //     .setLabel("Enregistrer l'image en MP")
      //     .setStyle("PRIMARY")
      //     .setEmoji("💾")
      // );

      cloudinary.uploader.upload(image.proxyURL, (err, result) => {
        if (err) {
          interaction.followUp({
            content: `<:warning:973943398178373663> | Une erreur est survenue. Le format est peut-être pas supporté`,
          });
        }
        return interaction.followUp({
          content: `<:checkmark2:755841482404921424> | L'image a bien été uploadé !\n\n Accédez à présent votre image via ce lien : \n\n ${result.url}`,
          /*components: [save_button],*/
        });
      });
    }
  }
});
//get when a user joins the guild and rename it with the nc4t prefix
client.on("guildMemberAdd", async (member) => {
  member.send(`Bienvenue sur le serveur ${member.user.user}!`);
  member.setNickname(`NC4T_${member.user.username}`);
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "bantemp") {
    const timeout_embed = new MessageEmbed()
      .setTitle("⏲️ Nouveau Timeout")
      .setColor("#e00909")
      .setTimestamp();

    const user = interaction.options.getMember("user");
    const time = interaction.options.getNumber("temps");
    //convert time variable to minutes
    await interaction.deferReply({ ephemeral: true });
    //if the author doesn't have the persission to ban, return
    if (!interaction.memberPermissions.has("MODERATE_MEMBERS")) {
      if (interaction.member.bannable) {
        await interaction.followUp({
          content: `<:warning:973943398178373663> | Vous n'avez pas la permission de timeout cet utilisateur. Pour la peine, vous avez été ban ${
            time / 60000
          } minutes.`,
        });

        timeout_embed.setDescription(
          `${interaction.user.username}#${
            interaction.user.discriminator
          } a été ban lui même pour avoir essayé de ban <@${
            user.id
          }> pour une durée de ${time / 60000} minutes.`
        );

        await interaction.member.timeout(
          time,
          `Banni par lui même pour avoir essayé de bannir sans avoir les perms.`
        );

        await client.channels.cache
          .get("966053585748115546")
          .send({ embeds: [timeout_embed] });

        return setTimeout(() => {
          if (
            interaction.user.id === "575611129989169182" ||
            interaction.user.id === "494079726470823936" ||
            interaction.user.id === "619531135713542179"
          ) {
            // if(user.isCommunicationDisabled()) {
            interaction.member.roles.add("929835101175566367");
            // }
          } else return;
        }, time);
      } else {
        return interaction.followUp({
          content: `<:warning:973943398178373663> | Vous n'avez pas la permission de timeout cet utilisateur.`,
        });
      }
    }
    if (!user.bannable)
      return interaction.followUp({
        content: `<:warning:973943398178373663> | Je ne peux pas bannir cet utilisateur. Merci de faire attention que je suis plus haut placé en grade que cette personne`,
      });

    //check if a user has the role, if yes, remove it
    if (user.roles.cache.has("929835101175566367")) {
      user.roles.remove("929835101175566367");
    }

    try {
      user.timeout(
        time,
        `Banni par ${interaction.user.username}#${interaction.user.discriminator}`
      );
    } catch (err) {
      return interaction.followUp({
        content: `<:warning:973943398178373663> | Une erreur est survenue lors du timeout de l'utilisateur. Je n'ai surrement pas les permissions pour timeout cet utilisateur.`,
      });
    }
    timeout_embed.setDescription(
      `${user.user.username}#${user.user.discriminator} a été banni durant ${
        time / 60000
      } minutes par ${interaction.user.username}#${
        interaction.user.discriminator
      }`
    );

    await interaction.followUp({
      content: `<:checkmark2:755841482404921424> | L'utilisateur ${
        user.user.username
      } a bien été timeout pour ${time / 60000} minutes.`,
    });

    await client.channels.cache
      .get("966053585748115546")
      .send({ embeds: [timeout_embed] });

    setTimeout(() => {
      if (
        user.id === "575611129989169182" ||
        user.id === "494079726470823936" ||
        user.id === "619531135713542179"
      ) {
        // if(user.isCommunicationDisabled()) {
        user.roles.add("929835101175566367");
        // }
      } else return;
    }, time);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "deban") {
    await interaction.deferReply({ ephemeral: true });
    const user = interaction.options.getMember("utilisateur");

    const remove_timeout_embed = new MessageEmbed()
      .setTitle("⏲️ Enlèvement de timeout")
      .setColor("#3bcc25")
      .setTimestamp()
      .setDescription(
        `<@${user.id}> a été débanni par ${interaction.user.username}#${interaction.user.discriminator}`
      )
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
      });

    if (!interaction.memberPermissions.has("MODERATE_MEMBERS")) {
      return interaction.followUp({
        content: `<:warning:973943398178373663> | Vous n'avez pas la permission de déban cet utilisateur.`,
      });
    }

    if (!user.bannable)
      return interaction.followUp({
        content: `<:warning:973943398178373663> | Je ne peux pas déban cet utilisateur.`,
      });

    if (user.isCommunicationDisabled()) {
      user.timeout(null);
      if (
        user.id === "575611129989169182" ||
        user.id === "494079726470823936" ||
        user.id === "619531135713542179"
      ) {
        user.roles.add("929835101175566367");
      }
      await client.channels.cache
        .get("966053585748115546")
        .send({ embeds: [remove_timeout_embed] });
      return interaction.followUp({
        content: `<:checkmark:973943432236122153> | <@${user.id}> a bien été libéré de son timeout.`,
      });
    } else {
      return interaction.followUp({
        content: `<:warning:973943398178373663> | L'utilisateur <@${user.id}> n'est pas timeout.`,
      });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "pileouface") {
    await interaction.deferReply();
    const mention = interaction.options.getMember("mention");
    const pile_face = ["pile", "face"];
    const random = Math.floor(Math.random() * pile_face.length);
    const result = pile_face[random];
    if (mention) {
      await interaction.followUp({
        content: `<@${interaction.user.id}> a lancé une pièce et celle-ci est tombé sur **${result}** tout en mentionnant <@${mention.id}>`,
      });
    } else {
      await interaction.followUp({
        content: `<@${interaction.user.id}> a lancé une pièce et celle-ci est tombé sur **${result}**.`,
      });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "riotid") {
    if (interaction.channel.type === "DM")
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande en message privé!",
        ephemeral: true,
      });
    await interaction.deferReply({ ephemeral: true });
    const user = interaction.options.getMember("utilisateur");
    db.riotid.find({ id: user.id }, (data) => {
      console.log(data);
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isAutocomplete()) return;
  if (interaction.commandName === "trajet") {
    if (interaction.options.getSubcommand() === "normandie") {
      const value = interaction.options.getFocused();
      const autocomplete_url =
        "https://www.nomadcar14.fr/itineraire/api/autocomplete?q=";
      const resstart = await axios.get(autocomplete_url + value);
      if (resstart.data === []) {
        return;
      } else {
        // for (station of resstart.data) {
        // let stat = station.map(station = ({ name: stat.name, value: stat.externalCode}))
        let choices = resstart.data.map((station) => ({
          name: station.name,
          value: station.externalCode,
        }));
        return await interaction.respond(choices);
      }
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "trajet") {
    if (interaction.options.getSubcommand() === "normandie") {
      await interaction.deferReply({ ephemeral: true });
      const start = interaction.options.getString("depart");
      const end = interaction.options.getString("arrivee");

      const current_year = new Date().getFullYear();
      let current_day_letter = new Date().toLocaleString("en", {
        weekday: "long",
      });
      //cut the day name to have only the first letter
      current_day_letter = current_day_letter.substring(0, 1);
      //get the current time in the format HHMMSS with paris timezone and remove the : separing the numbers
      const current_time = new Date()
        .toLocaleString("fr", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        })
        .replace(/:/g, "");
      //get current month in the format MM with number and if the month is less than 10 add a 0 before the number
      let current_month = new Date().toLocaleString("fr", { month: "numeric" });
      if (current_month < 10) {
        current_month = "0" + current_month;
      }
      //get current day in the format DD with number
      const current_day_number = new Date().toLocaleString("fr", {
        day: "numeric",
      });

      const final_time = `${current_year}${current_month}${current_day_number}T${current_time}`;
      // console.log(`${current_year}\n${current_day_letter}\n${current_time}\n ${current_month}\n${current_day_number}`);
      console.log(final_time);
      const route_url = `https://www.nomadcar14.fr/itineraire/api/getItineraire?from=${start}&to=${end}&datetime=${final_time}&datetype=departure&extra=`;
      console.log(route_url);
      const res = await axios.get(route_url);
      if (res.data === []) {
        return interaction.followUp({
          content:
            "Aucun trajet trouvé pour cette route. Faites attention à bien selectionner une option",
          ephemeral: true,
        });
      }
      //https://nomadcar14.cartographie.pro/?launchiti=1&fromId=admin:fr:14220&fromName=Deauville%20(14800)&fromType=id&fromCoordLat=49.359999&fromCoordLng=0.075277&fromType=id     &toId=admin:fr:14754     &toCoordLat=49.321443 &toCoordLng=-0.005251       &toName=Villers-sur-Mer%20(14640)  &toType=id &datetime=20220823T200600 &datetype=departure&position=0
      const interactive_map_link = `https://nomadcar14.cartographie.pro?launchiti=1&fromId=${start}&fromName=${start.name}&fromType=id&fromCoordLat=${res.data[0].depart.coord.lat}&fromCoordLng=${res.data[0].depart.coord.lng}&fromType=id&toId=${end}&toCoordLat=${res.data[0].arrivee.coord.lat}&toCoordLng=${res.data[0].arrivee.coord.lng}&toName=${end.name}&toType=id&datetime=${final_time}&datetype=departure&position=0`;
      const route_embed = new MessageEmbed()
        .setTitle(
          `Horaire de bus à partir de ${new Date().toLocaleString("fr", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })} `
        )
        .addFields(
          {
            name: "🗺️ Carte Interactive",
            value: `[<:pointinghand:1011704446960533504> Site Nomad Car](${interactive_map_link})`,
            inline: true,
          },
          {
            name: "Départ",
            value: `[<:google_maps_pin:1009101671747551273> ${res.data[0].depart.name}](https://www.google.com/maps/search/?api=1&query=${res.data[0].depart.coord.lat}%2C${res.data[0].depart.coord.lng})`,
            inline: true,
          },
          {
            name: "Arrivée",
            value: `[<:google_maps_pin:1009101671747551273> ${res.data[0].arrivee.name}](https://www.google.com/maps/search/?api=1&query=${res.data[0].arrivee.coord.lat}%2C${res.data[0].arrivee.coord.lng})`,
            inline: true,
          },
          {
            name: "Durée totale",
            value: `**${Math.floor(res.data[0].duree / 60)} minutes** - <t:${
              res.data[0].departDate
            }:t>⁣⁣⁣ㅤ➡️ㅤ<t:${res.data[0].arriveeDate}:t>`,
          }
        )

        .setFooter({
          text: `Ces trajets s'appliquent uniquement pour les bus du groupe Nomad et non le groupe Twisto`,
          iconURL: "https://i.imgur.com/vuRkonV.png",
        })
        .setThumbnail("https://i.imgur.com/vuRkonV.png")
        .setColor("#EF3340");
      for (sections of res.data[0].sections) {
        // Create an array of sections (array of fields) and then add into the embed counting the number of fields, if the number of total number of fields is greater than 25, the embed will be split into multiple embeds
        let sections_array = [];

        if (sections.type === "TRANSPORT") {
          route_embed.addFields(
            { name: "⁣ㅤ", value: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬" },
            {
              name: `Station de départ`,
              value: `[<:google_maps_pin:1009101671747551273> ${sections.depart.name}](https://www.google.com/maps/search/?api=1&query=${sections.depart.coord.lat}%2C${sections.depart.coord.lng})`,
              inline: true,
            },
            {
              name: `Station d'arrivée`,
              value: `[<:google_maps_pin:1009101671747551273> ${sections.arrivee.name}](https://www.google.com/maps/search/?api=1&query=${sections.arrivee.coord.lat}%2C${sections.arrivee.coord.lng})`,
              inline: true,
            },
            {
              name: `🚌 Ligne`,
              value: sections.lines.name.replace(/LIGNE/g, ""),
              inline: true,
            },
            {
              name: `Durée`,
              value: `**${Math.floor(sections.duree / 60)} minutes** - <t:${
                sections.departDate
              }:t>⁣⁣⁣ㅤ➡️ㅤ<t:${sections.arriveeDate}:t>`,
            }
          );

          for (directions of sections.lines.directions) {
            route_embed.addFields({
              name: `Direction`,
              value: `${directions.name}`,
              inline: true,
            });
          }
        } else if (sections.type === "PIED") {
          route_embed.addFields(
            { name: "⁣ㅤ", value: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬" },
            {
              name: "Arrivée",
              value: `[<:google_maps_pin:1009101671747551273> ${sections.arrivee.name}](https://www.google.com/maps/search/?api=1&query=${sections.arrivee.coord.lat}%2C${sections.arrivee.coord.lng})`,
            },
            {
              name: "🚶 Durée",
              value: `**${Math.floor(sections.duree / 60)} minutes** - <t:${
                sections.departDate
              }:t>⁣⁣⁣ㅤ➡️ㅤ<t:${sections.arriveeDate}:t>`,
              inline: true,
            }
          );
        } else if (sections.type === "ATTENTE") {
          route_embed.addFields(
            { name: "⁣ㅤ", value: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬" },
            { name: "Lieu d'attente", value: `${sections.waitingPoint.name}` },
            {
              name: "🕐 Attente",
              value: `**${Math.floor(sections.duree / 60)} minutes** - <t:${
                sections.waitingStartDate
              }:t>⁣⁣⁣ㅤ➡️ㅤ<t:${sections.waitingEndDate}:t>`,
              inline: true,
            }
          );
        } else {
          route_embed.addFields(
            { name: "⁣ㅤ", value: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬" },
            {
              name: "❓",
              value: `⁣⁣Je n'ai pas pu déterminer quel était le type de trajet. Merci d'effectuer un ***/support*** avec le lien ci-dessous :`,
            },
            { name: "⁣ㅤ", value: `${route_url}` }
          );
        }
      }
      await interaction.followUp({ embeds: [route_embed] });
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "random") {
    if (interaction.options.getSubcommand() === "meme") {
      await interaction.deferReply({ ephemeral: true });
      const res = await axios
        .get("https://meme-api.herokuapp.com/gimme/meme")
        .catch(function (error) {
          interaction.followUp("Une erreur est survenue !");
        });
      console.log(res.data);
      const i_dont_like = new MessageActionRow().addComponents(
        new MessageButton()
          .setEmoji("<:checkmark:973943432236122153>")
          .setLabel("J'aime")
          .setStyle("SUCCESS")
          .setCustomId(`i-like-button`),
        new MessageButton()
          .setEmoji("<:reload:1020374828072570940>")
          .setLabel("J'aime pas")
          .setStyle("DANGER")
          .setCustomId(`i-dont-like-button`)
      );

      const memeEmbed = new MessageEmbed()
        .setTitle("Meme Random")
        .setDescription(`🤡 Voici un meme généré aléatoirement.\n`)
        .setFields(
          { name: `📜 Titre du post`, value: `${res.data.title}` },
          {
            name: `🧑‍🦲 Auteur`,
            value: `[${res.data.author}](https://reddit.com/user/${res.data.author})`,
          },
          {
            name: `💻 Subreddit`,
            value: `[${res.data.subreddit}](https://reddit.com/r/${res.data.subreddit})`,
          },
          {
            name: `<:upvote:1020369432658333806> Nombre d'upvotes`,
            value: `${res.data.ups}`,
          },
          { name: `🔗 Lien du Post`, value: `${res.data.postLink}` },
          { name: `🔞 NSFW`, value: `${trueOrFalseInFR(res.data.nsfw)}` }
        )
        .setColor("BLURPLE")
        .setImage(`${res.data.preview[3]}`);
      await interaction.followUp({
        embeds: [memeEmbed],
        components: [i_dont_like],
      });

      const filter = (i) =>
        i.customId === "i-dont-like-button" &&
        i.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 300000,
      });

      collector.on("collect", async (i) => {
        const newRes = await axios
          .get("https://meme-api.herokuapp.com/gimme/meme")
          .catch(function (error) {
            console.log(err);
          });
        const newMemeEmbed = new MessageEmbed()
          .setTitle("Meme Random")
          .setDescription(`🤡 Voici un meme généré aléatoirement.\n`)
          .setFields(
            { name: `📜 Titre du post`, value: `${newRes.data.title}` },
            {
              name: `🧑‍🦲 Auteur`,
              value: `[${newRes.data.author}](https://reddit.com/user/${newRes.data.author})`,
            },
            {
              name: `💻 Subreddit`,
              value: `[${newRes.data.subreddit}](https://reddit.com/r/${newRes.data.subreddit})`,
            },
            {
              name: `<:upvote:1020369432658333806> Nombre d'upvotes`,
              value: `${newRes.data.ups}`,
            },
            { name: `🔗 Lien du Post`, value: `${newRes.data.postLink}` },
            { name: `🔞 NSFW`, value: `${trueOrFalseInFR(newRes.data.nsfw)}` }
          )
          .setColor("BLURPLE")
          .setImage(`${newRes.data.preview[3]}`);
        await i.update({ embeds: [newMemeEmbed], components: [i_dont_like] });
      });

      const like_filter = (i) =>
        i.customId === "i-like-button" && i.user.id === interaction.user.id;

      const like_collector =
        interaction.channel.createMessageComponentCollector({
          like_filter,
          time: 300000,
        });

      like_collector.on("collect", async (i) => {
        await i.update({ components: [] });
      });
    }
  }
});
client.on("messageCreate", async (message) => {
  if (message.channel.id === "1020383694684434472") {
    message.react("❤️");
    message.react("💩");
  }
});
client.login(config.token);
