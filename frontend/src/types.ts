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
