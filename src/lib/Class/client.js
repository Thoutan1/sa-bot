import { SapphireClient, LogLevel } from'@sapphire/framework';

export class Client extends SapphireClient {
    constructor() {
        super({
            intents: [
                'GUILDS',
                'GUILD_MEMBERS',
                'GUILD_BANS',
                'GUILD_EMOJIS_AND_STICKERS',
                'GUILD_VOICE_STATES',
                'GUILD_MESSAGES',
                'GUILD_MESSAGE_REACTIONS',
                'DIRECT_MESSAGES',
                'DIRECT_MESSAGE_REACTIONS'
            ],
			partials: [
				'MESSAGE',
				'CHANNEL',
				'USER',
				'GUILD_MEMBER',
				'GUILD_SCHEDULED_EVENT',
				'REACTION',
			],
			presence: {
				status: 'idle',
				activities: [
					{
						name: 'DEK TITID',
						type: 'COMPETING',
					},
				],
			},
			logger: {
				level: LogLevel.Debug,
			},
			retryLimit: 2,
			disableMentions: 'everyone',
			fetchAllMembers: true,
			allowedMentions: { repliedUser: false },
			defaultPrefix: process.env.PREFIX,
            regexPrefix: /^(hey +)?bot[,! ]/i,
	        caseInsensitiveCommands: true,
        })
        this.devs = ['885503149002063922'];
    }

    async connect(token = process.env.DISCORD_TOKEN) {
        await super.login(token);
    }
}