import { FirebaseOptions } from "firebase/app"
import { envConfig } from "./env.config"

const firebaseConfig: FirebaseOptions = { ...envConfig.firebase }

export default firebaseConfig
