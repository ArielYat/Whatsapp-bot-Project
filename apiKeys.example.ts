import { AdvancedConfig, ConfigObject } from '@open-wa/wa-automate'

export interface ApiKeys {
	DBUrl: string
	region: string
	originalGroup: string
	secondGroup: string
	configObj: ConfigObject | AdvancedConfig
	virusAPI: string
	criptoAPI: string
	stockAPI: string
	transcriptionAPI: string
	stickerTemplatePath: string
}

const apiKeys: ApiKeys = {
	DBUrl: 'DB_URL',
	region: 'Asia/Jerusalem',
	originalGroup: 'ChatID',
	secondGroup: 'ChatID',
	configObj: {
		// Whatsapp client configuration
		sessionId: 'main',
	},
	virusAPI: 'VIRUS_API_URL',
	criptoAPI: 'CRIPTO_API_URL',
	stockAPI: 'STOCK_API_URL',
	transcriptionAPI: 'TRANSCRIPTION_API_URL',
	stickerTemplatePath: 'path',
}

export default apiKeys
