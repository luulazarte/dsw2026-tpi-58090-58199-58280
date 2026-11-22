function Icon({ paths, className = 'w-4 h-4', strokeWidth = 2 }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path
          key={path}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={path}
        />
      ))}
    </svg>
  );
}

export const ShieldIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    ]}
  />
);

export const MailIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    ]}
  />
);

export const LockIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    ]}
  />
);

export const IdCardIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
    ]}
  />
);

export const EyeIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    ]}
  />
);

export const EyeOffIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18',
    ]}
  />
);

export const SearchIcon = (props) => (
  <Icon {...props} paths={['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z']} />
);

export const FilterIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    ]}
  />
);

export const GridIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    ]}
  />
);

export const BriefcaseIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    ]}
  />
);

export const PlusSquareIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M9 12h6m-3-3v6m-7 5h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    ]}
  />
);

export const UserIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    ]}
  />
);

export const UserSearchIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      'M21 21l-3.5-3.5',
    ]}
  />
);

export const LogoutIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    ]}
  />
);

export const MenuIcon = (props) => (
  <Icon {...props} paths={['M4 6h16M4 12h16M4 18h16']} />
);

export const BellIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    ]}
  />
);

export const ClockIcon = (props) => (
  <Icon {...props} paths={['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']} />
);

export const EditIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    ]}
  />
);

export const TrashIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    ]}
  />
);

export const ClipboardIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    ]}
  />
);

export const CalendarIcon = (props) => (
  <Icon
    {...props}
    paths={[
      'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    ]}
  />
);

export const CheckCircleIcon = (props) => (
  <Icon {...props} paths={['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']} />
);
