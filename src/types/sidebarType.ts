export interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

export interface SidebarProps {
  menuItem: MenuItem[];
}
