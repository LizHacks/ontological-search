import { Response, ok } from '../openapi';
import { State } from '../server';

export default async function handler(
  state: State,
  args: any,
): Response<any, any> {
  return ok({ ok: true });
}
