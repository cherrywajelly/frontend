export interface RequestGroupTeam {
  teamName: string;
  teamMembers: number[];
}

export interface inquiryRequestJson {
  title: string;
  email: string;
}

export interface InquiriesRequestBody {
  inquiryContents: File;
  inquiryRequest: inquiryRequestJson;
}
