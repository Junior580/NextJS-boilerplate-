import * as crypto from 'crypto'

// encrypted text
const encryptedText = '9e1c8f8bbb7f9e2ed2d7c3f3f1e7c3e9'

// encryption key
const key = 'mysecretkey'

// encryption algorithm
const algorithm = 'aes-256-cbc'

// create a decipher object
const decipher = crypto.createDecipher(algorithm, key)

// decrypt the encrypted text
let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
decrypted += decipher.final('utf8')
console.log(decrypted)
