export interface PolygonTicker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name?: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  last_updated_utc?: string;
}

export interface PolygonTickersResponse {
  results: PolygonTicker[];
  status: string;
  request_id: string;
  count: number;
  next_url?: string;
}

export interface PolygonApiError {
  status: string;
  request_id: string;
  message: string;
  error?: string;
}

export interface TickersSearchParams {
  market?: 'stocks' | 'forex' | 'crypto' | 'options';
  active?: boolean;
  order?: 'asc' | 'desc';
  limit?: number;
  sort?:
    | 'ticker'
    | 'name'
    | 'market'
    | 'locale'
    | 'primary_exchange'
    | 'type'
    | 'currency_name'
    | 'cik'
    | 'composite_figi'
    | 'share_class_figi'
    | 'last_updated_utc';
  ticker?: string;
  'ticker.gte'?: string;
  'ticker.gt'?: string;
  'ticker.lte'?: string;
  'ticker.lt'?: string;
  search?: string;
}
