// index.js

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const express = require('express');
const musicCommands = require('./commands/music');
const playerEvents = require('./events/playerEvents');
const { is24x7Mode } = require('./config');
require('dotenv').config();

const app = express();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]
});

// Command collection for slash commands
client.commands = new Collection();
client.commands.set('play', musicCommands.slashPlay);
client.commands.set('stop', musicCommands.slashStop);
// Register other music commands here as needed

const player = new Player(client, {
    connectionOptions: {
        host: process.env.LAVALINK_HOST,
        port: process.env.LAVALINK_PORT,
        password: process.env.LAVALINK_PASSWORD
    }
});

app.get('/', (req, res) => res.send('Go Fire bot is active!'));
app.listen(3000, () => console.log('Express server running'));

// Setup message-based commands
client.on('messageCreate', message => musicCommands.handleMusicCommands(message, player));

// Setup slash command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (command) await command(interaction, player);
});

// Setup player events
playerEvents.setupPlayerEvents(player, is24x7Mode);

client.once('ready', () => console.log('Go Fire bot is online with full music features!'));
client.login(process.env.TOKEN);