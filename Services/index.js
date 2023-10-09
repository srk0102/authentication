import { USER , TOKEN} from '../Models'
import { WrapperService } from './mongoService'

export * from './redisService'
export const UserService = WrapperService(USER)
export const TokenService = WrapperService(TOKEN)