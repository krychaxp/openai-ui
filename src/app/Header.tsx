import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';

import { Github } from '@/icons/Github';

import packageJson from '../../package.json';

export const Header = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand></NavbarBrand>
      <h1 className="font-bold">OpenAi UI for Generating images</h1>
      <NavbarContent justify="end" as="div">
        <Button
          as={Link}
          href={packageJson.repository.url}
          isIconOnly
          className="text-white rounded-large"
          title="Github repo"
        >
          <Github />
        </Button>
      </NavbarContent>
    </Navbar>
  );
};
