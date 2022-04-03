import { send } from '@sapphire/plugin-editable-commands'
import { MessageEmbed } from 'discord.js'
import { RandomLoadingMessage } from './constants'

function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function sendLoadingMessage(message) {
	return send(message, { embeds: [new MessageEmbed().setDescription(pickRandom(RandomLoadingMessage)).setColor('#FF0000')] });
}

module.exports.pickRandom = pickRandom;
module.exports.sendLoadingMessage = sendLoadingMessage;
