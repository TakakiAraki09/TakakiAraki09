import { refreshToken } from '../usecases/refreshToken.ts'
import { refreshAccessToken } from '../api/oauth.ts'
import { findLatestAuthenticate, upsertAuthenticate } from '../repositories/AuthenticateRepository.ts'

const main = async () => {
  console.log('Refreshing access token...')

  const refreshTokenUsecase = refreshToken({
    refreshAccessToken,
    findLatestAuthenticate,
    upsertAuthenticate,
  })

  const auth = await refreshTokenUsecase()

  console.log('Token refreshed successfully!')
  console.log(`Token type: ${auth.tokenType}`)
  console.log(`Expires in: ${auth.expiresIn} seconds`)
}

main()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Token refresh failed:', error)
    process.exit(1)
  })
