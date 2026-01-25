import childProcess from 'node:child_process'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { mal } from '../libs/malOAuth/index.ts'
import { authenticate } from '../usecases/authenticate.ts'
import { fetchAccessToken } from '../api/oauth.ts'
import { upsertAuthenticate } from '../repositories/AuthenticateRepository.ts'

const main = async () => {
  console.log('Starting MyAnimeList OAuth authentication...')

  const { url, code_verifier } = await mal.buildOAuthUrl()

  console.log(`Opening browser to: ${url}`)
  childProcess.exec(`open "${url}"`)

  const rl = readline.createInterface({ input, output })
  const inputCode = await rl.question('Enter code (or full URL): ')
  rl.close()

  let code = inputCode.trim()

  if (code.includes('?code=') || code.includes('&code=')) {
    const match = code.match(/[?&]code=([^&]+)/)
    if (match) {
      code = match[1] ?? ''
    }
  }

  console.log('Exchanging code for access token...')

  const authenticateUsecase = authenticate({
    fetchAccessToken,
    upsertAuthenticate,
  })

  const auth = await authenticateUsecase({
    code,
    codeVerifier: code_verifier,
  })

  console.log('Authentication successful!')
  console.log('Token saved to database.')
  console.log(`Token type: ${auth.tokenType}`)
  console.log(`Expires in: ${auth.expiresIn} seconds`)
}

main()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Authentication failed:', error)
    process.exit(1)
  })
