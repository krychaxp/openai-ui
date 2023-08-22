import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { Github } from '@/icons/Github';

import packageJson from '../../package.json';

export const Header = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand></NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem isActive>OpenAi UI for Generating images</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href={packageJson.repository.url}
            isIconOnly
            className="text-white rounded-large"
          >
            <Github />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
