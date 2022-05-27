const {
  Discord,
  Client,
  GuildManager,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Permissions,
  InteractionWebhook,
  Guild,
  VoiceState,
} = require("discord.js");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

const fs = require("fs");

const zlib = require("zlib");

const axios = require("axios");

const os = require("os");

const { Player } = require("discord-player");

const { tracker } = require("@androz2091/discord-invites-tracker");

// Create a new Player (you don't need any API Key)
const player = new Player(client, { initialVolume: 30, languages: ["fr-FR"] });

const config = require("./data/config.json");

const db = require("./data/db.json");

const { DiscordTogether } = require("discord-together");
const path = require("path");
const { ifError } = require("assert");
const { start } = require("repl");
client.discordTogether = new DiscordTogether(client);
let nameembed;

function getUnix(string) {
  return Math.floor(string / 1000);
}
function lowerCases(phrase) {
  return phrase.toLowerCase();
}

const bloodslogo =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const zizou =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const logsmp = "966268215913222164";
function capFL(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
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

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

client.on("ready", async () => {
  //*ready
  console.clear();
  console.log(
    "--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\nBot BLOODS online !"
  );
  client.user.setStatus("online");
  // client.user.setActivity("Toujours à l'heure, quelque sois l'heure", {
  //   type: "PLAYING",
  //   url: "https://www.twitch.tv/sivelsdev",
  // });
  client.user.setActivity("Toujours à l'heure, quelque sois l'heure !", {
    type: "PLAYING",
    url: "https://www.twitch.tv/sivelsdev",
  });
});
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
    const loca = interaction.options.getString("position");
    let res;
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

    console.log(
      `${interaction.user.username}#${interaction.user.discriminator} a effectué la commande /weather pour la ville "${loca}"`
    );
    const advname = res.name.replace(" ", "+");

    const embed = new MessageEmbed()
      .setTitle(`Infos à propos de ${res.name}`)
      .setThumbnail(
        `http://openweathermap.org/img/w/${res.weather[0].icon}.png`
      )
      .setDescription(
        `
        **Nom :**\n
        [${res.name}](https://www.google.com/maps/place/${advname}/${
          res.coord.lat
        }+${res.coord.lon}), :flag_${res.sys.country.toLowerCase()}:\n
        **🌡️ Temperature**\n
        **Température Actuelle **:\n
        ${Math.floor(res.main.temp)}°C\n
        **Minimum** :\n
        ${Math.floor(res.main.temp_min)}°C\n
        **Maximum** :\n
        ${Math.floor(res.main.temp_max)}°C\n
        **Ressenti** : \n
        ${Math.floor(res.main.feels_like)}°C\n
        **🌥Météo**\n
        **Météo** : \n
        ${capFL(res.weather[0].description)}\n
        🌬 Vent\n
        **Vitesse :** \n
        ${Math.floor(res.wind.speed)} KM/H\n
        **Angle du vent** : \n
        ${res.wind.deg}°\n
        `
      )
      .setColor("#32a86b")
      .setTimestamp();
    // await interaction.reply({
    //   // files: [
    //   //   "https://cdn.discordapp.com/attachments/966300614093078578/966361155549401248/la-meteo-de-gulli.mp4",
    //   // ],
    //   content: "https://www.youtube.com/watch?v=H-nnoTDofow",
    // });
    return interaction.reply({ embeds: [embed], ephemeral: false });
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
        { name: `Bloqué`, value: `${res.info.locked}`, inline: true },
        //   {
        //     name: `Dernière mise à jour`,
        //     value: `<t:${res.info.lastUpdate}:R>`,
        //     inline: true,
        //   },
        { name: `Type de jeu`, value: `${res.info.gameMode}`, inline: true },
        {
          name: `Utilise EarlyAuth`,
          value: `[${res.info.useEarlyAuth}](${res.info.earlyAuthUrl})`,
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
          value: `${res.info.verified}`,
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
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      url = `http://${url}`;
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
      ephemeral: true,
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
          if (user && user2) {
            return interaction.reply({
              content: `<@${user.id}> | <@${user2.id}>`,
              embeds: [embed],
              ephemeral: false,
            });
          } else if (user) {
            return interaction.reply({
              content: `<@${user.id}>`,
              embeds: [embed],
              ephemeral: false,
            });
          } else {
            return interaction.reply({
              embeds: [embed],
              ephemeral: false,
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
    const del = new MessageEmbed()
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
    client.channels.cache.get("966053585748115546").send({ embeds: [del] });
    interaction.reply({ embeds: [embed], ephemeral: true });
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
          text: `${m.author.username}#${m.author.discriminator}`,
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
      content: `🔉 | Le volume a été mis à **${volumee}%** !`,
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
        content: "<:pause:979771588742377522> | La musique a été mise en pause !",
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
    let imc = weight / (height * height);
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
  if (interaction.commandName === "poll") {
    let question = interaction.options.getString("question");
    let duration = interaction.options.getNumber("duree");
    const options = [
      interaction.options.getString("option1"),
      interaction.options.getString("option2"),
      interaction.options.getString("option3"),
      interaction.options.getString("option4"),
      interaction.options.getString("option5"),
      interaction.options.getString("option6"),
      interaction.options.getString("option7"),
      interaction.options.getString("option8"),
      interaction.options.getString("option9"),
      interaction.options.getString("option10"),
    ];

    const pollembed = new MessageEmbed()

      .setTitle(`📊 Sondageㅤㅤㅤㅤㅤ`)
      .addFields({ name: "Question", value: `${capFL(question)}` })
      .setColor("#82b597")
      .setFooter({
        text: `${interaction.user.username}#${interaction.user.discriminator}`,
        icon_url: interaction.user.avatarURL(),
      })
      .setTimestamp()
      .setThumbnail(zizou);

    for (let i = 0; i < options.length; i++) {
      if (options !== "") {
        pollembed.addFields({
          name: `Option ${i + 1}`,
          value: `${options[i]}`,
        });
      } else {
        break;
      }
    }
    interaction.reply({ embeds: [pollembed], ephemeral: true });
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
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "!deploy2") {
    //add a role to the author of the message
    const role = message.guild.roles.cache.find(
      (r) => r.name === "Ruby Nikara"
    );
    if (!role) return message.author.send("Le rôle n'existe pas.");
    await message.member.roles.add(role);
    return message.author.send("Le rôle a été ajouté.");
  }
});
// get if a user is disconnect from a voice channel
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
    const country = interaction.options.getString("pays");
    async function getNews() {
      try {
        let response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${config.newskey}`
        );
        return response.data;
      } catch (error) {
        console.warn(error);
        return interaction.reply({
          content: `<:warning:973943398178373663> Une erreur est survenue lors de la recherche de la ville __**\`${loca}\`**__ <:warning:973943398178373663>`,
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
});;
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
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isAutocomplete()) return;

  if (interaction.commandName === "wikipedia") {
    const focusedOption = interaction.options.getFocused(true);

    async function getWiki() {
      try {
        let response = await axios.get(
          `https://fr.wikipedia.org/w/api.php?action=opensearch&limit=15&format=json&search=${focusedOption.value}`
        );
        resolve(response.data);
        return response.data;
      } catch (error) {
        resolve("error");
        console.warn(error);
        console.log("CA MARCHE PAS");
      }
      let res = await getWiki();
      try {
        //  console.error(res[1][0])
        const response = await interaction.respond({});
      } catch (error) {
        console.warn(error);
      }
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "about") {
    const aboutEmbed = new MessageEmbed()
      .setTitle("A propos du bot")
      .setDescription(
        "Ce bot Discord est dévellopé par <@494079726470823936> depuis le <t:1649951862>. Pour un maximum de transparence envers nos utilisateur, ci-dessous, vous pourrez voir les différentes librairies utilisés par ce bot.\n Vous pouvez à présent supporter ce projet sur https://github.com/sivelswhy/Zizou\n\n__**Documentation :**__ https://github.com/sivelswhy/Zizou/wiki"
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
          value : "[VirusTotal](https://www.virustotal.com/)",inline: true
        },
        { name: "QrCode", value: "[GoQR](https://goqr.me/)", inline: true },
        { name: "Îcones", value: "[Icons8](https://icons8.com/) ou [Microsoft](https://microsoft.com)", inline: true },
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
    if (tagline.length > 5 || tagline.length < 3)
      return interaction.reply({
        content: `<:warning:973943398178373663> | Le tagline est invalide. Celui-ci peut faire uniquement entre **3** et **5** caractères maximum.`,
        ephemeral: true,
      });
    const url = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/sivels%239101`;
    console.log(url);
    const res = await axios(url, {
      headers: {
        "TRN-Api-Key": `${config["trn-api-key"]}`,
      },
    }).catch(function (error) {
      if (error) {
        return interaction.reply({
          content: `<:warning:973943398178373663> | Une erreur est survenue lors de la recherche du joueur.`,
          ephemeral: true,
        });
      }
      console.log(error.config);
    });
    console.log(res);
    // fs.writeFileSync("valorant.json", JSON.stringify(res), function (err) {
    //   if (err) throw err;
    //   console.log("File is created successfully for slash commands data.");
    // });
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
      const res2 = await axios(`http://ip-api.com/json/${ip}`).catch(function (error) {
        console.log('error on the second request')
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
            value: `[:flag_${lowerCases(res.data.data.attributes.country)}:, ${res2.data.city}, ${res2.data.regionName}](https://www.google.com/maps/search/${res2.data.lat},${res2.data.lon})`,
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
          },
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
  },
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
  },
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
  },
)
.setColor("#82b597");
      collector.on("collect", async (i) => {
        if (i.customId === "ip") {
          await i.update({ components: [], embeds: [morestatsembed, secondembed, thirdembed, fourthembed] });
        }
      });
    }
  }
});
client.login(config.token);
