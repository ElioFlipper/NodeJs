import passport from 'passport';
import passportJWT, { StrategyOptions } from 'passport-jwt';
import { db } from './db.js';
import * as dotenv from "dotenv";
dotenv.config()

// Recupera la chiave segreta dall'ambiente
const secret: string | undefined = process.env.SECRET;

// Verifica se la chiave segreta è definita
if (!secret) {
  throw new Error('Secret key not found in environment variables');
}

// Definisci le opzioni per la strategia JWT
const options: StrategyOptions = {
  secretOrKey: secret, // Utilizza la chiave segreta
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Configura la strategia JWT
passport.use(
  new passportJWT.Strategy(options, async (payload: any, done) => {
    try {
      // Esegui la query per ottenere l'utente dal database
      const user = await db.one('SELECT * FROM users WHERE id=$1', payload.id);

      // Passa l'utente al callback done se trovato, altrimenti passa un errore
      return user ? done(null, user) : done(new Error('User not found'));
    } catch (error) {
      // Passa l'errore al callback done
      done(error);
    }
  })
);
