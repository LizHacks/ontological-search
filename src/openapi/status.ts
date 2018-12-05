export interface Headers {[k: string]: string; }
export type OK<P, H extends Headers> = [P, 200, H];
export type CREATED<P, H extends Headers> = [P, 201, H];
export type NOTIMPLEMENTED<P, H extends Headers> = [P, 501, H];
export type NOTFOUND<P, H extends Headers> = [string, 404, H];
export type BADREQUEST<P, H extends Headers> = [string, 400, H];
export type TOOMANYREQUESTS<P, H extends Headers> = [P, 429, H];
export type SERVERERROR<P, H extends Headers> = [string, 500, H];

// tslint:disable-next-line:max-line-length
export type Status<P, H extends Headers> = OK<P, H> | CREATED<P, H> | NOTIMPLEMENTED<P, H> | NOTFOUND<P, H> | BADREQUEST<P, H> | SERVERERROR<P, H>;

export function ok<P, H extends Headers>(data: P, headers?: H): OK<P, H> {
  return [data, 200, headers || {} as any];
}

export function created<P, H extends Headers>(data: P, headers?: H): CREATED<P, H> {
  return [data, 201, headers || {} as any];
}

export function notImplemented<P, H extends Headers>(headers?: H): NOTIMPLEMENTED<P, H> {
  return [{} as P, 501, headers || {} as any];
}

export function notFound<P, H extends Headers>(id?: string, headers?: H): NOTFOUND<P, H> {
  return [`404 - Resource${id ? ' with id: ' + id : ''} not found!`, 404, headers || {} as any];
}

export function badRequest<P, H extends Headers>(msg?: string, headers?: H): BADREQUEST<P, H> {
  return [`400 BAD REQUEST${msg ? ' - ' + msg : ''}`, 400, headers || {} as any];
}

export function tooManyRequests<P, H extends Headers>(headers?: H): TOOMANYREQUESTS<P, H> {
  return [{} as P, 429, headers || { 'Retry-After': 3600 } as any];
}

export function serverError<P, H extends Headers>(msg?: string, headers?: H): SERVERERROR<P, H> {
  return [`500 INTERNAL SERVER ERROR${msg ? ' - ' + msg : ''}`, 500, headers || {} as any];
}
