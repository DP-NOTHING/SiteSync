export interface Site {
  id: string;
  name: string;
  location?: string;
}

export interface SiteListProps {
  sites: Site[];
  selectedSiteId: string | null;
  onSiteSelect: (siteId: string) => void;
}

export interface SiteDetailsProps {
  selectedSite: Site | null;
}

export interface SiteDetail {
  deploymentdate: string;
  userid: string;
  url: string;
  giturl: string;
  projectname: string;
}
