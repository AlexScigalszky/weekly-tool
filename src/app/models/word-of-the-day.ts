export interface APIResponse<T> {
  api_owner: APIOwner;
  body: T;
}

export interface APIOwner {
  author: string;
  cafecito: string;
  instagram: string;
  github: string;
  linkedin: string;
}

export interface WordOfTheDay {
  Word?: string;
  Definition?: string;
  Author?: string;
  ErrorMessage?: null;
  EncodingWebName?: string;
  WordOrigin?: null;
  UrlDefinitionSource?: string;
  urls?: Urls;
  DefinitionMD?: string;
  Related?: Related[];
}

export interface Related {
  Word?: string;
  urls?: Urls;
}

export interface Urls {
  url?: string;
  wiktionary?: string;
  wikipedia?: string;
  thumbnail?: string;
  image?: string;
}
