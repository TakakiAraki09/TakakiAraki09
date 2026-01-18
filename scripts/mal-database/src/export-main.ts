import { exportLibrary } from './usecases/exportLibrary.ts'

exportLibrary()
  .then(() => {
    console.log('Export completed successfully!')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
