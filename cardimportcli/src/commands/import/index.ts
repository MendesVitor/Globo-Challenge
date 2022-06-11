import {Command} from '@oclif/core'
import {client} from '../../database'

export default class Import extends Command {
  static description = 'Import card from CSV to database';

  static examples = [''];

  // static flags = {
  //   from: Flags.string({char: 'f', description: 'Whom is saying hello', required: true}),
  // }

  static args = [
    {
      name: 'CSV file path',
      description: 'path of the CSV file',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Import)

    await client.connect()

    const res = await client.query('SELECT * from card')
    await client.end()
    this.log(res.rows[0])

    this.log(
      `hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`,
    )
  }
}
