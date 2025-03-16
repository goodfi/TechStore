import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
// import * as schema from './schema';

config({ path: '.env' }); // or .env.local
const sql = neon(
  'postgresql://neondb_owner:npg_6nHBgmAMc9vy@ep-fragrant-river-a2tj8qhy-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require'
);
export const db = drizzle({ schema, client: sql });
