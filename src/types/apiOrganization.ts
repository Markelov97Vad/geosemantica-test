export type OrganizationDataType = {
  type: string;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  properties: {
    name: string;
    description: string;
    boundedBy: Array<Array<number>>;
    uri: string;
    CompanyMetaData: {
      id: string;
      name: string;
      address: string;
      url?: string;
      Phones?: Array<{
        type: string;
        formatted: string;
      }>;
      Categories: Array<{
        class: string;
        name: string;
      }>;
      Hours: {
        text: string;
        Availabilities: Array<{
          TwentyFourHours?: boolean;
          Everyday: boolean;
          Intervals?: Array<{
            from: string;
            to: string;
          }>;
        }>;
      };
    };
  };
};

export type ApiOrganizationResponseType = {
  type: string;
  properties: {
    ResponseMetaData: {
      SearchResponse: {
        found: number;
        display: string;
      };
      SearchRequest: {
        request: string;
        skip: number;
        results: number;
        boundedBy: Array<Array<number>>;
      };
    };
  };
  features: OrganizationDataType[];
};
