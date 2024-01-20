export interface  IGeoObject {
  metaDataProperty: {
    GeocoderMetaData: {
      precision: string
      text: string
      kind: string
      Address: {
        country_code: string
        formatted: string
        Components: Array<{
          kind: string
          name: string
        }>
      }
    }
  }
  name: string
  description: string
  boundedBy: {
    Envelope: {
      lowerCorner: string
      upperCorner: string
    }
  }
  uri: string
  Point: {
    pos: string
  }
}

export interface IGeocoderResponseMetaData {
    GeocoderResponseMetaData: {
      request: string
      results: string
      found: string
    }
}

export type ApiGeocoderResponseType = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: IGeocoderResponseMetaData;
      featureMember: IGeoObject[];
    }
  }
}