export interface RequestContext {
  requestId: string;
  startedAt: number;
}

export function createRequestContext(): RequestContext {
  return {
    requestId: crypto.randomUUID(),
    startedAt: Date.now()
  };
}
