// components/Breadcrumb.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb: React.FC = () => {
  const asPath = usePathname();
  const pathSegments = asPath?.split('/').filter((segment) => segment);

  const getNames = (name: string) => {
    switch (name) {
      case 'adminDashboard':
        return 'Dashboard';
      case 'userDashboard':
        return 'Dashboard';
      case 'registerMatches':
        return 'Registered matches';
      case 'tournament':
        return 'Tournament';
      default:
        return name;
    }
  };

  const breadcrumbs = pathSegments.map((segment, index) => {
    const breadcrumbPath = `/${pathSegments.slice(0, index + 1).join('/')}`;

    return (
      <span key={breadcrumbPath}>
        <Link href={breadcrumbPath} passHref>
          {getNames(segment)}
        </Link>
        {index < pathSegments.length - 1 && ' / '}
      </span>
    );
  });

  return <div>{breadcrumbs}</div>;
};

export default Breadcrumb;
