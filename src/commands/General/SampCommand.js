import { Command } from '@sapphire/framework'
import { MessageEmbed } from 'discord.js';
import sa from 'samp-query';
import { getBorderCharacters, table } from 'table';

export class UserCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: "samp",
			description: 'ping pong'
		});
	}

	async messageRun(message, args) {
		let samp = await args.pick('string').catch(() => "gak ada");
		const ip = samp.split(":")
		if(!ip[0] || !ip[1]) return message.reply("masukin ip nya dek")
		let options = {
			host: ip[0],
			port: ip[1]
		}

		const config = {
			border: getBorderCharacters(`void`),
			columnDefault: {
			  paddingLeft: 0,
			  paddingRight: 1
			},
			drawHorizontalLine: () => {
			  return false
			}
		  }
		sa(options, function (error, response) {
			if(error) {
				console.log(error);
			} else {
			let players = [];
			response.players.forEach((player) => {
				players.push([player.id, player.name, player.score, player.ping]);
			});
		
			let output, output2;
			if (players.length === 0) output = 'None';
			else output = table(players.slice(0, 10), config);
			const serverEmbed = new MessageEmbed().setColor("RANDOM").setThumbnail("https://i.imgur.com/QYeGxrV.png")
				.setAuthor(response["hostname"])
				.addField("Gamemode", `${response["gamemode"]}`)
				.addField("Mapname", `${response["mapname"]}`)
				.addField("Version", `${response["rules"].version}`)
				.addField("Players", `${response["online"]}/${response["maxplayers"]}`)
				.addField("Website", `${response["rules"].weburl}`)
				.addField("Time", `${response["rules"].worldtime}`)
				.addField("Map", `${response["rules"].mapname}`);
    			serverEmbed.addField('ID Name Score Ping', '```' + output + '```');
				message.reply({ embeds: [serverEmbed] })
			}
		})
	}
}


