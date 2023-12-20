import { TOKEN, CREATOR, EDITOR} from '../Models'
import { WrapperService } from './mongoService'

export * from './redisService'
export const TokenService = WrapperService(TOKEN)
export const CreatorService = WrapperService(CREATOR)
export const EditorService = WrapperService(EDITOR)