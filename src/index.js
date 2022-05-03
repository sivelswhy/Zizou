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
const player = new Player(client, { initialVolume: 30, languages: ["fr-FR"],});

const config = require("./data/config.json");

const  db = require("./data/db.json");

const { DiscordTogether } = require("discord-together");
const path = require("path");
client.discordTogether = new DiscordTogether(client);
let nameembed;

const bloodslogo =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const zizou =
  "https://cdn.discordapp.com/attachments/965739781839523880/965929991797878834/ZIDANECHUT-NB__1_-removebg-preview.png";
const logsmp = "966268215913222164";
function capFL(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function savePronote(username, password, etablissement, author) {
  // fs.writeFileSync(path.join(__dirname, "../src/data/db.json"), JSON.stringify(`${username, password, etablissement}`, null, 2))
  fs.writeFileSync(path.join(__dirname, "../src/data/db.json"), JSON.stringify(db["pronote"] = `${username}, ${password}, ${etablissement}, ${author}`, null, 2));
}

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

client.on("ready", async () => {
  //*ready
  console.clear();
  console.log(
    "--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\nBot BLOODS online !"
  );
  client.user.setStatus("online");
  client.user.setActivity("AIDE ? -> !start en MP pour contacter le STAFF", {
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
client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  if (
    message.content.toLowerCase() === "!deploy" &&
    message.author.id === client.application?.owner.id
  ) {
    const data = [
      {
        name: "play",
        description: "Jouer une musique",
        options: [
          {
            type: 3,
            name: "nom-lien",
            description: "nom ou lien de la musique",
            required: true,
          },
        ],
      },
      {
        "name": "pronote",
        "description": "Newsletter pronote dans discord",
        "options": [
          {
            "type": 3,
            "name": "etablissement",
            "description": "Lien de votre établiseemnt",
            "required": true
          },
          {
            "type": 3,
            "name": "username",
            "description": "Le nomd'utilisateur de votre compte",
            "required": true
          },
          {
            "type": 3,
            "name": "password",
            "description": "Mot de passe de votre compte",
            "required": true
          }
        ]
      },
      {
        "name": "wikipedia",
        "description": "Rechercher quelque chose sur Wikipédia",
        "options": [
          {
            "type": 3,
            "name": "recherche",
            "description": "La chose que vous voulez recherche sur wikipédia",
            "required": true,
            autocomplete: true,
          }
        ]
      },
      // {
      //   name: "filtre",
      //   description: "Ajouter un filtre à la musique",
      //   options: [
      //     {
      //       type: 3,
      //       name: "effet",
      //       description: "🎶Effet de la musique",
      //       required: true,
      //       choices: [
      //         {
      //           name: "Bassboosted",
      //           value: "bassboost",
      //         },
      //         {
      //           name: "8D",
      //           value: "8d",
      //         },
      //         {
      //           name: "Nightcore",
      //           value: "nigthcore",
      //         },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   name: "poll",
      //   description: "Créer un sondage",
      //   options: [
      //     {
      //       type: 3,
      //       name: "question",
      //       description: "Question du sondage",
      //       required: true,
      //     },
      //     {
      //       type: 10,
      //       name: "duree",
      //       description: "Durée du sondage EN MINUTES (pas plus de 60 minutes)",
      //       required: true,
      //     },
      //     {
      //       type: 3,
      //       name: "option1",
      //       description: "Option 1",
      //       required: true,
      //     },
      //     {
      //       type: 3,
      //       name: "option2",
      //       description: "Option 2",
      //       required: true,
      //     },
      //     {
      //       type: 3,
      //       name: "option3",
      //       description: "Option 3",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option4",
      //       description: "Option 4",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option5",
      //       description: "Option 5",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option6",
      //       description: "Option 6",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option7",
      //       description: "Option 7",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option8",
      //       description: "Option 8",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option9",
      //       description: "Option 9",
      //       required: false,
      //     },
      //     {
      //       type: 3,
      //       name: "option10",
      //       description: "Option 10",
      //       required: false,
      //     },
      //   ],
      // },
      {
        name: "8ball",
        description: "Pose une question et attends une réponse 🤫",
        options: [
          {
            type: 3,
            name: "question",
            description: "Question",
            required: true,
          },
        ],
      },
      {
        name: "imc",
        description: "Calculer votre IMC depuis discord",
        options: [
          {
            type: 10,
            name: "taille",
            description: "Votre taille en CENTIMETRE",
            required: true,
          },
          {
            type: 10,
            name: "poids",
            description: "Votre poids en KG",
            required: true,
          },
        ],
      },
      {
        name: "skip",
        description: "Passer la musique en cours",
      },
      {
        name: "pause",
        description: "Mettre en pause la musique en cours",
      },
      {
        name: "resume",
        description: "Reprendre la musique en cours",
      },
      {
        name: "send",
        description: "Envoyer un message à un utilisateur",
        options: [
          {
            type: 3,
            name: "texte",
            description: "Le texte que vous souhaitez envoyer à la personne",
            required: true,
          },
          {
            type: 6,
            name: "utilisateur",
            description:
              "L'utilisateur à qui vous souhaitez envoyer ce message",
            required: true,
          },
          {
            name: "direct",
            type: 5,
            description:
              "Envoyer le message directement à la personne sans décoration",
            required: true,
          },
        ],
      },
      {
        name: "volume",
        description: "Choisir le volume de la musique",
        options: [
          {
            type: 10,
            name: "volume",
            description: "Le montant du volume",
            required: true,
          },
        ],
      },
      {
        name: "stop",
        description: "Arrêter la musique",
      },
      {
        name: "queue",
        description: "Avoir les musiques dans la queue",
      },
      {
        name: "card",
        description: "Créez une fausse carte d'identitée ou autre.",
        options: [
          {
            type: 10,
            name: "id",
            description: "Votre ID",
            required: true,
          },
          {
            type: 3,
            name: "sexe",
            description: "Sexe voulu",
            choices: [
              {
                name: "Homme",
                value: "male",
              },
              {
                name: "Femme",
                value: "female",
              },
            ],
            required: true,
          },
          {
            type: 3,
            name: "origine",
            description: "origine",
            choices: [
              {
                name: "Arabe (Jordanie)",
                value: "arabic-jordan",
              },
              {
                name: "Autriche",
                value: "german-austria",
              },
              {
                name: "Canada",
                value: "english-canada",
              },
              {
                name: "Angleterre",
                value: "english-united-kingdom",
              },
              {
                name: "Philippines",
                value: "english-philippines",
              },
              {
                name: "États-Unis",
                value: "english-united-states",
              },
              {
                name: "Afrique du Sud (anglais)",
                value: "english-south-africa",
              },
              {
                name: "Espagne",
                value: "spanish-spain",
              },
              {
                name: "Canada (français)",
                value: "french-canada",
              },
              {
                name: "France",
                value: "french-france",
              },
              {
                name: "Armenie",
                value: "armenian-armenia",
              },
              {
                name: "Islande",
                value: "icelandic-iceland",
              },
              {
                name: "Italie",
                value: "italian-italy",
              },
              {
                name: "Japon",
                value: "japanese-japan",
              },
              {
                name: "Corée du Sud",
                value: "korean-south-korea",
              },
              {
                name: "Norvège",
                value: "norwegian-norway",
              },
              {
                name: "Pologne",
                value: "polish-poland",
              },
              {
                name: "Brésil",
                value: "portuguese-brazil",
              },
              {
                name: "Roumanie",
                value: "romanian-romania",
              },
              {
                name: "Russe",
                value: "russian-russia",
              },
              {
                name: "Slovènie",
                value: "slovenian-slovenia",
              },
              {
                name: "Turquie",
                value: "turkish-turkey",
              },
              {
                name: "Ukraine",
                value: "ukrainian-ukraine",
              },
              {
                name: "Chine",
                value: "chinese-china",
              },
            ],
          },
        ],
      },
      {
        name: "clear",
        description: "Supprimez des messages en masse",
        options: [
          {
            type: 10,
            name: "nombre",
            description: "le nombre de messages que vous voullez supprimer",
            required: true,
          },
        ],
      },
      {
        name: "Save",
        type: "MESSAGE",
      },
      {
        name: "Info",
        type: "USER",
      },
      {
        name: "roll",
        description: "Faites un /roll, comme si vous êtiez in-game !",
      },
      // {
      //   name: "lyrics",
      //   description: "Avoir les paroles d'une chanson",
      //   options: [
      //     {
      //       type: 3,
      //       name: "chanson",
      //       description: "Le nom de la chanson",
      //       required: false,
      //     },
      //   ],
      // },
      {
        name: "qrcode",
        description: "Créez un QRCode depuis Discord!",
        options: [
          {
            type: 3,
            name: "url",
            description:
              "URL du lien que vous souhaitez insérer dans le QRCode.",
            required: true,
          },
        ],
      },
      {
        name: "os",
        description: "Ayez les infos du bot, comme son ping !",
      },
      {
        name: "activity",
        description: "Jouez à des jeux, mais dans Discord",
        options: [
          {
            type: 3,
            name: "jeu",
            description: "Jeu auquel vous souhaitez jouer",
            required: true,
            choices: [
              {
                name: "YouTube",
                value: "youtube",
              },
              {
                name: "Poker",
                value: "poker",
              },
              {
                name: "échecs",
                value: "chess",
              },
              {
                name: "Betrayal(jsp ce que c'est)",
                value: "betrayal",
              },
              {
                name: "Fishington",
                value: "fishington",
              },
              {
                name: "Scrabble (en anglais)",
                value: "lettertile",
              },
              {
                name: "Doodle Crew(jsp ce que c'est)",
                value: "doodlecrew",
              },
              {
                name: "SpellCast(jsp ce que c'est)",
                value: "spellcast",
              },
              {
                name: "Awkword(jsp ce que c'est)",
                value: "awkword",
              },
              {
                name: "Puttparty (jsp ce que c'est)",
                value: "puttpary",
              },
              {
                name: "Skribbl.io",
                value: "sketchheads",
              },
              {
                name: "Ocho (Uno)",
                value: "ocho",
              },
            ],
          },
        ],
      },
      {
        name: "infoserv",
        description: "Avoir les infos du serveur CTG In-Game",
      },
      {
        name: "weather",
        description: "Avoir la météo d'une ville ou d'un Pays",
        options: [
          {
            type: 3,
            name: "position",
            description: "La ville ou le pays d'on vous souhaitez la météo",
            required: true,
          },
        ],
      },
      {
        "name": "news",
        "description": "Affichez les dernière news.",
        "options": [
          {
            "type": 3,
            "name": "pays",
            "description": "Les news du pays que vous souhaitez avoir ⚠️(les news seront affichés dans la langue de ce pays)⚠️",
            "required": true,
            "choices": [
              {
                name: "France",
                value: "fr",
              },
              {
                "name": "États-Unis",
                "value": "us"
              },
              {
                "name": "Ukraine",
                "value": "ua"
              },
              {
                "name": "Italie",
                "value": "it"
              },
            ]
          }
        ]
      },
    ];

    const command = await client.guilds.cache
      .get("929774859523879002")
      ?.commands.set(data);
    console.log(command);

    fs.writeFile("slashcommands.json", JSON.stringify(command), function (err) {
      if (err) throw err;
      console.log("File is created successfully for slash commands data.");
    });
  }
});

//! BULK UPDATE COMMANDS
/*
client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!bulk-update' && message.author.id === client.application?.owner.id) {
    const data = [
//?                 Mettres toute la data des commandes

    ]

		// const commands = await client.application?.commands.set(data);
    const command = await client.guilds.cache
    .get("963209263688327190")
    ?.commands.set(data);
	}
});
*/ //! PERMISSIONS FOR CLEAR
client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  if (
    message.content.toLowerCase() === "!perms" &&
    message.author.id === client.application?.owner.id
  ) {
    const command = await client.guilds.cache
      .get("929774859523879002")
      ?.commands.fetch("965929520668483669");

    const permissions = [
      {
        id: "929835101175566367", //? Ruby Niakra
        type: "ROLE",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "929835330335547393", //? Pablo & manuel
        type: "ROLE",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "494079726470823936", //? moi
        type: "USER",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "965696239616270366", //? NCT
        type: "ROLE",
        permission: false,
        defaultPermission: false,
      },
      {
        name: 'loop',
        description: 'Mettre en boucle la musique en cours',
      },
    ];

    await command.permissions.add({ permissions });
    console.log(permissions);
    fs.writeFile(
      "slashcommandperms.json",
      JSON.stringify(command),
      function (err) {
        if (err) throw err;
        console.log("File is created successfully for slash command perms.");
      }
    );
  }
});
client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  if (
    message.content.toLowerCase() === "!perms2" &&
    message.author.id === client.application?.owner.id
  ) {
    const command = await client.guilds.cache
      .get("929774859523879002")
      ?.commands.fetch("966102664582672424");

    const permissions = [
      {
        id: "929835101175566367", //? Ruby Niakra
        type: "ROLE",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "929835330335547393", //? Pablo & manuel
        type: "ROLE",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "494079726470823936", //? moi
        type: "USER",
        permission: true,
        defaultPermission: false,
      },
      {
        id: "965696239616270366", //? NCT
        type: "ROLE",
        permission: false,
        defaultPermission: false,
      },
      {
        id: "965204850310783098", //? Coop team portugaise
        type: "ROLE",
        permission: false,
        defaultPermission: false,
      },
    ];

    await command.permissions.add({ permissions });
    console.log(permissions);
    fs.writeFile(
      "slashcommandperms.json",
      JSON.stringify(command),
      function (err) {
        if (err) throw err;
        console.log("File is created successfully for slash command perms.");
      }
    );
  }
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loca}&appid=${config.weatherkey}&lang=fr&units=metric`;
    async function getWeather() {
      try {
        let response = await axios.get(url);
        return response.data;
      } catch (error) {
        return interaction.reply({
          content: `⚠️ Une erreur est survenue lors de la recherche de la ville __**\`${loca}\`**__ ⚠️`,
          ephemeral: true,
        });
      }
    }

    console.log(
      `${interaction.user.username}#${interaction.user.discriminator} a effectué la commande /weather pour la ville "${loca}"`
    );
    let res = await getWeather();
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
        **Ressentie** : \n
        ${Math.floor(res.main.feels_like)}°C\n
        **🌥Météo**\n
        **Météo** : \n
        ${capFL(res.weather[0].description)}\n
        🌬 Vent\n
        **Vitesse :** \n
        ${Math.floor(res.wind.speed)} KM/H\n
        **Angle du vent** : \n
        ${res.wind.deg}°\n
        \n *Données fournies par [OpenWeatherMap](https://openweathermap.org/)*
        `
      )
      .setColor("#32a86b")
      .setTimestamp();
    await interaction.reply({ embeds: [embed], ephemeral: false });
    await interaction.followUp({
      files: [
        "https://cdn.discordapp.com/attachments/966300614093078578/966361155549401248/la-meteo-de-gulli.mp4",
      ],
    });
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
          value: `${res.info.useEarlyAuth}`,
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
      .setTimestamp()
      .setFooter({ text: "QR Code généré via l'api goqr.me." });
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
              )}**.\n\n ⚠️ *Ces applications sont toujours en **Bêta** et quelques bugs peuvent subsister -* *De préférence, attendez qu'un premier utilisateur ait chargé le jeu avant de le rejoindre*`
            )
            .setColor("#32a86b")
            .setThumbnail(zizou);
          return interaction.reply({
            embeds: [embed],
            ephemeral: false,
          });
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
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "❌ | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
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
      .setTitle(`Nouveau titre ajouté à la queue ♪`)
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
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
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
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const volumee = interaction.options.getNumber("volume");
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content: "❌ | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    if (volumee > 100) {
      if (interaction.user.id !== "494079726470823936") {
        return await interaction.reply({
          content: "❌ | Le volume doit être compris entre 0 et 100 !",
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
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content: "❌ | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    const track = queue.nowPlaying();
    const queueembed = new MessageEmbed()
      .setTitle(`Queue du serveur ${interaction.guild.name}`)
      // .setDescription(`${queue.createProgressBar()}\nVoici la queue du serveur :\n\n${queue.map(x => `**${x.track.title}** - [Lien](${x.track.url})`).join("\n")}`)
      .setDescription(
        `**Musique actuelle :** ${track}\n\n${queue.createProgressBar()}\n\n${queue}`
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
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "❌ | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content: "❌ | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    queue.skip();
    return await interaction.reply({
      content: "⏭ | La musique a été skip !",
      ephemeral: false,
    });
  }
});
let paused = false;
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "pause") {
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "❌ | Vous n'êtes pas dans un salon vocal!",
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
        ephemeral: true,
      });
    const queue = player.getQueue(interaction.guild);
    if (!queue)
      return await interaction.reply({
        content: "❌ | Il n'y a pas de musique en cours !",
        ephemeral: true,
      });
    if (paused === false) {
      queue.setPaused(true);
      paused = true;
      return await interaction.reply({
        content: "⏸ | La musique a été mise en pause !",
        ephemeral: false,
      });
    } else if (paused === true) {
      queue.setPaused(false);
      paused = false;
      return await interaction.reply({
        content: "▶️ | La musique a été reprise !",
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
    // imc = imc.toString().substring(4, )
    imc = (weight / ((height * height) / 10000)).toFixed(2);
    console.log(imc);
    const imcembed = new MessageEmbed()
      .setTitle(`IMC de ${interaction.user.username}`)
      .setDescription(
        `Voici votre IMC :\n\n **${imc}**\n\n __**Échelle**__ :\n\n **Moins de 18,5 :** Maigreur. Peut occasionner certains risques pour la santé.\n\n **Entre 18,5 et 25 :** Normal\n\n **Entre 25 et 30 :** Surpoids. Peut occasionner certains risques pour la santé.\n\n **Entre 30 et 35 :** Obésité modérée. Risque accru de développer certaines maladies\n\n **Entre 35 et 40 :** Obésité sévère\n\n **Plus de 40 :** Obésité morbide/massive.\n\n\n
***⚠️Le calcul d'IMC  possède quelques failles.⚠️ \n\nL'IMC ne fait pas de distinction entre l'excès de graisse, de muscle ou de masse osseuse, et ne fournit aucune indication sur la répartition de la graisse entre les individus. Voici quelques exemples de la façon dont certaines variables peuvent influencer l'interprétation de l'IMC : \n\n• En moyenne, les personnes âgées ont tendance à avoir plus de graisse corporelle que les adultes plus jeunes pour un IMC équivalent. \n\n• En moyenne, les femmes ont une plus grande quantité de graisse corporelle totale que les hommes avec un IMC équivalent. \n\n• Les personnes musclées ou les athlètes très entraînés peuvent avoir un IMC élevé en raison de l'augmentation de leur masse musculaire.\n\n Pour plus d'informations, [voici un article pouvant vous aider](https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf) ou [cette vidéo](https://www.youtube.com/watch?v=z_3S2_41_FE)***`
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
    //     return await interaction.reply({ content: "❌ | Il n'y a pas de musique en cours que je puisse analyser!", ephemeral: true });
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

    const embed = new MessageEmbed()
      .setTitle("<:bookmark:969251187159363694> Message sauvegardé")
      .setDescription(
        `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n\`${msg.content}\``
      )
      .setColor("#82b597")
      .setTimestamp();
    if (msg.content === "") {
      embed.setDescription(
        `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n`
      );
    }
    if (msg.attachments.size > 0) {
      if (
        msg.attachments.first().proxyURL.endsWith(".png") ||
        msg.attachments.first().proxyURL.endsWith(".jpg") ||
        msg.attachments.first().proxyURL.endsWith(".jpeg")
      ) {
        embed.setImage(msg.attachments.first().proxyURL);
        embed.setDescription(
          `J'ai sauvegardé le message suivant envoyé par ${msg.author}:\n\n`
        );
      } else {
        embed.setDescription(
          `Le message qu'à envoyé ${msg.author} contient un/des fichier(s) non supporté(s).`
        );
      } /*else if(!msg.attachments.first().proxyURL.endsWith('.png') || !msg.attachments.first().proxyURL.endsWith('.jpg') || !msg.attachments.first().proxyURL.endsWith('.jpeg')) {
    interaction.followUp({attachments: [msg.attachments.first().proxyURL]})
  }*/
    }
    await interaction.reply({ embeds: [embed], ephemeral: true });
    await interaction.user.send({ embeds: [embed] });
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
          value: `<t:${Math.floor(
            user.createdTimestamp / 1000
          )}:f> (<t:${Math.floor(user.createdTimestamp / 1000)}:R>)`,
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
          value: `<t:${Math.floor(
            member.joinedTimestamp / 1000
          )}:f> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
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
        return interaction.reply({
          content: `⚠️ Une erreur est survenue lors de la recherche de la ville __**\`${loca}\`**__ ⚠️`,
          ephemeral: true,
          break : true
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
    return await interaction.reply({ embeds: [newsembed], ephemeral: true });
  }
});
client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'loop') {
  const queue = player.getQueue(interaction.guild);
  if (
    interaction.guild.me.voice.channelId &&
    interaction.member.voice.channelId !==
      interaction.guild.me.voice.channelId
  )
    return await interaction.reply({
      content: "❌ | Tu n'est pas dans le même salon vocal que le BOT !",
      ephemeral: true,
    });
  if (!queue) return interaction.reply('⚠️ | Aucune musique n\'est en cours de lecture.');
  queue.loop = !queue.loop;
  return interaction.reply(`🔁 | La lecture en boucle est maintenant ${queue.loop ? 'activer' : 'désactiver'}`);
}
});
client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'pronote') {
  const etablissement = interaction.options.getString('etablissement');
  const username = interaction.options.getString('username');
  const password = interaction.options.getString('password');
 savePronote(username, password, etablissement, interaction.user.id)
}
});
client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;
if (interaction.commandName === 'wikipedia') {
  const query = interaction.options.getString('recherche');
  async function getWiki() {
    try {
      let response = await axios.get(
        `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${query}&redirects=`
      );
      return response.data;
    } catch (error) {
      await interaction.reply({
        content: `⚠️ Une erreur est survenue lors de la recherche du texte __**\`${query}\`**__ ⚠️`,
        ephemeral: true,
      });
    }
  }

  let res = await getWiki();
  //check if the query is a page
  if (res.query.pages[-1]) {
    return interaction.reply({content: `⚠️ | La recherche \`${query}\` n\'a retourné aucun résultat.`, ephemeral: true});
  };
  const wikiEmbed = new MessageEmbed()
  .setAuthor({name: `Wikipedia`, icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png'})
  .setColor('#82b597')
  .setDescription(`Résultat de la recherche : `)
  console.log(res.query.pages)
  
    return interaction.reply({ embeds: [wikiEmbed], ephemeral: true });
}
});
client.on('interactionCreate', interaction => {
	if (!interaction.isAutocomplete()) return;
  if(interaction.commandName === 'wikipedia') {
    const focusedValue = interaction.options.getFocused(true)
    
    async function getWiki() {
      try {
        let response = await axios.get(
          `https://fr.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=portalOpensearchCallback&search=${focusedValue.value}`
        );
        return response.data;
      } catch (error) {
        await interaction.reply({
          content: `⚠️ Une erreur est survenue lors de la recherche du texte __**\`${query}\`**__ ⚠️`,
          ephemeral: true,
        });
      }
    }
  
    let res = await getWiki();
    console.log(res)
    // const response = await interaction.respond(choices)
  }
});
client.login(config.token);
