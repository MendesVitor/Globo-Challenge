import {Command, Flags} from '@oclif/core'
import {access, writeFile} from 'node:fs/promises'
import {join} from 'node:path'
import {cwd} from 'node:process'
import {client} from '../../database'

export default class Database extends Command {
  static description = 'Set the database connection';

  static examples = [
    'postgresql://dbuser:secretpassword@database.server.com:5432/mydb',
  ];

  static flags = {
    new: Flags.boolean({
      char: 'n',
      description: 'sets a new connection string if one already exists',
      default: false,
    }),
  };

  static args = [
    {
      name: 'connection',
      description: 'Connection string to access the database',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Database)

    const path = join(cwd(), 'conn.txt')

    if (flags.new) {
      this.storeConnection(path, args.connection)
      return
    }

    try {
      await access(path)
      this.log(
        'Database connection already exists. To change the connection string use "card database -n <connection>"',
      )
    } catch {
      try {
        this.storeConnection(path, args.connection)
      } catch (error) {
        this.log((error as Error).message)
      }
    }
  }

  private async storeConnection(path: string, connection: string) {
    try {
      await writeFile(path, connection)
      const db = client(connection)

      await db.connect()

      const res = await db.query(
        "SELECT TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy') as date;",
      )
      await db.end()
      this.log('connection successfully established at', res.rows[0].date)
    } catch (error) {
      this.log((error as Error).message)
    }
  }
}
