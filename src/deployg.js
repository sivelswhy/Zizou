const {
    Client,
    GatewayIntentBits,
    Partials,
    ApplicationCommandType,
    ApplicationCommandOptionType
  } = require("discord.js");
  const client = new Client({
    intents:[
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.User
    ]
  });
  const fr = require("../localization/fr.json")
  const config = require("./data/config.json");
  const fs = require("fs");
  client.on("ready", async () => {
    //*ready
    console.clear();
    console.log(
      "--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\n--------------\nDeploy online !"
    );
  });
  
  
  client.on("messageCreate", async (message) => {
    if (!client.application?.owner) await client.application?.fetch();
  
    if (
      message.content.toLowerCase() === "!deployg" &&
      message.author.id === client.application?.owner.id
    ) {
      const data = [
        {
          name: "wikipedia",
          description: "Search something on Wikipedia",
          descriptionLocalizations: {
          fr : fr.commands.wikipedia.description
          },
          options: [
            {
              type: 3,
              name: "search",
              nameLocalizations: {
              fr : fr.commands.wikipedia.options.search.name
              },
              description: "The thing that you want to search on wikipedia",
              descriptionLocalizations: {
              fr : fr.commands.wikipedia.options.search.description
              },
              required: true,
              autocomplete: true,
            },
          ],
        },
        {
          "name": "route",
          nameLocalizations: {
          fr : fr.commands.route.name
          },
          "description": "Have the schedules of buses and other transports according to a region",
          descriptionLocalizations: {
          fr : fr.commands.route.description
          },
          "options": [
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "normandy",
              nameLocalizations: {
                fr : fr.commands.route.normandy.name
                },
              "description": "🚌 Normandy bus schedules for the **NOMAD** group",
              descriptionLocalizations: {
              fr : fr.commands.route.normandy.description
              },
              "options": [
                {
                  "type": ApplicationCommandOptionType.String,
                  "name": "start",
                  nameLocalizations: {
                  fr : fr.commands.route.normandy.options.start.name
                  },
                  "description": "Starting station",
                  descriptionLocalizations: {
                  fr : fr.commands.route.normandy.options.start.description
                  },
                  "required": true,
                  autocomplete: true,
                },
                {
                  "type": ApplicationCommandOptionType.String,
                  "name": "end",
                  nameLocalizations: {
                  fr : fr.commands.route.normandy.options.end.name
                  },
                  "description": "Ending Station",
                  descriptionLocalizations: {
                    fr : fr.commands.route.normandy.options.end.description
                    },
                  "required": true,
                  autocomplete: true,
                }
              ]
            }
          ],
        },
        
        {
          "name": "image",
          "description": "All commands related to images",
          "options": [
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "upload",
              "description": "Upload an image on the internet",
              descriptionLocalizations: {
              fr : fr.commands.image.upload.description
              },
              "options": [
                {
                  "type": ApplicationCommandOptionType.Attachment,
                  "name": "image",
                  "description": "The image that you want to upload.",
                  descriptionLocalizations: {
                  fr : fr.commands.image.upload.options.image.description
                  },
                  "required": true
                }
              ]
            }
          ]
        },
        {
          "name": "support",
          "description": "Contact the BOT support, to report a bug for example.",
          descriptionLocalizations: {
          fr : fr.commands.support.description
          },
        },
        {
          "name": "headsortails",
          nameLocalizations: {
          fr : fr.commands.headOrTail.name
          },
          "description": "Flip a coin from discord",
          descriptionLocalizations: {
          fr : fr.commands.headOrTail.description
          },
          "options": [
            {
              "type": ApplicationCommandOptionType.User,
              "name": "mention",
              "description": "Mention someone from these heads or tails.",
              descriptionLocalizations: {
              fr : fr.commands.headOrTail.options.mention.description
              },
            }
          ]
        },
        {
          "name": "info",
          "description": "Allows you to have information on various subjects",
          descriptionLocalizations: {
          fr : fr.commands.info.description
          },
          "options": [
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "bot",
              "description": "Allows you to have information about the bot",
              descriptionLocalizations: {
              fr : fr.commands.info.bot.description
              },
            }
          ]
        },
        {
          "name": "random",
          "description": "Generate something randomly",
          descriptionLocalizations: {
          fr : fr.commands.random.description
          },
          "options": [
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "face",
              nameLocalizations: {
              fr : fr.commands.random.face.name
              },
              "description": "Generate via artificial intelligence a face.",
              descriptionLocalizations: {
              fr : fr.commands.random.face.description
              },
              "options": []
            },
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "meme",
              "description": "Generate a meme!",
              descriptionLocalizations: {
              fr : fr.commands.random.meme.description
              },
              "options": []
            }
          ]
        },
        {
          "name": "virus",
          "description": "Check if something is a virus",
          descriptionLocalizations: {
          fr : fr.commands.virus.ip.description
          },
          "options": [
            {
              "type": ApplicationCommandOptionType.Subcommand,
              "name": "ip",
              "description": "Check if an IP address is malicious",
              descriptionLocalizations: {
              fr : fr.commands.virus.ip.description
              },
              "options": [
                {
                  "type": ApplicationCommandOptionType.String,
                  "name": "ip",
                  "description": "The ip you want to scan.",
                  descriptionLocalizations: {
                  fr : fr.commands.virus.ip.options.ip.description
                  },
                  "required": true
                }
              ]
            }
          ]
        },
        {
          name: "play",
          description: "Play a music",
          descriptionLocalizations: {
          fr : fr.commands.play.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "name-link",
              nameLocalizations: {
              fr : fr.commands.play.options.nameLink.name
              },
              description: "Name or link of the music",
              descriptionLocalizations: {
              fr : fr.commands.play.options.nameLink.description
              },
              required: true,
            },
          ],
        },
        {
          name: "8ball",
          description: "Ask a question and wait for an answer 🤫",
          descriptionLocalizations: {
          fr : fr.commands['8ball'].description
          },
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "question",
              description: "Question",
              required: true,
            },
          ],
        },
        {
          name: "bmi",
          nameLocalizations: {
          fr : fr.commands.bmi.name
          },
          description: "Calculate your BMI from Discord.",
          descriptionLocalizations: {
          fr : fr.commands.bmi.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.Number,
              name: "height",
              nameLocalizations: {
                fr : fr.commands.bmi.options.height.name
                },
              description: "Your size in CENTIMETERS",
              descriptionLocalizations: {
                fr : fr.commands.bmi.options.height.description
                },
              required: true,
            },
            {
              type: ApplicationCommandOptionType.Number,
              name: "weight",
              nameLocalizations: {
              fr : fr.commands.bmi.options.weight.name
              },
              description: "Your weight in KILOGRAMS",
              descriptionLocalizations: {
              fr : fr.commands.bmi.options.weight.description
              },
              required: true,
            },
          ],
        },
        {
          name: "skip",
          description: "Skip the current music",
          descriptionLocalizations: {
          fr : fr.commands.skip.description
          },
        },
        {
          name: "pause",
          description: "Pause the current music",
          descriptionLocalizations: {
          fr : fr.commands.pause.description
          },
        },
        {
          name: "volume",
          description: "Choose the volume of the music",
          descriptionLocalizations: {
          fr : fr.commands.volume.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.Number,
              name: "volume",
              description: "The amount of the volume",
              descriptionLocalizations: {
              fr : fr.commands.volume.options.volume.description
              },
              required: true,
            },
          ],
        },
        {
          name: "stop",
          description: "Stop the music",
          descriptionLocalizations: {
          fr : fr.commands.stop.description
          },
        },
        {
          name: "queue",
          description: "Get the musics in the queue",
          descriptionLocalizations: {
          fr : fr.commands.queue.description
          },
        },
        {
          name: "qrcode",
          description: "Create a QRCode from Discord!",
          descriptionLocalizations: {
          fr : fr.commands.qrcode.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "url",
              description:
                "URL you want to insert in the QRCode.",
                descriptionLocalizations: {
                fr : fr.commands.qrcode.options.url.description
                },
              required: true,
            },
          ],
        },
        {
          name: "os",
          description: "Get the info from the bot, like its ping!",
          descriptionLocalizations: {
          fr : fr.commands.os.description
          },
        },
        {
          name: "activity",
          description: "Play games, but in Discord",
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "game",
              nameLocalizations: {
              fr : fr.commands.activity.options.games.name
              },
              description: "Game you want to play",
              descriptionLocalizations: {
              fr : fr.commands.activity.options.games.description
              },
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
                  name: "Betrayal",
                  value: "betrayal",
                },
                {
                  name: "Fishington",
                  value: "fishington",
                },
                {
                  name: "Scrabble",
                  value: "lettertile",
                },
                {
                  name: "Doodle Crew",
                  value: "doodlecrew",
                },
                {
                  name: "SpellCast",
                  value: "spellcast",
                },
                {
                  name: "Awkword",
                  value: "awkword",
                },
                {
                  name: "Puttparty",
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
            {
              name: "user",
              type: ApplicationCommandOptionType.User,
              description: "User to be mentioned for the activity",
              required: false,
            },
            {
              type: ApplicationCommandOptionType.User,
              name: "seconduser",
              nameLocalizations: {
              fr : fr.commands.activity.options.user.name
              },
              description: "Second user to mention for the activity",
              descriptionLocalizations: {
              fr : fr.commands.activity.options.secondUser.description
              },
              required: false,
            },
          ],
        },
        {
          name: "weather",
          nameLocalizations: {
          fr : fr.commands.weather.name
          },
          description: "Have the weather of a city or a country",
          descriptionLocalizations: {
          fr : fr.commands.weather.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "position",
              description: "The city or country from which you want to get the weather",
              descriptionLocalizations: {
              fr : fr.commands.weather.options.description
              },
              required: true,
            },
          ],
        },
        {
          name: "news",
          description: "Display the latest news.",
          descriptionLocalizations : {
            fr: fr.commands.news.description
          },
          options: [
            {
              type: ApplicationCommandOptionType.String,
              name: "country",
              nameLocalizations: {
              fr : fr.commands.news.options.country.name
              },
              description:
                "The news of the country you want to have ⚠️(the news will be in the language of this country)⚠️",
                descriptionLocalizations: {
                fr : fr.commands.news.options.country.description
                },
              required: true,
              choices: [
                {
                  name: "France",
                  value: "fr",
                },
                {
                  name: "United-States",
                  value: "us",
                  nameLocalizations: {
                    fr : fr.commands.news.options.country.choices.unitesStates
                  }
                },
                {
                  name: "Ukraine",
                  value: "ua",
                },
                {
                  name: "Italia",
                  value: "it",
                  nameLocalizations: {
                    fr : fr.commands.news.options.country.choices.italia
                  }
                },
              ],
            },
          ],
        },
        // {
        //   name: "Save",
        //   type: ApplicationCommandType.ChatInput,
        // },
        // {
        //   name: "Info",
        //   type: ApplicationCommandType.User,
        // },
      ];
  
      const command = await client.application?.commands.set(data);
      console.log(command, '\n C\'est bon');
      process.exit(1)
  
    }
  });
client.login(config.token)